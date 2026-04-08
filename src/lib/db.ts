import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Production (Turso): use TURSO_DATABASE_URL + TURSO_AUTH_TOKEN
  // Local (dev): use DATABASE_URL as file path
  const tursoUrl   = process.env.TURSO_DATABASE_URL
  const authToken  = process.env.TURSO_AUTH_TOKEN
  const url        = tursoUrl ?? process.env.DATABASE_URL ?? "file:./prisma/dev.db"

  const adapterConfig = authToken ? { url, authToken } : { url }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaLibSql(adapterConfig as any)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new PrismaClient({ adapter } as any)
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
