"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookMarked, Sparkles } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Devotional {
  id: string
  title: string
  verse: string
  verseReference: string
  feeling?: string
  createdAt: string
  isSaved: boolean
}

const greetings = [
  "Que bom te ver hoje",
  "Bem-vindo de volta",
  "Que alegria ter você aqui",
  "Olá, que dia abençoado",
]

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [loading, setLoading] = useState(true)

  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const firstName = session?.user?.name?.split(" ")[0] || "você"

  useEffect(() => {
    fetch("/api/devotional/list")
      .then((r) => r.json())
      .then((data) => {
        setDevotionals(Array.isArray(data) ? data.slice(0, 3) : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      {/* ── Header ──────────────────────────────────────── */}
      <div style={{ paddingTop: 8 }}>
        <p style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "capitalize", marginBottom: 10, letterSpacing: "0.04em" }}>
          {today}
        </p>
        <h1
          style={{
            ...S.serif,
            fontSize: "clamp(26px, 4.5vw, 36px)",
            fontWeight: 300,
            color: "var(--ink)",
            lineHeight: 1.1,
          }}
        >
          {greeting}, {firstName}.
        </h1>
      </div>

      {/* ── CTA Card ────────────────────────────────────── */}
      <div
        style={{
          background: "var(--bg)",
          borderRadius: 12,
          padding: "clamp(28px, 4vw, 40px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(200,165,90,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.20em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            Devocional de hoje
          </p>
          <h2
            style={{
              ...S.serif,
              fontSize: 24,
              fontWeight: 300,
              color: "var(--text)",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Como você está se sentindo hoje?
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28, lineHeight: 1.6 }}>
            Conte ao Semente e receba um devocional criado para o seu momento.
          </p>
          <Link
            href="/gerar"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 22px",
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Gerar meu devocional
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { label: "Gerados", value: devotionals.length, icon: Sparkles },
          { label: "Salvos", value: devotionals.filter((d) => d.isSaved).length, icon: BookMarked },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            style={{
              background: "var(--cream-2)",
              border: "1px solid var(--cream-border)",
              borderRadius: 10,
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Icon size={14} style={{ color: "var(--ink-3)" }} />
              <span style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {label}
              </span>
            </div>
            <p
              style={{
                fontSize: 36,
                fontWeight: 300,
                color: "var(--ink)",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Recent devotionals ──────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Recentes
          </h2>
          <Link
            href="/devocionais"
            style={{ fontSize: 12, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 4 }}
          >
            Ver todos <ArrowRight size={11} />
          </Link>
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="shimmer-light" style={{ height: 72, borderRadius: 8 }} />
            ))}
          </div>
        ) : devotionals.length === 0 ? (
          <div
            style={{
              background: "var(--cream-2)",
              border: "1px solid var(--cream-border)",
              borderRadius: 10,
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 20 }}>
              Você ainda não gerou nenhum devocional.
            </p>
            <Link
              href="/gerar"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "var(--ink)",
                color: "var(--cream)",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Gerar o primeiro
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {devotionals.map((d, i) => (
              <Link
                key={d.id}
                href={`/devocionais?id=${d.id}`}
                className="card-hover"
                style={{
                  display: "block",
                  background: "var(--cream-2)",
                  border: "1px solid var(--cream-border)",
                  borderRadius: 8,
                  padding: "16px 20px",
                  marginBottom: 4,
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.title}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
                      {d.verseReference}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    {d.isSaved && <BookMarked size={13} style={{ color: "var(--gold)" }} />}
                    <span style={{ fontSize: 11, color: "var(--ink-3)" }}>
                      {formatDate(d.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Plan banner ─────────────────────────────────── */}
      {session?.user?.plan === "free" && (
        <div
          style={{
            background: "var(--bg-3)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>
              Plano Grátis — 3 devocionais por mês
            </p>
            <p style={{ fontSize: 12, color: "var(--text-2)" }}>
              Devocionais ilimitados por R$29,90/mês. Cancele quando quiser.
            </p>
          </div>
          <Link
            href="/#precos"
            style={{
              flexShrink: 0,
              display: "inline-block",
              padding: "9px 18px",
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            Ver planos
          </Link>
        </div>
      )}
    </div>
  )
}
