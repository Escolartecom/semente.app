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
  const feeling      = searchParams.get("feeling")      || "ansioso"
  const need         = searchParams.get("need")         || ""
  const area         = searchParams.get("area")         || ""
  const relationship = searchParams.get("relationship") || ""
  const barrier      = searchParams.get("barrier")      || ""

  const [devotional, setDevotional]         = useState<Devotional | null>(null)
  const [loading, setLoading]               = useState(true)
  const [error, setError]                   = useState(false)
  const [emailUnlocked, setEmailUnlocked]   = useState(false)
  const [email, setEmail]                   = useState("")
  const [submitting, setSubmitting]         = useState(false)
  const [emailError, setEmailError]         = useState("")

  const checkoutHref = `/checkout?plan=monthly`

  useEffect(() => {
    fetch("/api/quiz/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feeling, need, area, relationship, barrier }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(true); setLoading(false); return }
        setDevotional(data)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [feeling, need, area])

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes("@")) {
      setEmailError("Digite um email válido.")
      return
    }
    setEmailError("")
    setSubmitting(true)
    await fetch("/api/quiz/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed, feeling, need, area, relationship, barrier }),
    }).catch(() => {})
    setEmailUnlocked(true)
    setSubmitting(false)
  }

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
                Deus está preparando<br />uma palavra só para você...
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
                ✦ Sua primeira semente ✦
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
                Essa palavra não foi escrita para o mundo. Foi escrita para você — para esse momento, para essa dor, para essa busca.
              </p>

              {/* Verse — sempre visível */}
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

              {/* ── Email unlock gate ── */}
              {!emailUnlocked ? (
                <>
                  {/* Reflexão truncada com fade */}
                  <div style={{ position: "relative", marginBottom: 0, overflow: "hidden" }}>
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
                      {devotional.reflection.slice(0, 160)}...
                    </p>
                    {/* Fade overlay */}
                    <div style={{
                      position: "absolute",
                      bottom: 0, left: 0, right: 0,
                      height: 80,
                      background: "linear-gradient(to bottom, transparent, var(--bg))",
                      pointerEvents: "none",
                    }} />
                  </div>

                  {/* Email capture */}
                  <div style={{
                    background: "linear-gradient(160deg, rgba(200,165,90,0.08) 0%, rgba(200,165,90,0.02) 100%)",
                    border: "1px solid rgba(200,165,90,0.25)",
                    borderRadius: 14,
                    padding: "clamp(28px, 5vw, 40px)",
                    marginTop: 32,
                    textAlign: "center",
                  }}>
                    <div style={{
                      width: 48, height: 48,
                      borderRadius: "50%",
                      border: "1px solid rgba(200,165,90,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      background: "rgba(200,165,90,0.08)",
                    }}>
                      <span style={{ fontSize: 22 }}>🌱</span>
                    </div>

                    <h2 style={{
                      ...S.serif,
                      fontSize: "clamp(18px, 3vw, 24px)",
                      fontWeight: 300,
                      color: "var(--text)",
                      lineHeight: 1.3,
                      marginBottom: 10,
                    }}>
                      Sua palavra ainda não terminou.
                    </h2>
                    <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 28, lineHeight: 1.65 }}>
                      A reflexão, a aplicação prática e a oração foram preparadas especialmente para o seu momento. Coloque seu email para receber tudo.
                    </p>

                    <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setEmailError("") }}
                        style={{
                          padding: "14px 18px",
                          borderRadius: 8,
                          border: emailError ? "1px solid #e05252" : "1px solid var(--border)",
                          background: "var(--bg-2)",
                          color: "var(--text)",
                          fontSize: 14,
                          outline: "none",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                      {emailError && (
                        <p style={{ fontSize: 12, color: "#e05252", textAlign: "left" }}>{emailError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          padding: "14px",
                          background: "var(--gold)",
                          color: "var(--bg)",
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 700,
                          cursor: submitting ? "wait" : "pointer",
                          border: "none",
                          boxShadow: "0 4px 24px rgba(200,165,90,0.35)",
                        }}
                      >
                        {submitting ? <Loader2 size={16} className="animate-spin" /> : (
                          <>Receber minha palavra completa <ArrowRight size={14} /></>
                        )}
                      </button>
                    </form>

                    <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 14 }}>
                      Gratuito. Sem spam. Cancele quando quiser.
                    </p>
                  </div>
                </>
              ) : (
                /* ── Conteúdo completo desbloqueado ── */
                <>
                  {/* Reflexão */}
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
                    padding: "28px",
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

                    {/* Círculo 60 */}
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
                        Percebeu como essa palavra<br />falou com o que você está vivendo?
                      </p>
                      <p style={{
                        fontSize: 15,
                        color: "var(--text-3)",
                        lineHeight: 1.75,
                        maxWidth: 440,
                        margin: "0 auto",
                      }}>
                        Agora imagine receber isso todo dia. Por 60 dias seguidos.{" "}
                        <span style={{ color: "var(--text-2)", fontWeight: 500 }}>Uma palavra preparada para o seu momento — sempre sobre você, nunca igual à de ontem.</span>
                        {" "}Ao final dos 60 dias, você vai olhar pra trás e não acreditar em quem você era quando começou.
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
                        ✦ Desafio Semente ✦
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                        {[
                          { icon: "🌱", text: "Uma palavra de Deus para o seu momento, todo dia" },
                          { icon: "📖", text: "Versículo, reflexão, aplicação prática e oração" },
                          { icon: "📅", text: "Progresso dia a dia — Fase Semente, Raízes e Fruto" },
                          { icon: "🔒", text: "Histórico completo e acesso a qualquer hora" },
                        ].map(f => (
                          <div key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                            <span style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.5 }}>{f.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Preço */}
                      <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <p style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>
                          R$27<span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-3)" }}>/mês</span>
                        </p>
                        <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>
                          menos de R$1 por dia · cancele quando quiser
                        </p>
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
