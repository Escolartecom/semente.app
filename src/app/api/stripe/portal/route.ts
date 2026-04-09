import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { stripeCustomerId: true },
  })

  if (!user?.stripeCustomerId) {
    // Sem assinatura ativa → manda para a página de planos
    return NextResponse.redirect(new URL("/#precos", req.url))
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://semente-app.vercel.app"

  const portalSession = await stripe.billingPortal.sessions.create({
    customer:   user.stripeCustomerId,
    return_url: `${baseUrl}/perfil`,
  })

  return NextResponse.redirect(portalSession.url)
}
