import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { generateDevotional } from "@/lib/ai"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { feeling, userInput } = await req.json()

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, email: true },
  })

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
  }

  // Limite free: 1 devocional por semana
  const isAdminBypass = user.email === "trabalho.smcc@gmail.com"
  if (user.plan === "free" && !isAdminBypass) {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const recentCount = await db.devotional.count({
      where: { userId: session.user.id, createdAt: { gte: oneWeekAgo } },
    })
    if (recentCount >= 1) {
      return NextResponse.json({ error: "FREE_LIMIT_REACHED" }, { status: 403 })
    }
  }
  const devotionalData = await generateDevotional({ feeling, userInput })

  const devotional = await db.devotional.create({
    data: {
      userId: session.user.id,
      feeling,
      userInput,
      ...devotionalData,
      isSaved: false,
    },
  })

  return NextResponse.json(devotional)
}
