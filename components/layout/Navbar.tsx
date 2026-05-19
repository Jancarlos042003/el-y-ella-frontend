"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FlowerIcon,
  Search01Icon,
  User02Icon,
  ShoppingCart01Icon,
  Menu01Icon,
  Cancel01Icon,
  FavouriteIcon,
  Home01Icon,
  GridIcon,
  Logout01Icon,
  ShoppingBag01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"

import { ROUTES } from "@/constants/routes"
import { useMe, useLogout } from "@/hooks/useAuth"
import { useSaleStore } from "@/store/saleStore"
import { UserDropdown } from "./UserDropdown"

const NAV_LINKS = [
  { label: "Rosas", href: ROUTES.catalogo("rosas") },
  { label: "Tulipanes", href: ROUTES.catalogo("tulipanes") },
  { label: "Girasoles", href: ROUTES.catalogo("girasoles") },
  { label: "Bouquets", href: ROUTES.catalogo("bouquets") },
  { label: "Ocasiones", href: "/ocasiones" },
]

const MOBILE_NAV = [
  { label: "Inicio", href: ROUTES.home, icon: Home01Icon },
  { label: "Categorías", href: "/catalogo", icon: GridIcon },
  { label: "Favoritos", href: "/favoritos", icon: FavouriteIcon },
  { label: "Carrito", href: ROUTES.carrito, icon: ShoppingCart01Icon },
  { label: "Cuenta", href: ROUTES.perfil, icon: User02Icon },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const { data: user } = useMe()
  const logout = useLogout()
  const cartCount = useSaleStore((s) => s.cartCount)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`)
    setMobileOpen(false)
    setSearchOpen(false)
  }

  function toggleSearch() {
    setSearchOpen((v) => !v)
    setMobileOpen(false)
  }

  return (
    <>
      {/* ── barra superior ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/55 backdrop-blur-md dark:bg-[#1a0a0f]/75">
        <nav className="mx-auto flex h-[5.5rem] max-w-[90rem] items-center gap-3 px-4 md:gap-4 md:px-6">
          {/* logo */}
          <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2">
            <HugeiconsIcon
              icon={FlowerIcon}
              className="size-6 text-[#ff69b4]"
              strokeWidth={1.5}
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold text-[#151515] dark:text-white">
                El y ella
              </span>
              <span className="hidden text-[8px] font-semibold tracking-widest text-[#ff69b4] sm:block">
                FLORES QUE CUENTAN HISTORIAS
              </span>
            </div>
          </Link>

          {/* nav links — solo desktop */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-[#151515]/75 transition-colors hover:bg-[#ff69b4]/10 hover:text-[#ff69b4] dark:text-white/75"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ofertas"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[#151515]/75 transition-colors hover:bg-[#ff69b4]/10 hover:text-[#ff69b4] dark:text-white/75"
            >
              Ofertas
              <span className="rounded-full bg-red-500 px-1.5 py-px text-[10px] leading-tight font-bold text-white">
                Nuevo
              </span>
            </Link>
          </div>

          <div className="flex-1" />

          {/* botón búsqueda — solo mobile/tablet */}
          <button
            onClick={toggleSearch}
            aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            className="flex items-center justify-center rounded-full bg-[#ff69b4] p-2 transition-colors hover:bg-[#ff69b4]/90 lg:hidden"
          >
            <HugeiconsIcon
              icon={searchOpen ? Cancel01Icon : Search01Icon}
              className="size-4 text-white"
              strokeWidth={1.5}
            />
          </button>

          {/* buscador — solo desktop */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-sm dark:border-white/10 dark:bg-white/5">
              <HugeiconsIcon
                icon={Search01Icon}
                className="size-4 shrink-0 text-[#ff69b4]"
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="Buscar flores, bouquets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 bg-transparent outline-none placeholder:text-[#151515]/40 dark:text-white dark:placeholder:text-white/40"
              />
            </div>
          </form>

          {/* usuario — solo desktop */}
          <div className="hidden items-center md:flex">
            {user ? (
              <UserDropdown user={user} logout={logout} />
            ) : (
              <Link
                href={ROUTES.login}
                className="flex items-center gap-1.5 text-sm font-medium text-[#151515]/75 transition-colors hover:text-[#ff69b4] dark:text-white/75"
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
          <Link
            href={ROUTES.carrito}
            className="relative hidden items-center gap-1.5 rounded-full border border-[#ff69b4]/15 bg-[#ff69b4]/10 px-3 py-1.5 text-sm font-semibold text-[#ff69b4] transition-all duration-200 hover:border-[#ff69b4]/25 hover:bg-[#ff69b4]/25 hover:text-white lg:flex"
          >
            <HugeiconsIcon
              icon={ShoppingCart01Icon}
              className="size-4"
              strokeWidth={1.5}
            />
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#ff69b4]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* hamburguesa — solo mobile/tablet */}
          <button
            onClick={() => {
              setMobileOpen((v) => !v)
              setSearchOpen(false)
            }}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#ff69b4]/10 lg:hidden"
          >
            <HugeiconsIcon
              icon={mobileOpen ? Cancel01Icon : Menu01Icon}
              className="size-5 text-[#151515] dark:text-white"
              strokeWidth={1.5}
            />
          </button>
        </nav>

        {/* buscador mobile — aparece al presionar el botón de lupa */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              key="mobile-search"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="overflow-hidden md:hidden"
            >
              <motion.form
                onSubmit={handleSearch}
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
                className="px-4 pb-3"
              >
                <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="size-4 shrink-0 text-[#ff69b4]"
                    strokeWidth={1.5}
                  />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Buscar flores, bouquets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none placeholder:text-[#151515]/40 dark:text-white dark:placeholder:text-white/40"
                  />
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── menú mobile deslizable ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-0 z-40 bg-[#f9f5f0]/95 px-6 pt-28 pb-24 backdrop-blur-md lg:hidden dark:bg-[#1a0a0f]/95"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-[#151515] transition-colors hover:bg-[#ff69b4]/10 hover:text-[#ff69b4] dark:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/ofertas"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-medium text-[#151515] transition-colors hover:text-[#ff69b4] dark:text-white"
              >
                Ofertas
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  Nuevo
                </span>
              </Link>

              <hr className="my-3 border-black/10 dark:border-white/10" />

              {user ? (
                <div className="flex flex-col gap-1">
                  <p className="px-4 py-2 text-base text-[#151515]/60 dark:text-white/60">
                    Hola, {user.name} 👋
                  </p>
                  <button
                    onClick={() => logout.mutate()}
                    disabled={logout.isPending}
                    className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/20"
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
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-medium text-[#151515] hover:text-[#ff69b4] dark:text-white"
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

      {/* ── nav inferior mobile (estilo iOS) ── */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-black/10 bg-white/80 py-2 backdrop-blur-md lg:hidden dark:border-white/10 dark:bg-[#1a0a0f]/80">
        {MOBILE_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#151515]/60 transition-colors hover:text-[#ff69b4] dark:text-white/60"
          >
            <HugeiconsIcon
              icon={item.icon}
              className="size-5"
              strokeWidth={1.5}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
