import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const plan      = searchParams.get("plan")      ?? "monthly"
  const orderBump = searchParams.get("orderBump") === "true"
  const emailParam = searchParams.get("email")    ?? ""

  const session = await auth()

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://semente-app.vercel.app"

  const priceId =
    plan === "yearly"
      ? process.env.STRIPE_PRICE_YEARLY!
      : process.env.STRIPE_PRICE_MONTHLY!

  const addInvoiceItems: { price: string }[] = []
  if (orderBump && process.env.STRIPE_PRICE_ORDER_BUMP) {
    addInvoiceItems.push({ price: process.env.STRIPE_PRICE_ORDER_BUMP })
  }

  // Fluxo com sessão autenticada
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
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: { userId: session.user.id },
        ...(addInvoiceItems.length > 0 ? { add_invoice_items: addInvoiceItems } : {}),
      },
      success_url: `${baseUrl}/dashboard?upgraded=true`,
      cancel_url:  `${baseUrl}/checkout?plan=${plan}`,
      locale: "pt-BR",
    })

    return NextResponse.redirect(checkoutSession.url!)
  }

  // Fluxo sem sessão, mas com email
  if (emailParam) {
    // Busca ou cria customer no Stripe pelo email
    const existingCustomers = await stripe.customers.list({ email: emailParam, limit: 1 })
    let customerId: string

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id
    } else {
      const customer = await stripe.customers.create({
        email: emailParam,
      })
      customerId = customer.id
    }

    const successUrl = `${baseUrl}/cadastro?email=${encodeURIComponent(emailParam)}&next=${encodeURIComponent("/dashboard?upgraded=true")}`

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: {},
        ...(addInvoiceItems.length > 0 ? { add_invoice_items: addInvoiceItems } : {}),
      },
      success_url: successUrl,
      cancel_url:  `${baseUrl}/checkout?plan=${plan}&email=${encodeURIComponent(emailParam)}`,
      locale: "pt-BR",
    })

    return NextResponse.redirect(checkoutSession.url!)
  }

  // Sem sessão e sem email → redirecionar para login
  const dest = new URL(req.url).pathname + new URL(req.url).search
  return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(dest)}`, req.url))
}
