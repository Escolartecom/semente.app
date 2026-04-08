"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Eye, EyeOff, Loader2, Check } from "lucide-react"
import { Logo } from "@/components/logo"

const perks = [
  "Receba uma palavra de Deus personalizada para você todos os dias",
  "Versículo, reflexão, aplicação e oração",
  "Salvar favoritos e histórico espiritual",
  "Comece gratuitamente agora",
]

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
  label: {
    display: "block",
    fontSize: 11,
    fontWeight: 500,
    color: "var(--text-3)",
    marginBottom: 7,
    letterSpacing: "0.10em",
    textTransform: "uppercase" as const,
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 6,
    border: "1px solid var(--border)",
    background: "var(--bg-2)",
    color: "var(--text)",
    fontSize: 14,
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    outline: "none",
  } as React.CSSProperties,
}

export default function CadastroPage() {
  const { status } = useSession()
  const router = useRouter()
  const [name, setName]         = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard")
  }, [status, router])

  if (status === "loading" || status === "authenticated") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <Logo size="md" variant="light" />
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }
    setLoading(true)

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Erro ao criar conta. Tente novamente.")
      setLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.error) {
        router.push("/login")
        return
      }
      router.replace("/dashboard")
    } catch {
      router.push("/login")
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>

      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between"
        style={{ padding: "52px 56px", borderRight: "1px solid var(--border-2)" }}
      >
        <Logo size="sm" variant="light" />

        <div>
          <div style={{ width: 28, height: 1, background: "var(--gold)", marginBottom: 28, opacity: 0.6 }} />
          <h2
            style={{
              ...S.serif,
              fontSize: "clamp(22px, 2.6vw, 32px)",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.25,
              marginBottom: 36,
            }}
          >
            Deus ainda fala com você — todos os dias
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {perks.map(perk => (
              <div key={perk} style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "1px solid var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                    opacity: 0.9,
                  }}
                >
                  <Check size={9} color="var(--gold)" />
                </div>
                <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em" }}>
          © 2025 Semente
        </p>
      </div>

      {/* Right panel */}
      <div
        className="flex-1"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden" style={{ marginBottom: 52 }}>
          <Logo size="md" variant="light" />
        </div>

        <div style={{ width: "100%", maxWidth: 340 }}>

          {/* Heading */}
          <p style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>
            Cadastro
          </p>
          <h1 style={{ ...S.serif, fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1, marginBottom: 10 }}>
            Criar conta grátis
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 40, lineHeight: 1.5 }}>
            Sem cartão de crédito · Comece em segundos.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={S.label}>Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
                style={S.input}
              />
            </div>

            <div>
              <label style={S.label}>Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={S.input}
              />
            </div>

            <div>
              <label style={S.label}>Senha</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={{ ...S.input, paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  style={{
                    position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
                    color: "var(--text-3)", background: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", padding: 4,
                  }}
                >
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Inline error */}
            {error && (
              <div
                style={{
                  padding: "10px 13px",
                  borderRadius: 6,
                  background: "rgba(200,80,60,0.08)",
                  border: "1px solid rgba(200,80,60,0.20)",
                  fontSize: 13,
                  color: "#E07060",
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                padding: "13px",
                borderRadius: 6,
                background: "var(--gold)",
                color: "var(--bg)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.06em",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 6,
                textTransform: "uppercase",
              }}
            >
              {loading
                ? <><Loader2 size={13} className="animate-spin" /> Criando conta...</>
                : "Criar minha conta"}
            </button>
          </form>

          {/* Terms */}
          <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)", marginTop: 18, lineHeight: 1.7 }}>
            Ao criar uma conta você concorda com os{" "}
            <Link href="#" style={{ color: "var(--text-2)" }}>Termos de Uso</Link>
            {" "}e a{" "}
            <Link href="#" style={{ color: "var(--text-2)" }}>Política de Privacidade</Link>.
          </p>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-2)" }} />
            <span style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em" }}>ou</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-2)" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-3)" }}>
            Já tem conta?{" "}
            <Link href="/login" style={{ color: "var(--gold)", fontWeight: 500 }}>
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
