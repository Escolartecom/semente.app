import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { createdAt: true, plan: true },
  })

  if (!user || user.plan === "free") {
    return NextResponse.json({ phase: null, day: null, progress: null })
  }

  const startDate = user.createdAt
  const now = new Date()
  const msPerDay = 1000 * 60 * 60 * 24
  const dayNumber = Math.max(1, Math.floor((now.getTime() - startDate.getTime()) / msPerDay) + 1)

  let phase: string
  let phaseIcon: string
  let phaseMotto: string
  let dayInPhase: number
  let phaseTotal = 60

  if (dayNumber <= 60) {
    phase = "Fase Semente"
    phaseIcon = "🌱"
    phaseMotto = "Plante a Palavra"
    dayInPhase = dayNumber
  } else if (dayNumber <= 120) {
    phase = "Fase Raízes"
    phaseIcon = "🌿"
    phaseMotto = "Aprofunde a fé"
    dayInPhase = dayNumber - 60
  } else if (dayNumber <= 180) {
    phase = "Fase Fruto"
    phaseIcon = "🌳"
    phaseMotto = "Viva o que cresceu"
    dayInPhase = dayNumber - 120
  } else {
    phase = "Fase Fruto"
    phaseIcon = "🌳"
    phaseMotto = "Viva o que cresceu"
    dayInPhase = 60
  }

  const progress = Math.min(100, Math.round((dayInPhase / phaseTotal) * 100))

  return NextResponse.json({
    phase,
    phaseIcon,
    phaseMotto,
    dayNumber,
    dayInPhase,
    phaseTotal,
    progress,
  })
}
