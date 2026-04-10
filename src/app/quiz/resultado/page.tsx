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
              <div style={{ borderTop: "1px solid var(--border-2)", paddingTop: 56 }}>

                <p style={{
                  ...S.serif,
                  fontSize: "clamp(24px, 4vw, 34px)",
                  fontWeight: 300,
                  color: "var(--text)",
                  lineHeight: 1.25,
                  marginBottom: 16,
                  textAlign: "center",
                }}>
                  Essa foi sua primeira palavra.<br />
                  Imagine receber isso todo dia.
                </p>
                <p style={{
                  fontSize: 15,
                  color: "var(--text-3)",
                  textAlign: "center",
                  lineHeight: 1.75,
                  marginBottom: 40,
                  maxWidth: 480,
                  margin: "0 auto 40px",
                }}>
                  Uma mensagem de Deus conectada com o que você está vivendo — não para todo mundo,{" "}
                  <span style={{ color: "var(--text-2)", fontWeight: 500 }}>para você</span>.
                  Todo dia, no seu momento.
                </p>

                {/* Oferta box */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(200,165,90,0.08) 0%, transparent 100%)",
                  border: "1px solid rgba(200,165,90,0.25)",
                  borderRadius: 12,
                  padding: "clamp(28px, 4vw, 40px)",
                  marginBottom: 16,
                }}>
                  <p style={{
                    fontSize: 10,
                    color: "var(--gold)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                    fontWeight: 600,
                    textAlign: "center",
                  }}>
                    Desafio 60 dias com Deus
                  </p>
                  <p style={{
                    fontSize: 14,
                    color: "var(--text-2)",
                    textAlign: "center",
                    lineHeight: 1.7,
                    marginBottom: 28,
                  }}>
                    60 dias recebendo uma palavra personalizada para o seu momento.
                    Uma rotina espiritual que se encaixa na sua vida real.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {[
                      "Devocionais ilimitados e personalizados",
                      "Versículo, reflexão, aplicação e oração",
                      "Histórico completo da sua jornada espiritual",
                      "Acesso a qualquer hora, em qualquer momento",
                    ].map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "var(--gold)",
                          flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 13, color: "var(--text-2)" }}>{f}</span>
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
                      padding: "16px",
                      background: "var(--gold)",
                      color: "var(--bg)",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      marginBottom: 10,
                    }}
                  >
                    Quero começar meu desafio de 60 dias
                    <ArrowRight size={14} />
                  </Link>
                  <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)" }}>
                    R$29,90/mês · Cancele quando quiser · Acesso imediato
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
