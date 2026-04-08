"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Logo } from "@/components/logo"
import { Menu } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <Logo size="md" variant="light" />
          <p style={{ fontSize: 12, color: "var(--text-3)", letterSpacing: "0.1em" }}>
            carregando...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--cream)" }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-56 lg:flex-shrink-0 lg:flex-col fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 w-60 z-50">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-56 min-h-screen flex flex-col">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center gap-3 px-4 sticky top-0 z-20"
          style={{
            height: 56,
            background: "var(--bg-2)",
            borderBottom: "1px solid var(--border-2)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ color: "var(--text-3)" }}
          >
            <Menu size={18} />
          </button>
          <Logo size="sm" variant="light" />
        </div>

        <div
          style={{
            flex: 1,
            padding: "clamp(16px, 4vw, 48px)",
            maxWidth: 720,
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
