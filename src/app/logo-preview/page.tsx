"use client"

import { LogoMarkA, LogoMarkB, LogoMarkC } from "@/components/logo"

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

const marks = [
  {
    id: "A",
    Mark: LogoMarkA,
    name: "First Shoot",
    desc: "Seed body · stem · cotyledons",
    detail: "The universal language of germination. Instantly readable as 'seed' at any size. Clean geometry, strong at small scale.",
  },
  {
    id: "B",
    Mark: LogoMarkB,
    name: "Life Within",
    desc: "Seed outline · inner teardrop",
    detail: "Outer form (the seed) contains inner meaning (the life / embryo pointing upward). Two layers of symbol in one minimal mark.",
  },
  {
    id: "C",
    Mark: LogoMarkC,
    name: "The Opening",
    desc: "Two arcs · first shoot",
    detail: "Captures the exact moment of germination — a seed splitting open from below, the first life rising from between its halves. Most abstract and unique.",
  },
]

export default function LogoPreviewPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        padding: "clamp(40px, 6vw, 80px) clamp(20px, 4vw, 60px)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 64, maxWidth: 600 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
          Logo Directions
        </p>
        <h1 style={{ ...S.serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1, marginBottom: 12 }}>
          3 directions for the Semente mark
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
          Each direction below shows the icon at large scale, as a full logo lockup, and at navigation size.
        </p>
      </div>

      {/* Three directions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 2,
          marginBottom: 80,
        }}
      >
        {marks.map(({ id, Mark, name, desc, detail }) => (
          <div
            key={id}
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border-2)",
              borderRadius: 0,
              padding: "clamp(32px, 4vw, 48px)",
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            {/* Large icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 120,
              }}
            >
              <Mark
                className="text-[var(--gold)]"
                style={{ width: 72, height: 72 } as React.CSSProperties}
              />
            </div>

            {/* Info */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-3)", textTransform: "uppercase" }}>
                  {id}
                </span>
                <p style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>{name}</p>
              </div>
              <p style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.10em", marginBottom: 12, textTransform: "uppercase", fontWeight: 500 }}>
                {desc}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>
                {detail}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--border-2)" }} />

            {/* Full logo lockup */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--text-3)", textTransform: "uppercase" }}>
                Full lockup
              </p>

              {/* Large */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Mark className="text-[var(--gold)]" style={{ width: 22, height: 22 } as React.CSSProperties} />
                <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 16, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text)" }}>
                  Semente
                </span>
              </div>

              {/* Medium */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Mark className="text-[var(--gold)]" style={{ width: 18, height: 18 } as React.CSSProperties} />
                <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text)" }}>
                  Semente
                </span>
              </div>

              {/* Nav size */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mark className="text-[var(--gold)]" style={{ width: 15, height: 15 } as React.CSSProperties} />
                <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-2)" }}>
                  Semente
                </span>
              </div>
            </div>

            {/* Light background preview */}
            <div
              style={{
                background: "var(--cream)",
                borderRadius: 8,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Mark style={{ width: 18, height: 18, color: "var(--gold)", flexShrink: 0 } as React.CSSProperties} />
              <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink)" }}>
                Semente
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Icon-only comparison */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 32, fontWeight: 500 }}>
          Icon only — at app icon scale
        </p>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-end" }}>
          {marks.map(({ id, Mark }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              {/* 48px (app icon) */}
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-2)", borderRadius: 10, border: "1px solid var(--border)" }}>
                <Mark className="text-[var(--gold)]" style={{ width: 28, height: 28 } as React.CSSProperties} />
              </div>
              {/* 32px */}
              <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-2)", borderRadius: 7, border: "1px solid var(--border)" }}>
                <Mark className="text-[var(--gold)]" style={{ width: 18, height: 18 } as React.CSSProperties} />
              </div>
              {/* 20px */}
              <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-2)", borderRadius: 4, border: "1px solid var(--border)" }}>
                <Mark className="text-[var(--gold)]" style={{ width: 12, height: 12 } as React.CSSProperties} />
              </div>
              <p style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.10em" }}>{id}</p>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--text-3)" }}>
        Active mark: <code style={{ fontSize: 11, color: "var(--gold)", background: "var(--bg-3)", padding: "2px 6px", borderRadius: 3 }}>Direction A — First Shoot</code>. Finalized and in production.
      </p>
    </div>
  )
}
