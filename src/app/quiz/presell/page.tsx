"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

export default function PresellPage() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(32px, 6vw, 64px) clamp(24px, 5vw, 48px)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>

      {/* Halo de fundo */}
      <div aria-hidden style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(800px, 110vw)",
        height: "min(800px, 110vw)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,165,90,0.10) 0%, transparent 70%)",
        animation: "glow-breathe 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Halo externo */}
      <div aria-hidden style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(1100px, 140vw)",
        height: "min(1100px, 140vw)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,165,90,0.04) 0%, transparent 65%)",
        animation: "halo-pulse 9s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ position: "absolute", top: 24, left: "clamp(16px, 4vw, 40px)" }}
      >
        <Logo size="sm" variant="light" />
      </motion.div>

      {/* Conteúdo central */}
      <div style={{ maxWidth: 520, position: "relative" }}>

        {/* Símbolo */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 28,
            marginBottom: 40,
            color: "var(--gold)",
            letterSpacing: "0.3em",
          }}
        >
          ✦
        </motion.p>

        {/* Headline principal */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...S.serif,
            fontSize: "clamp(36px, 7vw, 64px)",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.1,
            marginBottom: 28,
            letterSpacing: "-0.01em",
          }}
        >
          Deus tem uma palavra
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>para você.</em>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(15px, 2.2vw, 18px)",
            color: "var(--text-3)",
            lineHeight: 1.8,
            marginBottom: 56,
            fontWeight: 300,
          }}
        >
          Para o que você está carregando hoje.
          <br />
          Para a dor que você não contou pra ninguém.
          <br />
          Para o momento que <em style={{ color: "var(--text-2)", fontStyle: "italic" }}>só Deus conhece.</em>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <motion.button
            onClick={() => router.push("/quiz")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "18px 48px",
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.04em",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 40px rgba(200,165,90,0.35), 0 0 80px rgba(200,165,90,0.12)",
            }}
          >
            Sim, quero receber minha palavra
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em" }}
          >
            Leva menos de 2 minutos · Completamente gratuito
          </motion.p>
        </motion.div>

      </div>

      {/* Linha de rodapé sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        style={{
          position: "absolute",
          bottom: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.25,
        }}
      >
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, transparent, var(--text-2))" }} />
      </motion.div>

    </div>
  )
}
