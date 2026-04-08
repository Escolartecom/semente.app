"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Sparkles, BookMarked, User, LogOut, X } from "lucide-react"
import { Logo } from "@/components/logo"

const navItems = [
  { href: "/dashboard",    label: "Início",           icon: LayoutDashboard },
  { href: "/gerar",        label: "Novo Devocional",  icon: Sparkles },
  { href: "/devocionais",  label: "Meus Devocionais", icon: BookMarked },
  { href: "/perfil",       label: "Perfil",           icon: User },
]

interface SidebarProps { onClose?: () => void }

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "var(--bg-2)", borderRight: "1px solid var(--border-2)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-5"
        style={{ borderBottom: "1px solid var(--border-2)", height: 60 }}
      >
        <Link href="/dashboard">
          <Logo size="sm" variant="light" />
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden"
            style={{ color: "var(--text-3)" }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5" style={{ paddingTop: 16 }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="sidebar-link flex items-center gap-3 rounded-lg transition-colors"
              style={{
                padding: "9px 12px",
                background: isActive ? "var(--bg-3)" : "transparent",
                color: isActive ? "var(--text)" : "var(--text-2)",
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                borderLeft: isActive ? "2px solid var(--gold)" : "2px solid transparent",
              }}
            >
              <item.icon
                size={15}
                style={{ color: isActive ? "var(--gold)" : "var(--text-3)", flexShrink: 0 }}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3" style={{ borderTop: "1px solid var(--border-2)" }}>
        <button
          className="flex items-center gap-3 w-full rounded-lg transition-opacity hover:opacity-70"
          style={{
            padding: "9px 12px",
            color: "var(--text-3)",
            fontSize: 13,
          }}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          Sair
        </button>
      </div>
    </div>
  )
}
