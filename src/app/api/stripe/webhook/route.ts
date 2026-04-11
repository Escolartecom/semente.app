import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"
import Stripe from "stripe"

// Lê o body bruto — obrigatório para verificar assinatura do Stripe
export const runtime = "nodejs"

export async function POST(req: Request) {
  const body = await req.text()
  const sig  = req.headers.get("stripe-signature") ?? ""

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("[webhook] assinatura inválida:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      // Pagamento confirmado → ativa plano premium
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session
        if (s.mode === "subscription" && s.customer) {
          const updated = await db.user.updateMany({
            where: { stripeCustomerId: s.customer as string },
            data: {
              plan: "premium",
              stripeSubscriptionId: s.subscription as string,
            },
          })

          // Se não encontrou usuário (compra sem conta), dispara email de boas-vindas
          if (updated.count === 0 && s.customer_email) {
            await sendWelcomeEmail(s.customer_email).catch(err =>
              console.error("[webhook] erro ao enviar welcome email:", err)
            )
          }
        }
        break
      }

      // Assinatura cancelada ou expirada → volta para free
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription
        await db.user.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { plan: "free", stripeSubscriptionId: null },
        })
        break
      }

      // Renovação bem-sucedida → garante que o plano está ativo
      case "invoice.paid": {
        const inv = event.data.object as Stripe.Invoice
        if (inv.subscription && inv.customer) {
          await db.user.updateMany({
            where: { stripeCustomerId: inv.customer as string },
            data: { plan: "premium" },
          })
        }
        break
      }

      // Pagamento falhou
      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice
        console.warn("[webhook] pagamento falhou para customer:", inv.customer)
        break
      }
    }
  } catch (err) {
    console.error("[webhook] erro ao processar evento:", err)
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
