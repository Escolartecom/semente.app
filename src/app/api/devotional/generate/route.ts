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
