"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FlowerIcon,
  Search01Icon,
  ShoppingCart01Icon,
  Menu01Icon,
  Cancel01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons"

import { ROUTES } from "@/constants/routes"
import { useMe, useLogout } from "@/hooks/useAuth"
import { useSaleStore } from "@/store/saleStore"
import { useCarrito } from "@/hooks/useCarrito"
import { cn } from "@/lib/utils"

// Sub-componentes
import { UserDropdown } from "./UserDropdown"
import { NavbarSearch } from "./parts/NavbarSearch"
import { NavbarMobileMenu } from "./parts/NavbarMobileMenu"
import { NavbarBottomNav } from "./parts/NavbarBottomNav"
import { CartDrawer } from "../cart/CartDrawer"

const NAV_LINKS = [
  { label: "Rosas", href: ROUTES.catalogo("rosas") },
  { label: "Tulipanes", href: ROUTES.catalogo("tulipanes") },
  { label: "Girasoles", href: ROUTES.catalogo("girasoles") },
  { label: "Bouquets", href: ROUTES.catalogo("bouquets") },
  { label: "Ocasiones", href: "/ocasiones" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { data: user } = useMe()
  const { data: cart = [] } = useCarrito()
  const logout = useLogout()
  const cartCount = useSaleStore((s) => s.cartCount)
  const setCartCount = useSaleStore((s) => s.setCartCount)
  const setIsCartOpen = useSaleStore((s) => s.setIsCartOpen)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (cart) {
      setCartCount(cart.length)
    }
  }, [cart, setCartCount])

  return (
    <>
      <header
        className={cn(
          "transition-luxury fixed inset-x-0 top-0 z-50",
          scrolled
            ? "shadow-soft bg-white/95 py-0 dark:bg-background/95"
            : "bg-white/55 py-2 backdrop-blur-md dark:bg-background/75"
        )}
      >
        <nav className="mx-auto flex h-[5.5rem] max-w-[90rem] items-center gap-3 px-4 md:gap-4 md:px-6">
          {/* logo */}
          <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2">
            <HugeiconsIcon
              icon={FlowerIcon}
              className="size-6 text-primary"
              strokeWidth={1.5}
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold text-foreground dark:text-white">
                El y ella
              </span>
              <span className="hidden text-[8px] font-semibold tracking-widest text-primary uppercase sm:block">
                Flores que cuentan historias
              </span>
            </div>
          </Link>

          {/* nav links — solo desktop */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-luxury rounded-full px-3 py-1.5 text-sm font-medium text-foreground/75 hover:bg-primary/10 hover:text-primary dark:text-white/75"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ofertas"
              className="transition-luxury flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-foreground/75 hover:bg-primary/10 hover:text-primary dark:text-white/75"
            >
              Ofertas
              <span className="rounded-full border border-destructive/20 bg-destructive/10 px-1.5 py-px text-[10px] leading-tight font-bold text-destructive">
                Nuevo
              </span>
            </Link>
          </div>

          <div className="flex-1" />

          {/* botón búsqueda — solo mobile/tablet */}
          <button
            onClick={() => {
              setSearchOpen(!searchOpen)
              setMobileOpen(false)
            }}
            aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            className="transition-luxury hover:bg-primary-dark flex items-center justify-center rounded-full bg-primary p-2 lg:hidden"
          >
            <HugeiconsIcon
              icon={searchOpen ? Cancel01Icon : Search01Icon}
              className="size-4 text-white"
              strokeWidth={1.5}
            />
          </button>

          {/* buscador — solo desktop */}
          <NavbarSearch className="hidden lg:block" />

          {/* usuario — solo desktop */}
          <div className="hidden items-center md:flex">
            {user ? (
              <UserDropdown user={user} logout={logout} />
            ) : (
              <Link
                href={ROUTES.login}
                className="transition-luxury flex items-center gap-1.5 text-sm font-medium text-foreground/75 hover:text-primary dark:text-white/75"
              >
                <HugeiconsIcon
                  icon={User02Icon}
                  className="size-4"
                  strokeWidth={1.5}
                />
                Iniciar sesión
              </Link>
            )}
          </div>

          {/* carrito */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="transition-luxury relative hidden items-center gap-1.5 rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary hover:border-primary/25 hover:bg-primary/25 lg:flex"
          >
            <HugeiconsIcon
              icon={ShoppingCart01Icon}
              className="size-4"
              strokeWidth={1.5}
            />
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* hamburguesa — solo mobile/tablet */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen)
              setSearchOpen(false)
            }}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="transition-luxury flex items-center justify-center rounded-full p-2 hover:bg-primary/10 lg:hidden"
          >
            <HugeiconsIcon
              icon={mobileOpen ? Cancel01Icon : Menu01Icon}
              className="size-5 text-foreground dark:text-white"
              strokeWidth={1.5}
            />
          </button>
        </nav>

        {/* buscador mobile */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:hidden"
            >
              <NavbarSearch isMobile onClose={() => setSearchOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* menú mobile deslizable */}
      <NavbarMobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        user={user}
        logout={logout}
      />

      {/* nav inferior mobile */}
      <NavbarBottomNav />

      {/* Carrito lateral */}
      <CartDrawer />
    </>
  )
}
