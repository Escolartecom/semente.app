import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const savedOnly = searchParams.get("saved") === "true"

  const devotionals = await db.devotional.findMany({
    where: {
      userId: session.user.id,
      ...(savedOnly ? { isSaved: true } : {}),
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(devotionals)
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID obrigatório" }, { status: 400 })
  }

  const devotional = await db.devotional.findUnique({ where: { id } })
  if (!devotional || devotional.userId !== session.user.id) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 })
  }

  await db.devotional.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
