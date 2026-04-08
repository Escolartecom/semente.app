import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  const protectedPaths = ["/dashboard", "/gerar", "/devocionais", "/perfil"]
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/cadastro")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
