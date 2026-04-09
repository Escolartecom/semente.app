import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const { searchParams } = new URL(req.url)
  const plan = searchParams.get("plan") ?? "monthly"

  const priceId =
    plan === "yearly"
      ? process.env.STRIPE_PRICE_YEARLY!
      : process.env.STRIPE_PRICE_MONTHLY!

  // Busca ou cria o customer no Stripe
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

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://semente-app.vercel.app"

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard?upgraded=true`,
    cancel_url:  `${baseUrl}/#precos`,
    locale: "pt-BR",
    subscription_data: {
      metadata: { userId: session.user.id },
    },
  })

  return NextResponse.redirect(checkoutSession.url!)
}
