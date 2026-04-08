// Roda com: node scripts/setup-db.mjs
// Cria todas as tabelas no Turso automaticamente

import { createClient } from "@libsql/client"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

// Carregar variáveis do .env manualmente
const __dir = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dir, "../.env")
const envContent = readFileSync(envPath, "utf-8")
for (const line of envContent.split("\n")) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) continue
  const [key, ...rest] = trimmed.split("=")
  const value = rest.join("=").replace(/^["']|["']$/g, "")
  process.env[key.trim()] = value
}

const url       = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  console.error("❌ TURSO_DATABASE_URL ou TURSO_AUTH_TOKEN não encontrados no .env")
  process.exit(1)
}

console.log("🔗 Conectando ao Turso:", url)
const client = createClient({ url, authToken })

const tables = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id"            TEXT     NOT NULL PRIMARY KEY,
    "name"          TEXT,
    "email"         TEXT     NOT NULL UNIQUE,
    "emailVerified" DATETIME,
    "image"         TEXT,
    "password"      TEXT,
    "plan"          TEXT     NOT NULL DEFAULT 'free',
    "createdAt"     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS "Account" (
    "id"                TEXT NOT NULL PRIMARY KEY,
    "userId"            TEXT NOT NULL,
    "type"              TEXT NOT NULL,
    "provider"          TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token"     TEXT,
    "access_token"      TEXT,
    "expires_at"        INTEGER,
    "token_type"        TEXT,
    "scope"             TEXT,
    "id_token"          TEXT,
    "session_state"     TEXT,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
    UNIQUE ("provider", "providerAccountId")
  )`,

  `CREATE TABLE IF NOT EXISTS "Session" (
    "id"           TEXT     NOT NULL PRIMARY KEY,
    "sessionToken" TEXT     NOT NULL UNIQUE,
    "userId"       TEXT     NOT NULL,
    "expires"      DATETIME NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT     NOT NULL,
    "token"      TEXT     NOT NULL UNIQUE,
    "expires"    DATETIME NOT NULL,
    UNIQUE ("identifier", "token")
  )`,

  `CREATE TABLE IF NOT EXISTS "Devotional" (
    "id"             TEXT     NOT NULL PRIMARY KEY,
    "userId"         TEXT     NOT NULL,
    "feeling"        TEXT,
    "userInput"      TEXT,
    "title"          TEXT     NOT NULL,
    "verse"          TEXT     NOT NULL,
    "verseReference" TEXT     NOT NULL,
    "reflection"     TEXT     NOT NULL,
    "practicalApp"   TEXT     NOT NULL,
    "prayer"         TEXT     NOT NULL,
    "isSaved"        INTEGER  NOT NULL DEFAULT 0,
    "createdAt"      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
  )`,
]

const names = ["User", "Account", "Session", "VerificationToken", "Devotional"]

for (let i = 0; i < tables.length; i++) {
  try {
    await client.execute(tables[i])
    console.log(`✅ Tabela "${names[i]}" criada`)
  } catch (err) {
    console.error(`❌ Erro na tabela "${names[i]}":`, err.message)
  }
}

// Verificar
const result = await client.execute(
  `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`
)
console.log("\n📋 Tabelas no banco:")
result.rows.forEach(r => console.log("  •", r.name))
console.log("\n🎉 Pronto! Agora faça deploy no Vercel.")
