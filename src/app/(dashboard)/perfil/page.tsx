"use client"

import { useSession, signOut } from "next-auth/react"
import { LogOut, Crown } from "lucide-react"
import Link from "next/link"

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

export default function PerfilPage() {
  const { data: session } = useSession()
  const isPremium = session?.user?.plan === "premium"

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      {/* Header */}
      <h1 style={{ ...S.serif, fontSize: 32, fontWeight: 300, color: "var(--ink)", lineHeight: 1 }}>
        Perfil
      </h1>

      {/* Identity card */}
      <div
        style={{
          background: "var(--cream-2)",
          border: "1px solid var(--cream-border)",
          borderRadius: 10,
          padding: "28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              ...S.serif,
              fontSize: 22,
              fontWeight: 300,
              color: "var(--gold)",
            }}
          >
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>
            {session?.user?.name || "Usuário"}
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {session?.user?.email}
          </p>
        </div>
        <span
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            borderRadius: 5,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: isPremium ? "var(--gold-bg)" : "var(--cream-border)",
            color: isPremium ? "var(--gold)" : "var(--ink-3)",
            border: isPremium ? "1px solid rgba(200,165,90,0.3)" : "none",
          }}
        >
          {isPremium && <Crown size={10} />}
          {isPremium ? "Premium" : "Grátis"}
        </span>
      </div>

      {/* Account info */}
      <div
        style={{
          background: "var(--cream-2)",
          border: "1px solid var(--cream-border)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--cream-border)" }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            Conta
          </p>
        </div>
        {[
          { label: "Nome",  value: session?.user?.name || "—" },
          { label: "Email", value: session?.user?.email || "—" },
          { label: "Plano", value: isPremium ? "Premium" : "Grátis" },
        ].map(({ label, value }, i, arr) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 24px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--cream-border)" : "none",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{label}</span>
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, maxWidth: "60%", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Premium upgrade */}
      {!isPremium && (
        <div
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "32px",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 12 }}>
            Premium
          </p>
          <h3
            style={{
              ...S.serif,
              fontSize: 22,
              fontWeight: 300,
              color: "var(--text)",
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            Desbloqueie o Semente completo
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 24, lineHeight: 1.6 }}>
            Devocionais ilimitados, histórico completo e acesso total por R$29,90/mês. Cancele quando quiser.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/api/stripe/checkout?plan=monthly" style={{ display: "inline-block", padding: "11px 22px", background: "var(--gold)", color: "var(--bg)", borderRadius: 7, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
              Assinar — R$29,90/mês
            </Link>
            <Link href="/api/stripe/checkout?plan=yearly" style={{ display: "inline-block", padding: "11px 22px", border: "1px solid var(--border)", color: "var(--text-2)", borderRadius: 7, fontSize: 13 }}>
              Anual — R$197
            </Link>
          </div>
        </div>
      )}

      {/* Gerenciar assinatura (só premium) */}
      {isPremium && (
        <div
          style={{
            background: "var(--bg)",
            border: "1px solid rgba(200,165,90,0.25)",
            borderRadius: 10,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 6 }}>
              Assinatura
            </p>
            <p style={{ fontSize: 13, color: "var(--text-2)" }}>
              Gerencie, cancele ou troque seu plano.
            </p>
          </div>
          <Link
            href="/api/stripe/portal"
            style={{ display: "inline-block", padding: "10px 20px", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 7, fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}
          >
            Gerenciar assinatura
          </Link>
        </div>
      )}

      {/* Session */}
      <div
        style={{
          background: "var(--cream-2)",
          border: "1px solid var(--cream-border)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--cream-border)" }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            Sessão
          </p>
        </div>
        <div style={{ padding: "8px" }}>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              borderRadius: 7,
              fontSize: 13,
              color: "#dc2626",
              background: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <LogOut size={14} />
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  )
}
