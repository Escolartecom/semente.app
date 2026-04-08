import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id, isSaved } = await req.json()

  const devotional = await db.devotional.findUnique({ where: { id } })
  if (!devotional || devotional.userId !== session.user.id) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 })
  }

  const updated = await db.devotional.update({
    where: { id },
    data: { isSaved },
  })

  return NextResponse.json(updated)
}
