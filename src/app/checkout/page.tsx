"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { ArrowRight, Check } from "lucide-react"
import { Loader2 } from "lucide-react"

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

function CheckoutInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get("plan") || "monthly"
  const emailParam = searchParams.get("email") || ""
  const [orderBump, setOrderBump] = useState(false)
  const [loading, setLoading] = useState(false)

  const mainPrice = plan === "yearly" ? "R$197/ano" : "R$27/mês"
  const mainLabel = plan === "yearly" ? "Jornada Completa Anual" : "Desafio Semente Mensal"

  function handleContinue() {
    setLoading(true)
    const params = new URLSearchParams({ plan })
    if (orderBump) params.set("orderBump", "true")
    if (emailParam) params.set("email", emailParam)
    router.push(`/api/stripe/checkout?${params.toString()}`)
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
        justifyContent: "center",
        padding: "clamp(40px, 7vw, 80px) clamp(16px, 4vw, 40px)",
      }}>
        <div style={{ width: "100%", maxWidth: 480 }}>

          {/* Título */}
          <p style={{
            fontSize: 11, color: "var(--gold)", letterSpacing: "0.20em",
            textTransform: "uppercase", marginBottom: 12, fontWeight: 500,
          }}>
            ✦ Desafio Semente ✦
          </p>
          <h1 style={{
            ...S.serif,
            fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 300, color: "var(--text)", lineHeight: 1.2, marginBottom: 8,
          }}>
            Você está prestes a tomar uma decisão que pode mudar a sua vida para sempre.
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 40, lineHeight: 1.6 }}>
            60 dias com Deus. Uma palavra preparada para o seu momento, todo dia. Ao final, uma vida que você não vai mais reconhecer.
          </p>

          {/* Plano principal */}
          <div style={{
            background: "linear-gradient(160deg, rgba(200,165,90,0.12) 0%, rgba(200,165,90,0.04) 100%)",
            border: "2px solid rgba(200,165,90,0.55)",
            borderRadius: 12,
            padding: "24px",
            marginBottom: 16,
            boxShadow: "0 0 32px rgba(200,165,90,0.12)",
          }}>
            {/* Badge */}
            <div style={{ marginBottom: 14 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--bg)",
                background: "var(--gold)",
                padding: "3px 10px",
                borderRadius: 20,
              }}>
                Produto principal
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>🌱</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{mainLabel}</p>
                  <p style={{ fontSize: 11, color: "var(--text-3)" }}>Desafio Semente · 60 dias com Deus</p>
                </div>
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--gold)" }}>{mainPrice}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Uma palavra de Deus para o seu momento, todos os dias",
                "Versículo, reflexão e oração",
                "Progresso Fase Semente → Raízes → Fruto",
                "Cancele quando quiser",
              ].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Check size={12} color="var(--gold)" />
                  <span style={{ fontSize: 13, color: "var(--text-2)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Bump */}
          <button
            onClick={() => setOrderBump(v => !v)}
            style={{
              width: "100%",
              textAlign: "left",
              background: orderBump
                ? "linear-gradient(160deg, rgba(200,165,90,0.12) 0%, rgba(200,165,90,0.05) 100%)"
                : "var(--bg-2)",
              border: orderBump ? "1px solid rgba(200,165,90,0.5)" : "1px solid var(--border)",
              borderRadius: 12,
              padding: "20px 24px",
              marginBottom: 32,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              {/* Checkbox */}
              <div style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 2,
                border: orderBump ? "none" : "1.5px solid var(--border)",
                background: orderBump ? "var(--gold)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {orderBump && <Check size={12} color="var(--bg)" strokeWidth={3} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                      ✦ Adicionar: Clamor
                    </p>
                    <p style={{ fontSize: 11, color: "var(--gold)", fontStyle: "italic", marginTop: 1 }}>
                      orações para quando as palavras faltam
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, marginLeft: 12, textAlign: "right" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: orderBump ? "var(--gold)" : "var(--text-2)" }}>+R$17</p>
                    <p style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.04em", marginTop: 2, whiteSpace: "nowrap", fontWeight: 600 }}>pagamento único</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.65, marginBottom: 10, marginTop: 10 }}>
                  Tem horas que você está no fundo do poço e não sabe nem como começar a falar com Deus. O Clamor é uma coleção de orações para esses momentos — ansiedade, luto, medo, silêncio, dúvida. Palavras para quando as suas acabam. Uma cobrança única, acesso para sempre.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Ansiedade", "Luto", "Família", "Propósito", "Cura", "Perdão"].map(tag => (
                    <span key={tag} style={{
                      fontSize: 10, padding: "3px 8px", borderRadius: 20,
                      background: "rgba(200,165,90,0.08)", color: "var(--text-3)",
                      letterSpacing: "0.04em",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>

          {/* Por que esse valor */}
          <div style={{
            background: "rgba(200,165,90,0.05)",
            border: "1px solid rgba(200,165,90,0.15)",
            borderRadius: 10,
            padding: "16px 20px",
            marginBottom: 20,
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>🌿</span>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)", marginBottom: 4 }}>
                Por que esse valor?
              </p>
              <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.7 }}>
                O Semente é sustentado por quem acredita na missão. Uma parte de cada assinatura é destinada a obras e ministérios — para que a Palavra continue chegando onde mais precisa. O restante mantém a plataforma ativa, gratuita para quem não pode pagar e em constante crescimento.
              </p>
            </div>
          </div>

          {/* Total */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 24, padding: "0 4px",
          }}>
            <p style={{ fontSize: 13, color: "var(--text-3)" }}>Total hoje</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>
              {plan === "yearly"
                ? orderBump ? "R$224" : "R$197"
                : orderBump ? "R$44" : "R$27"}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleContinue}
            disabled={loading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "17px",
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              border: "none",
              boxShadow: "0 4px 28px rgba(200,165,90,0.40)",
              marginBottom: 12,
            }}
          >
            {loading
              ? <Loader2 size={18} className="animate-spin" />
              : <><span>Finalizar e aceitar o desafio</span><ArrowRight size={15} /></>
            }
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-3)", marginBottom: 8, fontStyle: "italic" }}>
            "60 dias com Deus. Uma vida transformada."
          </p>
          <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)" }}>
            Pagamento seguro via Stripe · Cancele quando quiser
          </p>

        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 size={24} style={{ color: "var(--gold)" }} className="animate-spin" />
      </div>
    }>
      <CheckoutInner />
    </Suspense>
  )
}
