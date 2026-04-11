import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendDailyReminderEmail } from "@/lib/email"

export const runtime = "nodejs"

// Rota chamada pelo Vercel Cron todo dia às 8h (horário de Brasília = 11h UTC)
export async function GET(req: Request) {
  const secret = req.headers.get("x-cron-secret")
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Busca todos os usuários premium com email
  const users = await db.user.findMany({
    where: { plan: "premium", email: { not: null } },
    select: { email: true, name: true },
  })

  let sent = 0
  let failed = 0

  for (const user of users) {
    if (!user.email) continue
    try {
      await sendDailyReminderEmail(user.email, user.name ?? "")
      sent++
    } catch {
      failed++
    }
  }

  console.log(`[cron/daily-reminder] enviados: ${sent}, falhas: ${failed}`)
  return NextResponse.json({ sent, failed })
}
