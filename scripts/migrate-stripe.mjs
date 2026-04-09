// Roda com: node scripts/migrate-stripe.mjs
// Adiciona as colunas do Stripe na tabela User do Turso

import { createClient } from "@libsql/client"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dir = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(resolve(__dir, "../.env"), "utf-8")
for (const line of envContent.split("\n")) {
  const t = line.trim()
  if (!t || t.startsWith("#")) continue
  const [key, ...rest] = t.split("=")
  process.env[key.trim()] = rest.join("=").replace(/^["']|["']$/g, "")
}

const client = createClient({
  url:       process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const columns = [
  { name: "stripeCustomerId",     sql: `ALTER TABLE "User" ADD COLUMN "stripeCustomerId" TEXT` },
  { name: "stripeSubscriptionId", sql: `ALTER TABLE "User" ADD COLUMN "stripeSubscriptionId" TEXT` },
]

for (const col of columns) {
  try {
    await client.execute(col.sql)
    console.log(`✅ Coluna "${col.name}" adicionada`)
  } catch (e) {
    if (e.message?.includes("duplicate column") || e.message?.includes("already exists")) {
      console.log(`ℹ️  "${col.name}" já existe`)
    } else {
      console.error(`❌ Erro em "${col.name}":`, e.message)
    }
  }
}

console.log("\n🎉 Banco atualizado com colunas do Stripe!")
