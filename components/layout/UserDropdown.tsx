"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  User02Icon,
  ShoppingBag01Icon,
  Settings01Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons"

import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

interface UserDropdownProps {
  user: { name: string; email: string; role?: string }
  logout: { mutate: () => void; isPending: boolean }
}

export function UserDropdown({ user, logout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const menuItemClass = cn(
    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-luxury",
    "text-foreground/70 hover:bg-primary/10 hover:text-primary",
    "dark:text-white/70 dark:hover:bg-primary/15 dark:hover:text-primary"
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className={cn(
          "flex size-10 items-center justify-center overflow-hidden rounded-full border-2 transition-luxury bg-primary/10",
          isOpen ? "border-primary shadow-soft" : "border-primary/20 group-hover:border-primary/40"
        )}>
          {/* Avatar Fallback */}
          <span className="text-sm font-bold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/45 bg-white/80 p-1.5 shadow-floating backdrop-blur-xl dark:border-primary/15 dark:bg-card/80 z-50"
          >
            {/* Header / Label */}
            <div className="px-4 py-3.5 border-b border-primary/5 dark:border-white/5 mb-1.5">
              <p className="text-sm font-semibold text-foreground dark:text-white">
                Hola, {user.name} 👋
              </p>
              <p className="mt-0.5 text-xs text-foreground/50 dark:text-white/50 truncate">
                {user.email}
              </p>
            </div>

            {/* Links Group */}
            <div className="flex flex-col gap-0.5">
              <Link href={ROUTES.perfil} className={menuItemClass} onClick={() => setIsOpen(false)}>
                <HugeiconsIcon icon={User02Icon} className="size-4.5" strokeWidth={1.5} />
                <span>Mi Perfil</span>
              </Link>

              <Link href="/pedidos" className={menuItemClass} onClick={() => setIsOpen(false)}>
                <HugeiconsIcon icon={ShoppingBag01Icon} className="size-4.5" strokeWidth={1.5} />
                <span>Mis Pedidos</span>
              </Link>

              {user.role === "ROLE_ADMIN" && (
                <Link href={ROUTES.admin} className={menuItemClass} onClick={() => setIsOpen(false)}>
                  <HugeiconsIcon icon={Settings01Icon} className="size-4.5" strokeWidth={1.5} />
                  <span>Panel Admin</span>
                </Link>
              )}
            </div>

            {/* Separator */}
            <div className="my-1.5 h-px bg-primary/5 dark:bg-white/5" />

            {/* Logout Action */}
            <button
              className={cn(
                menuItemClass,
                "text-destructive hover:bg-destructive/10 hover:text-destructive dark:text-destructive/80 dark:hover:bg-destructive/15"
              )}
              onClick={() => {
                setIsOpen(false)
                logout.mutate()
              }}
              disabled={logout.isPending}
            >
              <HugeiconsIcon icon={Logout01Icon} className="size-4.5" strokeWidth={1.5} />
              <span>{logout.isPending ? "Saliendo..." : "Cerrar sesión"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
