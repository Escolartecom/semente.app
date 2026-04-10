import { NextResponse } from "next/server"
import { generateDevotional } from "@/lib/ai"

// Endpoint público — sem autenticação, usado pelo quiz
export async function POST(req: Request) {
  try {
    const { feeling, need, area, relationship, barrier } = await req.json()

    const parts: string[] = []
    if (need)         parts.push(`O que preciso ouvir: ${need}`)
    if (area)         parts.push(`Área da vida mais pesada agora: ${area}`)
    if (relationship) parts.push(`Relação com Deus: ${relationship}`)
    if (barrier)      parts.push(`Barreira espiritual: ${barrier}`)

    const userInput = parts.length > 0 ? parts.join("\n") : undefined

    const devotional = await generateDevotional({ feeling, userInput })
    return NextResponse.json(devotional)
  } catch (err) {
    console.error("[quiz/generate]", err)
    return NextResponse.json({ error: "Erro ao gerar devocional" }, { status: 500 })
  }
}
