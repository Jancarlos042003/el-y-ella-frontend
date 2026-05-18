# Arquitectura Frontend — El y Ella Detalles

## Tech Stack

Ver `package.json` para versiones exactas.

| Tecnología | Uso |
|---|---|
| Next.js 16.1.7 (App Router) | Framework |
| React 19 | UI |
| Tailwind CSS 4 | Estilos |
| Radix UI + shadcn (selectivo) | Componentes base |
| Hugeicons | Iconografía |
| Axios | Cliente HTTP — Client Components |
| TanStack Query v5 | Server state |
| Zustand v5 | UI state efímero |
| React Hook Form + Zod | Formularios |
| motion ^12 | Animaciones interactivas |
| jose | JWT en middleware (Edge Runtime) |
| Sonner | Toasts |

## Estructura de Carpetas

```
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── (admin)/
│   └── layout.tsx               → QueryClientProvider + Toaster
├── components/
│   ├── layout/                  → Header, Navbar, Footer
│   ├── home/                    → Banner, Features, Categories, ProductGrid, Gallery
│   ├── products/                → ProductCard, ProductDetail, ProductFilters, ReviewSection
│   ├── cart/                    → CartItem, CartSummary
│   ├── auth/                    → LoginForm, RegisterForm
│   ├── payment/                 → PaymentForm, PaymentResult
│   ├── admin/                   → AdminSidebar, AdminTable
│   └── ui/                      → componentes shadcn (generados por CLI)
├── hooks/                       # TanStack Query — consultas y mutaciones al servidor
│   ├── useAuth.ts
│   ├── useFlores.ts
│   ├── useCarrito.ts
│   ├── usePedidos.ts
│   └── useReviews.ts
├── store/
│   └── saleStore.ts             # Zustand — estado del carrito activo
├── lib/
│   ├── api.ts                   # Axios — Client Components y TanStack Query hooks
│   ├── api.server.ts            # fetch nativo — Server Components (RSC) con cookies()
│   ├── queryClient.ts           # Configuración global de TanStack Query
│   └── utils.ts
├── schemas/                     # Zod schemas — fuente de verdad de tipos y validación
│   ├── auth.schemas.ts
│   ├── pago.schemas.ts
│   ├── perfil.schemas.ts
│   ├── review.schemas.ts
│   └── admin.schemas.ts
├── types/                       # Solo z.infer<> — nunca tipos manuales
├── constants/                   # URLs, labels, rutas tipadas
│   ├── api.ts
│   ├── labels.ts
│   └── routes.ts
└── middleware.ts
```

## Rutas

```
app/
├── (public)/
│   ├── page.tsx                          → Home
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── catalogo/[categoria]/page.tsx     → Rosas / Girasoles / Tulipanes
│   └── flores/[id]/page.tsx
├── (auth)/                              → Requiere cookie jwt
│   ├── carrito/page.tsx
│   ├── pago/page.tsx
│   ├── pago/exito/page.tsx
│   ├── pago/pendiente/page.tsx
│   ├── pago/error/page.tsx
│   ├── pedidos/page.tsx
│   ├── pedidos/[id]/page.tsx
│   └── perfil/page.tsx
└── (admin)/                            → Requiere rol ADMIN en JWT
    └── admin/page.tsx
```

## Cliente HTTP

Dos utilidades según contexto de ejecución — no intercambiar:

| Archivo | Contexto | Por qué |
|---|---|---|
| `lib/api.ts` | Client Components + hooks | `withCredentials` envía la cookie automáticamente en el browser |
| `lib/api.server.ts` | Server Components (RSC) | `withCredentials` no aplica en servidor; se usa `cookies()` de `next/headers` |

### `lib/api.ts`
```ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(null, (error) => {
  if (error.response?.status === 401) window.location.href = '/login'
  return Promise.reject(error)
})

export default api
```

### `lib/api.server.ts`
```ts
import { cookies } from 'next/headers'

const BASE = process.env.NEXT_PUBLIC_API_URL!

export async function serverFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Cookie: `jwt=${jwt}` } : {}),
      ...options?.headers,
    },
  })

  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json() as Promise<T>
}
```

### `lib/queryClient.ts`
```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
})
```

## Estado Global (Zustand)

`store/saleStore.ts` — solo UI efímero. El estado del servidor va en TanStack Query.

```ts
interface SaleState {
  cartCount: number
  mobileMenuOpen: boolean
  setCartCount: (n: number) => void
  toggleMobileMenu: () => void
}
```

## TanStack Query

- Un hook por dominio en `hooks/`
- `queryKey` incluye siempre los parámetros de filtro: `['flowers', { q, categoryId, sort, page }]`
- `staleTime: 60_000` catálogo — `staleTime: 0` carrito
- `useMutation` con `onSuccess` invalida la query correspondiente y actualiza `saleStore.cartCount`
- `QueryClientProvider` en `app/layout.tsx` con la instancia de `lib/queryClient.ts`

## Formularios

```ts
// schemas/auth.schemas.ts
export const loginSchema = z.object({ ... })
export type LoginInput = z.infer<typeof loginSchema>  // tipos vienen de Zod, nunca manuales

// componente
const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })
```

| Schema | Formulario |
|---|---|
| `auth.schemas.ts` | login, register |
| `pago.schemas.ts` | checkout |
| `perfil.schemas.ts` | edición de perfil |
| `review.schemas.ts` | reseña de producto |
| `admin.schemas.ts` | flor, categoría |

## Endpoints API — Referencia Rápida

Base: `NEXT_PUBLIC_API_URL/api/v1`

```
POST   /auth/login              → {name, email, role} + cookie jwt
POST   /auth/register
POST   /auth/logout
GET    /auth/me         🔒
PUT    /users/me        🔒

GET    /flowers                 → ?q= &categoryId= &sort= &page= &size=
GET    /flowers/{id}

GET    /cart            🔒
POST   /cart            🔒
PUT    /cart/{id}       🔒
DELETE /cart/{id}       🔒

GET    /orders          🔒
GET    /orders/{id}     🔒

POST   /payments/checkout 🔒   → {orderId, paymentId, initPoint}
GET    /payments/status/{orderId} 🔒

GET    /reviews/flower/{flowerId}
POST   /reviews         🔒
PUT    /reviews/{id}    🔒
DELETE /reviews/{id}    🔒

GET/PUT/DELETE /admin/users/{id}    🔒 ADMIN
POST/PUT/DELETE /admin/flowers      🔒 ADMIN
CRUD  /admin/categories             🔒 ADMIN
GET/PUT /admin/orders               🔒 ADMIN
GET   /admin/reports/users          🔒 ADMIN → PDF
```
