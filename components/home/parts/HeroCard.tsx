"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

// Sub-componentes
import { HeroBadge } from "./HeroBadge"
import { HeroTrustBadges } from "./HeroTrustBadges"

interface HeroCardProps {
  className?: string
  isDesktop?: boolean
}

export function HeroCard({ className, isDesktop = false }: HeroCardProps) {
  return (
    <motion.div
      initial={isDesktop ? { opacity: 0, x: -40 } : { opacity: 0, y: -20 }}
      animate={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: isDesktop ? 0.7 : 0.5, ease: "easeOut" }}
      className={cn(
        "flex flex-col glass p-6 shadow-floating",
        isDesktop ? "max-w-xl gap-7 p-10 rounded-[2.5rem]" : "gap-3.5 rounded-[2rem]",
        className
      )}
    >
      {/* badge */}
      <HeroBadge delay={isDesktop ? 0.2 : 0.1}>
        ⭐ Envío el mismo día
      </HeroBadge>

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className={cn(
          "font-serif font-bold leading-tight text-foreground dark:text-white",
          isDesktop ? "text-4xl md:text-5xl" : "text-3xl"
        )}>
          Flores elegantes para{" "}
          <span className="text-primary">momentos especiales</span>
        </h1>
        <div className={cn("mt-3 h-px bg-primary", isDesktop ? "w-16" : "w-14")} />
      </motion.div>

      {/* descripción */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={cn(
          "leading-relaxed text-foreground/65 dark:text-white/65",
          isDesktop ? "text-[15px]" : "text-sm"
        )}
      >
        Bouquets premium elaborados con flores frescas y entregas que enamoran.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        <Link
          href="/catalogo"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-luxury hover:bg-primary-dark"
        >
          Comprar ahora
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-4"
            strokeWidth={1.5}
          />
        </Link>
        {!isDesktop && (
          <Link
            href="/catalogo"
            className="flex items-center rounded-full border border-foreground/15 bg-white/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-luxury hover:bg-white/80 dark:border-white/15 dark:bg-white/10 dark:text-white"
          >
            Ver colecciones
          </Link>
        )}
      </motion.div>

      {/* trust badges */}
      <HeroTrustBadges isMobile={!isDesktop} />
    </motion.div>
  )
}
