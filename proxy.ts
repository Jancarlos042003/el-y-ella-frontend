import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const AUTH_ROUTES = ['/carrito', '/pago', '/pedidos', '/perfil']
const ADMIN_ROUTES = ['/admin']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('jwt')?.value

  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r))
  const isAdmin = ADMIN_ROUTES.some((r) => pathname.startsWith(r))

  if ((isAuth || isAdmin) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAdmin && token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      if (payload.role !== 'ROLE_ADMIN') return NextResponse.redirect(new URL('/', request.url))
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/carrito/:path*', '/pago/:path*', '/pedidos/:path*', '/perfil/:path*', '/admin/:path*'],
}
