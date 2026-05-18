'use client'

import { usePathname } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import { Menu01Icon } from '@hugeicons/core-free-icons'
import { useMe } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'

const breadcrumbLabels: Record<string, string> = {
  [ROUTES.admin]: 'Dashboard',
  [ROUTES.adminFlores]: 'Flores',
  [ROUTES.adminCategorias]: 'Categorías',
  [ROUTES.adminPedidos]: 'Pedidos',
  [ROUTES.adminUsuarios]: 'Usuarios',
  [ROUTES.adminReportes]: 'Reportes',
}

interface AdminTopbarProps {
  onMenuOpen: () => void
}

export function AdminTopbar({ onMenuOpen }: AdminTopbarProps) {
  const pathname = usePathname()
  const { data: me } = useMe()

  const label =
    Object.entries(breadcrumbLabels).find(([route]) =>
      route === ROUTES.admin ? pathname === route : pathname.startsWith(route)
    )?.[1] ?? 'Admin'

  return (
    <header className="flex items-center justify-between h-14 px-4 bg-card border-b border-border shrink-0">
      <div className="flex items-center gap-3">
        {/* Botón hamburger — solo visible en mobile */}
        <button
          onClick={onMenuOpen}
          className="md:hidden flex items-center justify-center size-9 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Abrir menú"
        >
          <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
        </button>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>

      {/* Info del usuario autenticado */}
      {me && (
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            {me.name.charAt(0).toUpperCase()}
          </div>
          <span className="hidden sm:block text-sm text-muted-foreground">
            {me.name}
          </span>
        </div>
      )}
    </header>
  )
}
