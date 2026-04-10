import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const plan       = searchParams.get("plan")      ?? "monthly"
    const orderBump  = searchParams.get("orderBump") === "true"
    const emailParam = searchParams.get("email")     ?? ""

    const session = await auth()
    const baseUrl = process.env.NEXTAUTH_URL ?? "https://semente.app"

    const priceId =
      plan === "yearly"
        ? process.env.STRIPE_PRICE_YEARLY!
        : process.env.STRIPE_PRICE_MONTHLY!

    // Line items — assinatura + order bump (one-time, cobrado na primeira fatura)
    const lineItems: { price: string; quantity: number }[] = [
      { price: priceId, quantity: 1 },
    ]
    if (orderBump && process.env.STRIPE_PRICE_ORDER_BUMP) {
      lineItems.push({ price: process.env.STRIPE_PRICE_ORDER_BUMP, quantity: 1 })
    }

    // ── Fluxo autenticado ──────────────────────────────────────
    if (session?.user?.id) {
      const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { stripeCustomerId: true, email: true, name: true },
      })

      let customerId = user?.stripeCustomerId

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user?.email ?? session.user.email ?? "",
          name:  user?.name  ?? session.user.name  ?? undefined,
          metadata: { userId: session.user.id },
        })
        customerId = customer.id
        await db.user.update({
          where: { id: session.user.id },
          data: { stripeCustomerId: customerId },
        })
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: lineItems,
        subscription_data: {
          metadata: { userId: session.user.id },
        },
        success_url: `${baseUrl}/dashboard?upgraded=true`,
        cancel_url:  `${baseUrl}/checkout?plan=${plan}`,
        locale: "pt-BR",
      })

      return NextResponse.redirect(checkoutSession.url!)
    }

    // ── Fluxo sem sessão (email capturado no quiz) ─────────────
    if (emailParam) {
      const existing = await stripe.customers.list({ email: emailParam, limit: 1 })
      let customerId: string

      if (existing.data.length > 0) {
        customerId = existing.data[0].id
      } else {
        const customer = await stripe.customers.create({ email: emailParam })
        customerId = customer.id
      }

      const successUrl = `${baseUrl}/cadastro?email=${encodeURIComponent(emailParam)}&next=${encodeURIComponent("/dashboard?upgraded=true")}`

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: lineItems,
        subscription_data: {
          metadata: { email: emailParam },
        },
        success_url: successUrl,
        cancel_url:  `${baseUrl}/checkout?plan=${plan}&email=${encodeURIComponent(emailParam)}`,
        locale: "pt-BR",
      })

      return NextResponse.redirect(checkoutSession.url!)
    }

    // ── Sem sessão e sem email → login ─────────────────────────
    const dest = new URL(req.url).pathname + new URL(req.url).search
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(dest)}`, req.url))

  } catch (err) {
    console.error("[stripe/checkout] erro:", err)
    return NextResponse.json(
      { error: "Erro ao iniciar checkout", detail: String(err) },
      { status: 500 }
    )
  }
}
