"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { BookMarked, Trash2, Sparkles, ArrowLeft, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface Devotional {
  id: string
  title: string
  verse: string
  verseReference: string
  reflection: string
  practicalApp: string
  prayer: string
  feeling?: string
  userInput?: string
  isSaved: boolean
  createdAt: string
}

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

function DevotionalsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get("id")
  const isNew = searchParams.get("new") === "1"

  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [selected, setSelected] = useState<Devotional | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "saved">("all")

  useEffect(() => { fetchDevotionals() }, [])

  useEffect(() => {
    if (selectedId && devotionals.length > 0) {
      const found = devotionals.find((d) => d.id === selectedId)
      if (found) setSelected(found)
    }
  }, [selectedId, devotionals])

  async function fetchDevotionals() {
    setLoading(true)
    const res = await fetch(`/api/devotional/list${filter === "saved" ? "?saved=true" : ""}`)
    const data = await res.json()
    setDevotionals(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { fetchDevotionals() }, [filter])

  async function toggleSave(d: Devotional) {
    const res = await fetch("/api/devotional/save", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: d.id, isSaved: !d.isSaved }),
    })
    if (res.ok) {
      const updated = await res.json()
      setDevotionals((prev) => prev.map((item) => (item.id === d.id ? updated : item)))
      if (selected?.id === d.id) setSelected(updated)
      toast.success(updated.isSaved ? "Salvo" : "Removido dos salvos")
    }
  }

  async function deleteDevotional(id: string) {
    if (!confirm("Excluir este devocional?")) return
    const res = await fetch(`/api/devotional/list?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      setDevotionals((prev) => prev.filter((d) => d.id !== id))
      if (selected?.id === id) setSelected(null)
      toast.success("Excluído")
    }
  }

  /* ── Detail view ─────────────────────────────────────── */
  if (selected) {
    return (
      <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => { setSelected(null); router.push("/devocionais") }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, color: "var(--ink-2)", padding: "6px 0",
            }}
          >
            <ArrowLeft size={14} /> Todos
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button
              onClick={() => toggleSave(selected)}
              style={{
                width: 32, height: 32, display: "flex", alignItems: "center",
                justifyContent: "center", borderRadius: 6,
                color: selected.isSaved ? "var(--gold)" : "var(--ink-3)",
              }}
            >
              <BookMarked size={15} />
            </button>
            <button
              onClick={() => deleteDevotional(selected.id)}
              style={{
                width: 32, height: 32, display: "flex", alignItems: "center",
                justifyContent: "center", borderRadius: 6, color: "var(--ink-3)",
              }}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} />
            {formatDate(selected.createdAt)}
          </span>
          {selected.feeling && (
            <span
              style={{
                fontSize: 10, fontWeight: 500, letterSpacing: "0.12em",
                color: "var(--ink-3)", textTransform: "uppercase",
                padding: "3px 8px", borderRadius: 4,
                background: "var(--cream-2)", border: "1px solid var(--cream-border)",
              }}
            >
              {selected.feeling}
            </span>
          )}
        </div>

        {/* New confirmation */}
        {isNew && (
          <div
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 18px", borderRadius: 8,
              background: "rgba(200,165,90,0.08)", border: "1px solid rgba(200,165,90,0.2)",
            }}
          >
            <CheckCircle size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "var(--ink-2)" }}>
              Devocional gerado. Salve para acessar no histórico.
            </p>
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            ...S.serif,
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 300,
            color: "var(--ink)",
            lineHeight: 1.1,
          }}
        >
          {selected.title}
        </h1>

        {/* Verse — dark panel */}
        <div
          style={{
            background: "var(--bg)",
            borderRadius: 10,
            padding: "32px",
            borderLeft: "2px solid var(--gold)",
          }}
        >
          <p
            style={{
              ...S.serif,
              fontSize: "clamp(17px, 2.5vw, 21px)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.65,
              marginBottom: 16,
            }}
          >
            "{selected.verse}"
          </p>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.14em" }}>
            {selected.verseReference.toUpperCase()}
          </p>
        </div>

        {/* Reflection */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 14 }}>
            Reflexão
          </p>
          <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {selected.reflection}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--cream-border)" }} />

        {/* Practical */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 14 }}>
            Aplicação para hoje
          </p>
          <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.8 }}>
            {selected.practicalApp}
          </p>
        </div>

        {/* Prayer — dark panel */}
        <div
          style={{
            background: "var(--bg-3)",
            border: "1px solid var(--border-2)",
            borderRadius: 10,
            padding: "32px",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 16 }}>
            Oração
          </p>
          <p
            style={{
              ...S.serif,
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.75,
            }}
          >
            {selected.prayer}
          </p>
        </div>

        {/* Save button */}
        <button
          onClick={() => toggleSave(selected)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "13px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.04em",
            border: selected.isSaved ? "1px solid var(--cream-border)" : "none",
            background: selected.isSaved ? "var(--cream-2)" : "var(--gold)",
            color: selected.isSaved ? "var(--ink-2)" : "var(--bg)",
            cursor: "pointer",
          }}
        >
          <BookMarked size={14} />
          {selected.isSaved ? "Salvo no histórico" : "Salvar devocional"}
        </button>
      </div>
    )
  }

  /* ── List view ───────────────────────────────────────── */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1
            style={{
              ...S.serif,
              fontSize: 32,
              fontWeight: 300,
              color: "var(--ink)",
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            Meus Devocionais
          </h1>
          <p style={{ fontSize: 12, color: "var(--ink-3)" }}>
            {devotionals.length} {devotionals.length === 1 ? "devocional" : "devocionais"}
          </p>
        </div>
        <Link
          href="/gerar"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            background: "var(--gold)",
            color: "var(--bg)",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          <Sparkles size={13} />
          Novo
        </Link>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--cream-border)" }}>
        {(["all", "saved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 500,
              color: filter === f ? "var(--ink)" : "var(--ink-3)",
              borderBottom: filter === f ? "2px solid var(--ink)" : "2px solid transparent",
              marginBottom: -1,
              background: "none",
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            {f === "all" ? "Todos" : "Salvos"}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer-light" style={{ height: 68, borderRadius: 8 }} />
          ))}
        </div>
      ) : devotionals.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 24 }}>
            {filter === "saved"
              ? "Nenhum devocional salvo ainda."
              : "Nenhum devocional gerado ainda."}
          </p>
          <Link
            href="/gerar"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "var(--ink)",
              color: "var(--cream)",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Gerar agora
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {devotionals.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelected(d)}
              className="card-hover"
              style={{
                background: "var(--cream-2)",
                border: "1px solid var(--cream-border)",
                borderRadius: 8,
                padding: "18px 20px",
                cursor: "pointer",
                marginBottom: 4,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {d.title}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", marginBottom: 6 }}>
                    {d.verseReference}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--ink-3)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                    {d.verse.substring(0, 80)}…
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  {d.isSaved && <BookMarked size={13} style={{ color: "var(--gold)" }} />}
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{formatDate(d.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DevotionaisPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer-light" style={{ height: 68, borderRadius: 8 }} />
          ))}
        </div>
      }
    >
      <DevotionalsContent />
    </Suspense>
  )
}
