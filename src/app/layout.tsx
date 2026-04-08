import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { SessionProvider } from "@/components/session-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Semente — Devocional Diário com IA",
  description:
    "Receba devocionais personalizados com inteligência artificial. Direção espiritual diária feita para o seu momento.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <SessionProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                borderRadius: "8px",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "14px",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}
