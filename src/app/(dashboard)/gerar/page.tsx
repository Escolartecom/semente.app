"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

const FEELINGS = [
  { label: "Ansioso",      value: "ansioso" },
  { label: "Triste",       value: "triste" },
  { label: "Esgotado",     value: "esgotado" },
  { label: "Frustrado",    value: "frustrado" },
  { label: "Perdido",      value: "perdido" },
  { label: "Magoado",      value: "magoado" },
  { label: "Grato",        value: "grato" },
  { label: "Esperançoso",  value: "esperançoso" },
  { label: "Feliz",        value: "feliz" },
  { label: "Em paz",       value: "em paz" },
  { label: "Determinado",  value: "determinado" },
  { label: "Confuso",      value: "confuso" },
]

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

export default function GerarPage() {
  const router = useRouter()
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)
  const [userInput, setUserInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<"choose" | "write">("choose")
  const { data: session } = useSession()
  const [devotionalCount, setDevotionalCount] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/devotional/list")
      .then((r) => r.json())
      .then((data) => setDevotionalCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setDevotionalCount(0))
  }, [])

const isPremiumRequired = session?.user?.plan === "free" && devotionalCount !== null && devotionalCount >= 1 && session?.user?.email !== "trabalho.smcc@gmail.com"

  const canGenerate = selectedFeeling || userInput.trim().length > 0

  async function handleGenerate() {
    if (!canGenerate) return
    setLoading(true)
    try {
      const res = await fetch("/api/devotional/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feeling: selectedFeeling,
          userInput: userInput.trim() || undefined,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      router.push(`/devocionais?id=${data.id}&new=1`)
    } catch {
      toast.error("Erro ao gerar devocional.")
      setLoading(false)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "var(--ink-3)",
            letterSpacing: "0.04em",
            marginBottom: 20,
          }}
        >
          <ArrowLeft size={13} />
          Início
        </Link>
        <h1
          style={{
            ...S.serif,
            fontSize: "clamp(26px, 4vw, 34px)",
            fontWeight: 300,
            color: "var(--ink)",
            lineHeight: 1,
            marginBottom: 6,
          }}
        >
          Novo Devocional
        </h1>
        <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
          Como você está se sentindo agora?
        </p>
      </div>

      {isPremiumRequired && (
        <div
          style={{
            background: "var(--bg)",
            border: "1px solid var(--gold)",
            borderRadius: 12,
            padding: "clamp(32px, 5vw, 48px)",
            boxShadow: "0 0 40px rgba(200,165,90,0.10)",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.20em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 16 }}>
            Premium
          </p>
          <h2
            style={{
              ...S.serif,
              fontSize: "clamp(22px, 4vw, 30px)",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Essa palavra foi só o começo.
          </h2>
          <p
            style={{
              ...S.serif,
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--gold)",
              lineHeight: 1.5,
              marginBottom: 20,
            }}
          >
            Receba direção todos os dias — sem limites.
          </p>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 32 }}>
            Seu próximo devocional faz parte do plano premium. Continue recebendo a palavra certa, para o seu momento, todos os dias.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {[
              "Devocionais ilimitados",
              "IA com contexto profundo",
              "Histórico completo e busca",
              "Salvar favoritos",
            ].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "var(--text-2)" }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link
              href="/#precos"
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
                fontWeight: 600,
                letterSpacing: "0.04em",
                textAlign: "center",
              }}
            >
              Ver planos — a partir de R$29,90/mês
            </Link>
            <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)" }}>
              Cancele quando quiser · Acesso imediato
            </p>
          </div>
        </div>
      )}

      {!isPremiumRequired && (
        <>
          {/* Mode toggle */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--cream-border)" }}>
            {(["choose", "write"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: mode === m ? "var(--ink)" : "var(--ink-3)",
                  borderBottom: mode === m ? "2px solid var(--ink)" : "2px solid transparent",
                  marginBottom: -1,
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {m === "choose" ? "Escolher" : "Escrever"}
              </button>
            ))}
          </div>

          {/* Feeling picker — text-based, no emojis */}
          {mode === "choose" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 13, color: "var(--ink-3)" }}>
                Selecione o que mais se aproxima do que você está vivendo.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: 6,
                }}
              >
                {FEELINGS.map((f) => {
                  const isSelected = selectedFeeling === f.value
                  return (
                    <button
                      key={f.value}
                      onClick={() => setSelectedFeeling(isSelected ? null : f.value)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: isSelected ? 500 : 400,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        background: isSelected ? "var(--bg)" : "var(--cream-2)",
                        color: isSelected ? "var(--text)" : "var(--ink-2)",
                        border: isSelected
                          ? "1px solid var(--gold)"
                          : "1px solid var(--cream-border)",
                      }}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Free text */}
          {mode === "write" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 13, color: "var(--ink-3)" }}>
                Conte o que está vivendo — uma situação, um pensamento, o que vier.
              </p>
              <textarea
                placeholder="Ex: Estou me sentindo sobrecarregado no trabalho e não consigo descansar minha mente..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                maxLength={500}
                style={{
                  minHeight: 160,
                  padding: "16px",
                  borderRadius: 8,
                  border: "1px solid var(--cream-border)",
                  background: "var(--cream-2)",
                  color: "var(--ink)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  resize: "vertical",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  outline: "none",
                }}
              />
              <p style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "right" }}>
                {userInput.length}/500
              </p>
            </div>
          )}

          {/* Generate */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "15px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                cursor: canGenerate && !loading ? "pointer" : "not-allowed",
                background: canGenerate && !loading ? "var(--gold)" : "var(--cream-2)",
                color: canGenerate && !loading ? "var(--bg)" : "var(--ink-3)",
                border: canGenerate && !loading ? "none" : "1px solid var(--cream-border)",
                transition: "opacity 0.2s",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Gerando seu devocional...
                </>
              ) : (
                "Gerar devocional"
              )}
            </button>

            {loading && (
              <p
                className="animate-pulse"
                style={{ textAlign: "center", fontSize: 12, color: "var(--ink-3)" }}
              >
                A IA está preparando sua palavra com cuidado...
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
