# Flujo de Autenticación

## JWT en Cookie HTTP-only

El backend (Spring Boot) setea la cookie `jwt` en el login/register. El frontend **nunca** lee, parsea ni almacena el token — ni en localStorage, sessionStorage ni estado de React.

## Flujo completo

```
1. POST /api/v1/auth/login → backend setea cookie HTTP-only 'jwt'
2. useMe() (GET /api/v1/auth/me) → TanStack Query cachea los datos del usuario
3. Todas las requests usan lib/api.ts con withCredentials: true → cookie viaja automáticamente
4. Interceptor Axios maneja 401 → window.location.href = '/login'
5. POST /api/v1/auth/logout → backend elimina la cookie → invalidar query ['me']
```

## Protección de rutas — Middleware con `jose`

El middleware corre en **Edge Runtime**. Usar `jose` (no `jsonwebtoken`, que es Node.js only).

```ts
import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const AUTH_ROUTES  = ['/carrito', '/pago', '/pedidos', '/perfil']
const ADMIN_ROUTES = ['/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('jwt')?.value

  const isAuth  = AUTH_ROUTES.some(r => pathname.startsWith(r))
  const isAdmin = ADMIN_ROUTES.some(r => pathname.startsWith(r))

  if ((isAuth || isAdmin) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAdmin && token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      if (payload.role !== 'ADMIN') return NextResponse.redirect(new URL('/', request.url))
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/carrito/:path*', '/pago/:path*', '/pedidos/:path*', '/perfil/:path*', '/admin/:path*'],
}
```

## Variable de entorno

```bash
# .env.local — nunca con prefijo NEXT_PUBLIC_
JWT_SECRET=<mismo secreto configurado en el backend Spring Boot>
```
