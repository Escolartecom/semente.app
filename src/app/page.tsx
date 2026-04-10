"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"
import { ArrowRight, Check, ChevronDown } from "lucide-react"

const PARTICLES = [
  { x: 12, y: 25, size: 2.5, dur: 5.0, delay: 0.0 },
  { x: 28, y: 60, size: 1.8, dur: 6.5, delay: 1.2 },
  { x: 45, y: 35, size: 3.0, dur: 4.5, delay: 0.6 },
  { x: 62, y: 70, size: 2.0, dur: 7.0, delay: 2.1 },
  { x: 75, y: 20, size: 2.8, dur: 5.5, delay: 0.9 },
  { x: 88, y: 50, size: 1.5, dur: 6.0, delay: 1.8 },
  { x: 20, y: 80, size: 2.2, dur: 4.8, delay: 3.0 },
  { x: 55, y: 15, size: 1.6, dur: 5.8, delay: 2.4 },
  { x: 38, y: 88, size: 2.6, dur: 6.2, delay: 0.3 },
  { x: 82, y: 78, size: 2.0, dur: 4.2, delay: 1.5 },
  { x: 6,  y: 45, size: 1.8, dur: 7.2, delay: 2.8 },
  { x: 93, y: 30, size: 2.4, dur: 5.2, delay: 0.7 },
]

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
    quote: "O versículo já falou comigo logo de cara… mas a reflexão foi o que mais me pegou. Parecia que alguém tinha entendido exatamente o que eu estava sentindo. Depois da oração, senti uma paz absurda.",
    name: "Mariana S.",
    city: "São Paulo, SP",
    photo: "/testimonials/mariana.jpg",
  },
  {
    quote: "Eu estava muito ansiosa… a reflexão me fez parar e a aplicação foi algo simples que consegui fazer no dia. Já senti diferença.",
    name: "Ana P.",
    city: "Recife, PE",
    photo: "/testimonials/ana.jpg",
  },
  {
    quote: "Quando cheguei na oração, não sei explicar… foi como se eu tivesse desacelerado completamente. Me ajudou muito.",
    name: "Bruno L.",
    city: "Rio de Janeiro, RJ",
    photo: "/testimonials/bruno.jpg",
  },
  {
    quote: "É muito completo. Tem o versículo, a reflexão que aprofunda e a oração fecha tudo de um jeito muito especial. Me senti muito mais conectada.",
    name: "Juliana M.",
    city: "Curitiba, PR",
    photo: "/testimonials/juliana.jpg",
  },
  {
    quote: "O que mais gostei foi a parte da aplicação. Não ficou só na reflexão… me deu algo simples pra viver no dia. Isso fez muita diferença pra mim.",
    name: "Lucas R.",
    city: "Belo Horizonte, MG",
    photo: "/testimonials/lucas.jpg",
  },
  {
    quote: "Virou um hábito. Eu abro, leio tudo — principalmente a aplicação — e levo aquilo pro dia. É simples, mas muda como você pensa.",
    name: "Fernando A.",
    city: "Porto Alegre, RS",
    photo: "/testimonials/fernando.jpg",
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
        {/* Halo central */}
        <div aria-hidden style={{
          position: "absolute",
          top: "38%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,165,90,0.13) 0%, transparent 70%)",
          animation: "glow-breathe 6s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Outer halo */}
        <div aria-hidden style={{
          position: "absolute",
          top: "38%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(1000px, 120vw)",
          height: "min(1000px, 120vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,165,90,0.05) 0%, transparent 65%)",
          animation: "halo-pulse 9s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(200,165,90,0.9)",
            boxShadow: `0 0 ${p.size * 3}px rgba(200,165,90,0.6)`,
            animation: `particle-rise ${p.dur}s ease-in-out infinite ${p.delay}s`,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
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
            DESAFIO 60 DIAS COM DEUS
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              ...S.serif,
              fontSize: "clamp(48px, 8.5vw, 92px)",
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
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "var(--text-2)",
              lineHeight: 1.75,
              maxWidth: 480,
              margin: "0 auto 44px",
              fontWeight: 400,
            }}
          >
            60 dias recebendo uma palavra de Deus feita para o seu momento — personalizada, profunda, todo dia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
          >
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
              <Link
                href="/quiz"
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
                Quero aceitar o desafio
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
          </motion.div>
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
      <section style={{ padding: "clamp(72px, 10vw, 120px) clamp(16px, 3vw, 24px)" }}>
        <div style={S.container}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
              O que dizem
            </p>
            <h2 style={{ ...S.serif, fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 300, color: "var(--text)", lineHeight: 1.15 }}>
              Palavras que tocaram de verdade.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "var(--bg-2)",
                  border: "1px solid var(--border-2)",
                  borderRadius: 12,
                  padding: "clamp(24px, 3vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s} style={{ color: "var(--gold)", fontSize: 13 }}>★</span>
                  ))}
                </div>

                <p style={{ ...S.serif, fontSize: 16, fontStyle: "italic", color: "var(--text)", lineHeight: 1.7, flex: 1 }}>
                  "{t.quote}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={t.photo}
                    alt={t.name}
                    style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 1 }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-3)" }}>
                      {t.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FASES DA JORNADA ──────────────────────────────── */}
      <section style={{ padding: "clamp(72px, 10vw, 120px) clamp(16px, 3vw, 24px)" }}>
        <div style={S.container}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p style={{
              fontSize: 11, letterSpacing: "0.22em", color: "var(--gold)",
              textTransform: "uppercase", marginBottom: 16, fontWeight: 500,
            }}>
              Sua jornada
            </p>
            <h2 style={{
              ...S.serif, fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 300, color: "var(--text)", lineHeight: 1.15, marginBottom: 16,
            }}>
              60 dias por vez.<br />A vida inteira com Deus.
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
              O Desafio Semente não termina em 60 dias. Cada fase te leva mais fundo — uma jornada contínua de transformação.
            </p>
          </div>

          <div style={{ maxWidth: 580, margin: "0 auto", display: "flex", flexDirection: "column" }}>
            {[
              {
                icon: "🌱",
                period: "Dias 1 – 60",
                name: "Fase Semente",
                motto: "Plante a Palavra",
                description: "Toda grande árvore começou como uma semente. Nos seus primeiros 60 dias, você vai plantar a Palavra de Deus no lugar mais profundo da sua vida. Uma semente por dia. Todo dia. Sem falhar.",
              },
              {
                icon: "🌿",
                period: "Dias 61 – 120",
                name: "Fase Raízes",
                motto: "Aprofunde a fé",
                description: "Semente plantada precisa de raízes para sobreviver à tempestade. Nos próximos 60 dias, a Palavra vai descer mais fundo do que você imagina. Você vai descobrir uma fé que não balança.",
              },
              {
                icon: "🌳",
                period: "Dias 121 – 180",
                name: "Fase Fruto",
                motto: "Viva o que cresceu",
                description: "Raízes profundas produzem frutos que o mundo não consegue ignorar. O que Deus plantou em você começa a aparecer. Isso não é mais só sobre você — é sobre o que você carrega.",
              },
            ].map((phase, i, arr) => (
              <div key={phase.name} style={{ display: "flex", gap: 28 }}>
                {/* Linha do tempo */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    border: "1px solid rgba(200,165,90,0.5)",
                    background: "rgba(200,165,90,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0,
                  }}>
                    {phase.icon}
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: "var(--border-2)", margin: "8px 0", minHeight: 48 }} />
                  )}
                </div>

                {/* Conteúdo */}
                <div style={{ paddingBottom: i < arr.length - 1 ? 52 : 0, paddingTop: 4 }}>
                  <p style={{
                    fontSize: 10, color: "var(--gold)", letterSpacing: "0.18em",
                    textTransform: "uppercase", marginBottom: 6, fontWeight: 600,
                  }}>
                    {phase.period}
                  </p>
                  <h3 style={{
                    ...S.serif, fontSize: "clamp(20px, 3vw, 26px)",
                    fontWeight: 300, color: "var(--text)", marginBottom: 6,
                  }}>
                    {phase.name}
                  </h3>
                  <p style={{
                    fontSize: 13, color: "var(--gold)", fontStyle: "italic",
                    marginBottom: 12, letterSpacing: "0.04em",
                  }}>
                    "{phase.motto}"
                  </p>
                  <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.8 }}>
                    {phase.description}
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
                {b === "yearly" && <span style={{ marginLeft: 4, fontSize: 10, color: "var(--gold)", fontWeight: 600 }}>-40%</span>}
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
                {billing === "monthly" ? "R$27" : "R$197"}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 32 }}>
                {billing === "monthly" ? "por mês · menos de R$1 por dia" : "por ano · equivale a R$16/mês"}
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
            ✦ Desafio 60 Dias com Deus ✦
          </p>
          <h2
            style={{
              ...S.serif,
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Pronto para os seus 60 dias com Deus?
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-3)", lineHeight: 1.75, marginBottom: 40 }}>
            Descubra sua primeira palavra agora — leva menos de 2 minutos.
          </p>
          <Link
            href="/quiz"
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
            Quero aceitar o desafio de 60 dias
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
