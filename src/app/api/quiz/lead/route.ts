import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, feeling, need, area } = await req.json()
    // Log para debug — adicionar persistência no banco quando schema for atualizado
    console.log("[quiz/lead]", { email, feeling, need, area, ts: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
