import { NextResponse } from "next/server"
import { generateDevotional } from "@/lib/ai"

// Endpoint público — sem autenticação, usado pelo quiz
export async function POST(req: Request) {
  try {
    const { feeling, need } = await req.json()

    const userInput = need
      ? `Preciso ouvir: ${need}`
      : undefined

    const devotional = await generateDevotional({ feeling, userInput })
    return NextResponse.json(devotional)
  } catch (err) {
    console.error("[quiz/generate]", err)
    return NextResponse.json({ error: "Erro ao gerar devocional" }, { status: 500 })
  }
}
