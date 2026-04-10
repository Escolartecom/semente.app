import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Este email já está em uso" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        plan: "free",
      },
    })

    // Verifica se existe um customer Stripe com esse email e associa ao usuário
    try {
      const customers = await stripe.customers.list({ email, limit: 1 })
      if (customers.data.length > 0) {
        const customer = customers.data[0]
        const stripeCustomerId = customer.id

        // Verifica se há assinatura ativa para esse customer
        const subscriptions = await stripe.subscriptions.list({
          customer: stripeCustomerId,
          status: "active",
          limit: 1,
        })

        const hasActiveSubscription = subscriptions.data.length > 0
        const stripeSubscriptionId = hasActiveSubscription
          ? subscriptions.data[0].id
          : null

        await db.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId,
            ...(hasActiveSubscription
              ? { plan: "premium", stripeSubscriptionId }
              : {}),
          },
        })
      }
    } catch (stripeErr) {
      // Não falha o cadastro por erro no Stripe — apenas loga
      console.error("[register] erro ao buscar customer no Stripe:", stripeErr)
    }

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[register] erro:", msg)
    return NextResponse.json({ error: "Erro interno do servidor", detail: msg }, { status: 500 })
  }
}
