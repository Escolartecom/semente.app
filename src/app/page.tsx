"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Logo } from "@/components/logo"
import { ArrowRight, Check, ChevronDown } from "lucide-react"

/* ─── Pricing data ──────────────────────────────────────────── */
const freeFeatures = [
  "Comece gratuitamente agora",
  "Versículo + reflexão + oração",
  "Depois, acesso limitado",
]
const premiumFeatures = [
  "Uma palavra personalizada todos os dias",
  "Devocionais ilimitados para qualquer momento",
  "Salve e releia quando precisar",
  "Construa seu histórico espiritual",
]

const steps = [
  {
    n: "01",
    title: "Conte como você está",
    body: "Escolha um sentimento ou escreva o que está vivendo — de forma simples e pessoal.",
  },
  {
    n: "02",
    title: "Receba uma palavra de Deus",
    body: "Um devocional completo com versículo, reflexão, aplicação e oração.",
  },
  {
    n: "03",
    title: "Leve para o seu dia",
    body: "Salve, releia e construa um relacionamento constante com Deus.",
  },
]

const testimonials = [
  {
    quote: "Abro todo dia antes de começar. É o único momento que parece meu de verdade.",
    name: "Camila R.",
    role: "Designer, SP",
  },
  {
    quote: "Não é mais um app cristão genérico. Cada devocional parece escrito pra mim.",
    name: "Lucas M.",
    role: "Empreendedor, MG",
  },
  {
    quote: "A oração do dia de ontem me fez chorar. Que produto incrível.",
    name: "Ana P.",
    role: "Professora, RJ",
  },
]

/* ─── Shared styles ─────────────────────────────────────────── */
const S = {
  container: { maxWidth: 1080, margin: "0 auto" } as React.CSSProperties,
  px: { padding: "0 clamp(16px, 3vw, 24px)" } as React.CSSProperties,
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

export default function LandingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const { data: session } = useSession()

  function checkoutHref(plan: "monthly" | "yearly") {
    const dest = `/api/stripe/checkout?plan=${plan}`
    if (session?.user) return dest
    return `/cadastro?next=${encodeURIComponent(dest)}`
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border-2)",
          background: "rgba(11,14,12,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            ...S.container,
            ...S.px,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          <Logo size="sm" variant="light" />

          <div className="hidden sm:flex" style={{ alignItems: "center", gap: 28 }}>
            <a
              href="#como-funciona"
              style={{ fontSize: 13, color: "var(--text-2)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
            >
              Como funciona
            </a>
            <a
              href="#precos"
              style={{ fontSize: 13, color: "var(--text-2)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
            >
              Planos
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link
              href="/login"
              className="hidden sm:block"
              style={{ fontSize: 13, color: "var(--text-2)", padding: "8px 14px", whiteSpace: "nowrap" }}
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--bg)",
                background: "var(--gold)",
                padding: "9px 18px",
                borderRadius: 6,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(60px, 8vw, 80px) clamp(16px, 3vw, 24px) clamp(80px, 10vw, 120px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(200,165,90,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.20em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: 36,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            PALAVRA PARA O SEU MOMENTO
          </p>

          {/* Headline */}
          <h1
            style={{
              ...S.serif,
              fontSize: "clamp(52px, 9vw, 96px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "var(--text)",
              marginBottom: 32,
              letterSpacing: "-0.01em",
            }}
          >
            Deus ainda
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>fala com você.</em>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "var(--text-2)",
              lineHeight: 1.75,
              maxWidth: 460,
              margin: "0 auto 44px",
              fontWeight: 400,
            }}
          >
            Receba uma palavra de Deus personalizada para o seu dia, no momento que você precisa.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
              <Link
                href="/cadastro"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
                  background: "var(--gold)",
                  color: "var(--bg)",
                  borderRadius: 7,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                Receber minha palavra agora
                <ArrowRight size={14} />
              </Link>
              <a
                href="#como-funciona"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
                  border: "1px solid var(--border)",
                  color: "var(--text-2)",
                  borderRadius: 7,
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                Ver como funciona
              </a>
            </div>
            <p style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em" }}>
              Leva menos de 1 minuto · Gratuito para começar
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.35,
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, transparent, var(--text-2))",
            }}
          />
          <ChevronDown size={12} color="var(--text-2)" />
        </div>
      </section>

      {/* ── VERSE BREAK ───────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(48px, 6vw, 72px) clamp(16px, 3vw, 24px)",
          borderTop: "1px solid var(--border-2)",
          borderBottom: "1px solid var(--border-2)",
          textAlign: "center",
        }}
      >
        <div style={{ ...S.container, maxWidth: 620 }}>
          <p
            style={{
              ...S.serif,
              fontSize: "clamp(20px, 3.5vw, 28px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text)",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            "Não andeis ansiosos por coisa alguma; antes, em tudo, pela oração
            e pela súplica, com ações de graças, apresentai os vossos pedidos a Deus."
          </p>
          <p style={{ fontSize: 13, color: "var(--gold)", letterSpacing: "0.12em", fontWeight: 500 }}>
            FILIPENSES 4:6
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section id="como-funciona" style={{ padding: "120px 24px" }}>
        <div style={S.container}>
          <div style={{ marginBottom: 72 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 500,
              }}
            >
              Como funciona
            </p>
            <h2
              style={{
                ...S.serif,
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 300,
                color: "var(--text)",
                lineHeight: 1.1,
              }}
            >
              Simples de usar. Profundo no que entrega.
            </h2>
          </div>

          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 1,
              background: "var(--border-2)",
              border: "1px solid var(--border-2)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-2)",
                  padding: "clamp(28px, 4vw, 48px) clamp(20px, 3vw, 40px)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--text-3)",
                    marginBottom: 24,
                    fontWeight: 500,
                  }}
                >
                  {step.n}
                </p>
                <h3
                  style={{
                    ...S.serif,
                    fontSize: 22,
                    fontWeight: 400,
                    color: "var(--text)",
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVOTIONAL PREVIEW ────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-2)",
          borderTop: "1px solid var(--border-2)",
          borderBottom: "1px solid var(--border-2)",
          padding: "clamp(72px, 10vw, 120px) clamp(16px, 3vw, 24px)",
        }}
      >
        <div style={S.container}>
          <div className="responsive-2col">
            <div>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginBottom: 20,
                  fontWeight: 500,
                }}
              >
                Exemplo real
              </p>
              <h2
                style={{
                  ...S.serif,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 300,
                  color: "var(--text)",
                  lineHeight: 1.15,
                  marginBottom: 20,
                }}
              >
                Cada devocional é único — feito para o que você está vivendo agora.
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7 }}>
                Não é uma devoção genérica. É uma
                palavra direcionada para o momento que você está vivendo — 
                com profundidade, sensibilidade e cuidado.
              </p>
            </div>

            {/* Sample devotional card */}
            <div
              style={{
                background: "var(--bg-3)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "clamp(24px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Sentimento · Ansioso
                </p>
                <h3
                  style={{
                    ...S.serif,
                    fontSize: 22,
                    fontWeight: 400,
                    color: "var(--text)",
                    lineHeight: 1.2,
                  }}
                >
                  Paz que Excede o Entendimento
                </h3>
              </div>

              <div
                style={{
                  borderLeft: "2px solid var(--gold)",
                  paddingLeft: 20,
                }}
              >
                <p
                  style={{
                    ...S.serif,
                    fontSize: 15,
                    fontStyle: "italic",
                    color: "var(--text-2)",
                    lineHeight: 1.65,
                  }}
                >
                  "E a paz de Deus, que excede todo o entendimento, guardará
                  os vossos corações e os vossos pensamentos em Cristo Jesus."
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                    marginTop: 10,
                    fontWeight: 500,
                  }}
                >
                  FILIPENSES 4:7
                </p>
              </div>

              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>
                A ansiedade nos diz que precisamos resolver tudo agora. Mas a
                Palavra nos convida a uma troca: entregar o peso e receber a
                paz que não tem lógica humana...
              </p>

              <div
                style={{
                  borderTop: "1px solid var(--border-2)",
                  paddingTop: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--text-3)" }}>
                  Reflexão · Aplicação · Oração
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                  }}
                >
                  Semente
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section style={{ padding: "120px 24px" }}>
        <div style={S.container}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            O que dizem
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i}`}
                style={{
                  background: "var(--bg-2)",
                  border: "1px solid var(--border-2)",
                  borderRadius: 10,
                  padding: "clamp(24px, 3vw, 32px)",
                }}
              >
                <p
                  style={{
                    ...S.serif,
                    fontSize: 17,
                    fontStyle: "italic",
                    color: "var(--text)",
                    lineHeight: 1.6,
                    marginBottom: 24,
                  }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section
        id="precos"
        style={{
          background: "var(--bg-2)",
          borderTop: "1px solid var(--border-2)",
          borderBottom: "1px solid var(--border-2)",
          padding: "clamp(72px, 10vw, 120px) clamp(16px, 3vw, 24px)",
        }}
      >
        <div style={S.container}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 500,
              }}
            >
              Planos
            </p>
            <h2
              style={{
                ...S.serif,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 300,
                color: "var(--text)",
                lineHeight: 1.1,
              }}
            >
              Comece grátis. Cresça no seu ritmo.
            </h2>
          </div>

          {/* Billing toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48, background: "var(--bg-3)", borderRadius: 8, padding: 4, maxWidth: 260, marginLeft: "auto", marginRight: "auto" }}>
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  flex: 1, padding: "8px 16px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                  cursor: "pointer",
                  background: billing === b ? "var(--surface)" : "transparent",
                  color: billing === b ? "var(--text)" : "var(--text-3)",
                  border: "none",
                  letterSpacing: "0.04em",
                }}
              >
                {b === "monthly" ? "Mensal" : "Anual"}
                {b === "yearly" && <span style={{ marginLeft: 4, fontSize: 10, color: "var(--gold)", fontWeight: 600 }}>-45%</span>}
              </button>
            ))}
          </div>

          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: 24,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            {/* Free */}
            <div
              style={{
                background: "var(--bg-3)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "clamp(24px, 3vw, 40px)",
              }}
            >
              <p style={{ fontSize: 12, color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase" }}>
                Grátis
              </p>
              <p
                style={{
                  ...S.serif,
                  fontSize: 40,
                  fontWeight: 300,
                  color: "var(--text)",
                  marginBottom: 4,
                }}
              >
                R$0
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 32 }}>
                para sempre
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
                {freeFeatures.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={13} color="var(--text-3)" />
                    <span style={{ fontSize: 13, color: "var(--text-2)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/cadastro"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  border: "1px solid var(--border)",
                  borderRadius: 7,
                  fontSize: 13,
                  color: "var(--text-2)",
                  fontWeight: 500,
                }}
              >
                Começar grátis
              </Link>
            </div>

            {/* Premium */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--gold)",
                borderRadius: 12,
                padding: "clamp(24px, 3vw, 40px)",
                position: "relative",
                boxShadow: "0 0 40px rgba(200,165,90,0.10), 0 0 80px rgba(200,165,90,0.04)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  right: 24,
                  background: "var(--gold)",
                  color: "var(--bg)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  padding: "5px 12px",
                  borderRadius: "0 0 6px 6px",
                  textTransform: "uppercase",
                }}
              >
                Recomendado
              </div>
              <p style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase" }}>
                Premium
              </p>
              <p
                style={{
                  ...S.serif,
                  fontSize: 40,
                  fontWeight: 300,
                  color: "var(--text)",
                  marginBottom: 4,
                }}
              >
                {billing === "monthly" ? "R$29,90" : "R$197"}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 32 }}>
                {billing === "monthly" ? "por mês · cancele quando quiser" : "por ano · equivale a R$16/mês"}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 24, lineHeight: 1.65 }}>
                Uma palavra de Deus todos os dias, exatamente para o momento que você está vivendo.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {premiumFeatures.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={13} color="var(--gold)" />
                    <span style={{ fontSize: 13, color: "var(--text-2)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                {["Cancele quando quiser", "Sem compromisso", "Acesso imediato"].map(tag => (
                  <span key={tag} style={{ fontSize: 10, color: "var(--text-3)", padding: "3px 8px", borderRadius: 4, border: "1px solid var(--border)", letterSpacing: "0.06em" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={checkoutHref(billing)}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  background: "var(--gold)",
                  borderRadius: 7,
                  fontSize: 13,
                  color: "var(--bg)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                Começar minha rotina com Deus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section style={{ padding: "clamp(80px, 10vw, 140px) clamp(16px, 3vw, 24px)", textAlign: "center" }}>
        <div style={{ ...S.container, maxWidth: 560 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: 32,
              fontWeight: 500,
            }}
          >
            Comece agora
          </p>
          <h2
            style={{
              ...S.serif,
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: 40,
            }}
          >
            Que palavra você precisa ouvir hoje?
          </h2>
          <Link
            href="/cadastro"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 36px",
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Criar minha conta grátis
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border-2)",
          padding: "40px clamp(16px, 3vw, 24px)",
        }}
      >
        <div
          style={{
            ...S.container,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size="sm" variant="light" />
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            © 2025 Semente · semente.app
          </p>
        </div>
      </footer>
    </div>
  )
}
