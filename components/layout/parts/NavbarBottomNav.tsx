"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home01Icon,
  GridIcon,
  FavouriteIcon,
  ShoppingCart01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

const MOBILE_NAV = [
  { label: "Inicio", href: ROUTES.home, icon: Home01Icon },
  { label: "Categorías", href: "/catalogo", icon: GridIcon },
  { label: "Favoritos", href: "/favoritos", icon: FavouriteIcon },
  { label: "Carrito", href: ROUTES.carrito, icon: ShoppingCart01Icon },
  { label: "Cuenta", href: ROUTES.perfil, icon: User02Icon },
]

export function NavbarBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-border bg-background/80 py-2 backdrop-blur-lg lg:hidden">
      {MOBILE_NAV.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-luxury flex flex-col items-center gap-0.5 px-3 py-1",
              isActive
                ? "text-primary"
                : "text-foreground/60 hover:text-primary dark:text-white/60"
            )}
          >
            <HugeiconsIcon
              icon={item.icon}
              className="size-5"
              strokeWidth={1.5}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
