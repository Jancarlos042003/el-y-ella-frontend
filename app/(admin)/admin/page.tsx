import { serverFetch } from '@/lib/api.server'
import type { PageFlowerResponse } from '@/types/flores.types'
import type { OrderResponse, UserResponse } from '@/types/admin.types'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FlowerIcon,
  ShoppingBag01Icon,
  UserGroup02Icon,
  AnalyticsUpIcon,
} from '@hugeicons/core-free-icons'

export const metadata = { title: 'Dashboard — El y Ella Admin' }

async function getKpis() {
  const [flowersRes, ordersRes, usersRes] = await Promise.allSettled([
    serverFetch<PageFlowerResponse>('/api/v1/flowers?size=1'),
    serverFetch<OrderResponse[]>('/api/v1/admin/orders'),
    serverFetch<UserResponse[]>('/api/v1/admin/users'),
  ])

  const totalFlores =
    flowersRes.status === 'fulfilled' ? flowersRes.value.totalElements : 0

  const orders = ordersRes.status === 'fulfilled' ? ordersRes.value : []
  const users = usersRes.status === 'fulfilled' ? usersRes.value : []

  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  const ingresosDelMes = orders
    .filter((o) => o.status === 'DELIVERED')
    .filter((o) => {
      const d = new Date(o.createdAt)
      return d.getMonth() === month && d.getFullYear() === year
    })
    .reduce((sum, o) => sum + o.total, 0)

  return {
    totalFlores,
    totalPedidos: orders.length,
    totalUsuarios: users.length,
    ingresosDelMes,
  }
}

const kpiConfig = [
  {
    key: 'totalFlores',
    label: 'Flores activas',
    sublabel: 'Productos en catálogo',
    icon: FlowerIcon,
    format: (v: number) => v.toString(),
  },
  {
    key: 'totalPedidos',
    label: 'Pedidos totales',
    sublabel: 'Registrados en el sistema',
    icon: ShoppingBag01Icon,
    format: (v: number) => v.toString(),
  },
  {
    key: 'totalUsuarios',
    label: 'Usuarios registrados',
    sublabel: 'Cuentas activas',
    icon: UserGroup02Icon,
    format: (v: number) => v.toString(),
  },
  {
    key: 'ingresosDelMes',
    label: 'Ingresos del mes',
    sublabel: 'Pedidos entregados',
    icon: AnalyticsUpIcon,
    format: (v: number) =>
      new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(v),
  },
] as const

export default async function AdminDashboardPage() {
  const kpis = await getKpis()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Resumen general del negocio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiConfig.map(({ key, label, sublabel, icon, format }) => (
          <div
            key={key}
            className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <div className="size-9 rounded-lg bg-pink-50 flex items-center justify-center">
                <HugeiconsIcon icon={icon} size={18} className="text-primary" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {format(kpis[key])}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
