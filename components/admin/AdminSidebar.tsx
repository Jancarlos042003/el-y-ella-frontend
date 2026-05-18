'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  DashboardSquare01Icon,
  FlowerIcon,
  Tag01Icon,
  ShoppingBag01Icon,
  UserGroup02Icon,
  AnalyticsUpIcon,
  Logout01Icon,
} from '@hugeicons/core-free-icons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'
import { useLogout } from '@/hooks/useAuth'

const navItems = [
  { label: 'Dashboard', href: ROUTES.admin, icon: DashboardSquare01Icon, exact: true },
  { label: 'Flores', href: ROUTES.adminFlores, icon: FlowerIcon },
  { label: 'Categorías', href: ROUTES.adminCategorias, icon: Tag01Icon },
  { label: 'Pedidos', href: ROUTES.adminPedidos, icon: ShoppingBag01Icon },
  { label: 'Usuarios', href: ROUTES.adminUsuarios, icon: UserGroup02Icon },
  { label: 'Reportes', href: ROUTES.adminReportes, icon: AnalyticsUpIcon },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

function NavList({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useLogout()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const handleLogout = async () => {
    await logout.mutateAsync()
    router.push(ROUTES.login)
  }

  return (
    <nav className="flex flex-col h-full">
      {/* Logotipo */}
      <div className="flex items-center gap-2 px-5 h-14 border-b border-border shrink-0">
        <span className="font-semibold text-[1.5rem] tracking-tight text-foreground">
          El y Ella
        </span>
        <span className="text-xs font-medium text-primary bg-pink-50 px-2 py-0.5 rounded-full">
          Admin
        </span>
      </div>

      {/* Ítems de navegación */}
      <ul className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ label, href, icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-pink-50 text-primary'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                )}
              >
                <HugeiconsIcon
                  icon={icon}
                  size={18}
                  strokeWidth={active ? 2 : 1.5}
                  className={active ? 'text-primary' : 'text-neutral-400'}
                />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Cerrar sesión */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          disabled={logout.isPending}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          <HugeiconsIcon icon={Logout01Icon} size={18} strokeWidth={1.5} />
          {logout.isPending ? 'Cerrando...' : 'Cerrar sesión'}
        </button>
      </div>
    </nav>
  )
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Sidebar fijo — visible solo en desktop */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border bg-card h-screen sticky top-0">
        <NavList />
      </aside>

      {/* Sheet — visible solo en mobile */}
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent side="left" className="w-60 p-0" showCloseButton={false}>
          <SheetHeader className="sr-only p-0">
            <SheetTitle>Menú de administración</SheetTitle>
          </SheetHeader>
          <NavList onClose={onClose} />
        </SheetContent>
      </Sheet>
    </>
  )
}
