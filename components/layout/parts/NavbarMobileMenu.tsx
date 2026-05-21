"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { User02Icon, Logout01Icon } from "@hugeicons/core-free-icons"

import { ROUTES } from "@/constants/routes"
import type { useLogout } from "@/hooks/useAuth"
import type { AuthResponse } from "@/types/auth.types"

interface NavbarMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: { label: string; href: string }[]
  user?: AuthResponse
  logout: Pick<ReturnType<typeof useLogout>, 'mutate' | 'isPending'>
}

export function NavbarMobileMenu({
  isOpen,
  onClose,
  navLinks,
  user,
  logout,
}: NavbarMobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-0 z-40 bg-background/95 px-6 pt-28 pb-24 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="transition-luxury rounded-2xl px-4 py-3 text-lg font-medium text-foreground hover:bg-primary/10 hover:text-primary dark:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ofertas"
              onClick={onClose}
              className="transition-luxury flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-medium text-foreground hover:text-primary dark:text-white"
            >
              Ofertas
              <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-white">
                Nuevo
              </span>
            </Link>

            <div className="my-3 h-px bg-border dark:bg-white/10" />

            {user ? (
              <div className="flex flex-col gap-1">
                <p className="px-4 py-2 text-base text-foreground/60 dark:text-white/60">
                  Hola, {user.name} 👋
                </p>
                <button
                  onClick={() => {
                    onClose()
                    logout.mutate()
                  }}
                  disabled={logout.isPending}
                  className="transition-luxury flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
                >
                  <HugeiconsIcon
                    icon={Logout01Icon}
                    className="size-5"
                    strokeWidth={1.5}
                  />
                  {logout.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
                </button>
              </div>
            ) : (
              <Link
                href={ROUTES.login}
                onClick={onClose}
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-medium text-foreground hover:text-primary dark:text-white"
              >
                <HugeiconsIcon
                  icon={User02Icon}
                  className="size-5"
                  strokeWidth={1.5}
                />
                Iniciar sesión
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
