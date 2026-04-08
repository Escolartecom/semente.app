"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "light" | "dark"
  showText?: boolean
}

/* ─── SVG mark variants (kept for logo-preview page) ────────── */
export function LogoMarkA({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <ellipse cx="12" cy="18.1" rx="2.0" ry="1.4" fill="currentColor" />
      <line x1="12" y1="16.7" x2="12" y2="10.5"
        stroke="currentColor" strokeWidth="0.72" strokeLinecap="round" />
      <path d="M12 10.5 C10.8 9.6 8.4 8.4 7.6 9.6"
        stroke="currentColor" strokeWidth="0.72" fill="none" strokeLinecap="round" />
      <path d="M12 10.5 C13.2 9.6 15.6 8.4 16.4 9.6"
        stroke="currentColor" strokeWidth="0.72" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function LogoMarkB({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <path
        d="M12 5.5 C15.8 7.2 16.2 16.8 12 18.5 C7.8 16.8 8.2 7.2 12 5.5Z"
        stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4"
      />
      <path d="M12 15 C10 13 10 10 12 8.5 C14 10 14 13 12 15Z" fill="currentColor" />
    </svg>
  )
}

export function LogoMarkC({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <path d="M12 18.5 C8.5 17 7.5 12 9 8"
        stroke="currentColor" strokeWidth="0.85" fill="none" strokeLinecap="round" />
      <path d="M12 18.5 C15.5 17 16.5 12 15 8"
        stroke="currentColor" strokeWidth="0.85" fill="none" strokeLinecap="round" />
      <line x1="12" y1="8" x2="12" y2="5.5"
        stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
      <circle cx="12" cy="4.8" r="1.3" fill="currentColor" />
    </svg>
  )
}

export function LogoMark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <LogoMarkA className={className} style={style} />
}

/* ─── Logo composition ───────────────────────────────────────── */
export function Logo({
  className,
  size = "md",
  variant = "default",
  showText = true,
}: LogoProps) {
  const sizes = {
    sm: { iconH: 20,  fontSize: 12,   gap: 8,  tracking: "0.14em" },
    md: { iconH: 24,  fontSize: 14.5, gap: 9,  tracking: "0.16em" },
    lg: { iconH: 28,  fontSize: 18,   gap: 10, tracking: "0.18em" },
  }

  const colors = {
    default: { text: "var(--text)" },
    light:   { text: "var(--text)" },
    dark:    { text: "var(--ink)"  },
  }

  const s = sizes[size]

  return (
    <div
      className={cn("flex items-center", className)}
      style={{
        gap: s.gap,
        transition: "transform 0.3s ease, filter 0.3s ease",
        willChange: "transform, filter",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "scale(1.05)"
        el.style.filter = "drop-shadow(0 0 10px rgba(200,165,90,0.40))"
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "scale(1)"
        el.style.filter = "none"
      }}
    >
      {/* Custom logo mark from public/logo-mark.svg */}
      <img
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        style={{
          height: s.iconH,
          width: "auto",
          display: "block",
          flexShrink: 0,
        }}
      />
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: s.fontSize,
            fontWeight: 400,
            letterSpacing: s.tracking,
            textTransform: "uppercase",
            color: colors[variant].text,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          Semente
        </span>
      )}
    </div>
  )
}
