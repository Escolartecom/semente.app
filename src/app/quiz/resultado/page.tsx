"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Loader2, ArrowRight } from "lucide-react"

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

interface Devotional {
  title: string
  verse: string
  verseReference: string
  reflection: string
  practicalApp: string
  prayer: string
}

function ResultadoInner() {
  const searchParams = useSearchParams()
  const feeling = searchParams.get("feeling") || "ansioso"
  const need    = searchParams.get("need")    || ""

  const [devotional, setDevotional] = useState<Devotional | null>(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(false)

  const checkoutHref = `/cadastro?next=${encodeURIComponent("/api/stripe/checkout?plan=monthly")}`

  useEffect(() => {
    fetch("/api/quiz/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feeling, need }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(true); setLoading(false); return }
        setDevotional(data)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [feeling, need])

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ padding: "24px clamp(16px, 4vw, 40px)", borderBottom: "1px solid var(--border-2)" }}>
        <Logo size="sm" variant="light" />
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(48px, 7vw, 96px) clamp(16px, 4vw, 40px)",
      }}>
        <div style={{ width: "100%", maxWidth: 600 }}>

          {/* ── Loading ── */}
          {loading && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <Loader2
                size={28}
                style={{ color: "var(--gold)", marginBottom: 24, display: "inline-block" }}
                className="animate-spin"
              />
              <p style={{ ...S.serif, fontSize: 22, color: "var(--text-2)", fontWeight: 300, lineHeight: 1.5 }}>
                Preparando sua palavra<br />com cuidado...
              </p>
            </div>
          )}

          {/* ── Error ── */}
          {error && !loading && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "var(--text-3)", marginBottom: 20 }}>
                Algo deu errado. Tente novamente.
              </p>
              <Link href="/quiz" style={{ color: "var(--gold)" }}>
                Voltar ao quiz
              </Link>
            </div>
          )}

          {/* ── Devocional ── */}
          {!loading && devotional && (
            <>
              {/* Label */}
              <p style={{
                fontSize: 11,
                color: "var(--gold)",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 500,
              }}>
                Sua palavra de hoje
              </p>

              {/* Title */}
              <h1 style={{
                ...S.serif,
                fontSize: "clamp(26px, 4.5vw, 40px)",
                fontWeight: 300,
                color: "var(--text)",
                lineHeight: 1.15,
                marginBottom: 10,
              }}>
                {devotional.title}
              </h1>
              <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 44, lineHeight: 1.5 }}>
                Isso foi preparado para o que você está vivendo agora.
              </p>

              {/* Verse */}
              <div style={{
                borderLeft: "2px solid var(--gold)",
                paddingLeft: 22,
                marginBottom: 40,
              }}>
                <p style={{
                  ...S.serif,
                  fontSize: "clamp(16px, 2.5vw, 20px)",
                  fontStyle: "italic",
                  color: "var(--text)",
                  lineHeight: 1.8,
                  marginBottom: 10,
                  fontWeight: 300,
                }}>
                  "{devotional.verse}"
                </p>
                <p style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.10em" }}>
                  {devotional.verseReference}
                </p>
              </div>

              {/* Reflection */}
              <div style={{ marginBottom: 36 }}>
                <p style={{
                  fontSize: 10,
                  color: "var(--text-3)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  fontWeight: 600,
                }}>
                  Reflexão
                </p>
                <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.85 }}>
                  {devotional.reflection}
                </p>
              </div>

              {/* Practical App */}
              <div style={{ marginBottom: 36 }}>
                <p style={{
                  fontSize: 10,
                  color: "var(--text-3)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  fontWeight: 600,
                }}>
                  Para o seu dia
                </p>
                <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.85 }}>
                  {devotional.practicalApp}
                </p>
              </div>

              {/* Prayer */}
              <div style={{
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "28px 28px",
                marginBottom: 56,
              }}>
                <p style={{
                  fontSize: 10,
                  color: "var(--gold)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  fontWeight: 600,
                }}>
                  Oração
                </p>
                <p style={{
                  ...S.serif,
                  fontSize: 15,
                  fontStyle: "italic",
                  color: "var(--text-2)",
                  lineHeight: 1.9,
                  fontWeight: 300,
                }}>
                  {devotional.prayer}
                </p>
              </div>

              {/* ── Oferta ── */}
              <div style={{ borderTop: "1px solid var(--border-2)", paddingTop: 64 }}>

                {/* Número animado */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <div style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    border: "2px solid rgba(200,165,90,0.7)",
                    background: "radial-gradient(circle, rgba(200,165,90,0.22) 0%, rgba(200,165,90,0.06) 60%, transparent 100%)",
                    marginBottom: 24,
                    boxShadow: "0 0 60px rgba(200,165,90,0.35), 0 0 120px rgba(200,165,90,0.15), inset 0 0 40px rgba(200,165,90,0.12)",
                    animation: "glow-breathe 3.5s ease-in-out infinite",
                  }}>
                    <span style={{ ...S.serif, fontSize: 56, fontWeight: 300, color: "var(--gold)", lineHeight: 1, textShadow: "0 0 20px rgba(200,165,90,0.8)" }}>60</span>
                    <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase", marginTop: 3, fontWeight: 500 }}>dias</span>
                  </div>

                  <p style={{
                    ...S.serif,
                    fontSize: "clamp(22px, 4vw, 32px)",
                    fontWeight: 300,
                    color: "var(--text)",
                    lineHeight: 1.25,
                    marginBottom: 12,
                  }}>
                    Essa foi sua primeira palavra.<br />
                    Imagine receber isso todo dia.
                  </p>
                  <p style={{
                    fontSize: 15,
                    color: "var(--text-3)",
                    lineHeight: 1.75,
                    maxWidth: 420,
                    margin: "0 auto",
                  }}>
                    Uma mensagem de Deus conectada com o que você está vivendo —{" "}
                    <span style={{ color: "var(--text-2)", fontWeight: 500 }}>não para todo mundo, para você</span>.
                    Todo dia, no seu momento.
                  </p>
                </div>

                {/* Oferta box */}
                <div style={{
                  background: "linear-gradient(160deg, rgba(200,165,90,0.09) 0%, rgba(200,165,90,0.03) 100%)",
                  border: "1px solid rgba(200,165,90,0.3)",
                  borderRadius: 16,
                  padding: "clamp(28px, 5vw, 44px)",
                  marginBottom: 16,
                  boxShadow: "0 0 60px rgba(200,165,90,0.07)",
                }}>
                  <p style={{
                    fontSize: 10,
                    color: "var(--gold)",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    marginBottom: 20,
                    fontWeight: 600,
                    textAlign: "center",
                  }}>
                    ✦ Desafio 60 Dias com Deus ✦
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                    {[
                      { icon: "🌱", text: "Uma palavra personalizada para o seu momento, todo dia" },
                      { icon: "📖", text: "Versículo, reflexão, aplicação prática e oração" },
                      { icon: "📅", text: "Calendário dos 60 dias para acompanhar sua jornada" },
                      { icon: "🔒", text: "Histórico completo e acesso a qualquer hora" },
                    ].map(f => (
                      <div key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                        <span style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.5 }}>{f.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={checkoutHref}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "18px",
                      background: "var(--gold)",
                      color: "var(--bg)",
                      borderRadius: 10,
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      marginBottom: 12,
                      boxShadow: "0 4px 32px rgba(200,165,90,0.40)",
                    }}
                  >
                    Quero aceitar o desafio
                    <ArrowRight size={15} />
                  </Link>
                  <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)" }}>
                    Acesso imediato · Cancele quando quiser · Sem risco
                  </p>
                </div>

                <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-3)" }}>
                  Prefere começar de graça?{" "}
                  <Link href="/cadastro" style={{ color: "var(--gold)" }}>
                    Criar conta grátis →
                  </Link>
                </p>

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default function QuizResultadoPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Loader2 size={24} style={{ color: "var(--gold)" }} className="animate-spin" />
      </div>
    }>
      <ResultadoInner />
    </Suspense>
  )
}
