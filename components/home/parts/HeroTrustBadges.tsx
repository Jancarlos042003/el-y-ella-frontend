"use client"

import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DeliveryTruck01Icon,
  Shield01Icon,
  FlowerIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const TRUST_BADGES = [
  { icon: DeliveryTruck01Icon, label: "Envíos", sub: "a todo el país" },
  { icon: Shield01Icon, label: "Pago", sub: "seguro" },
  { icon: FlowerIcon, label: "Flores", sub: "frescas" },
]

interface HeroTrustBadgesProps {
  className?: string
  delay?: number
  isMobile?: boolean
}

export function HeroTrustBadges({ className, delay = 0.6, isMobile = false }: HeroTrustBadgesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "flex items-center border-t border-foreground/8 pt-4 dark:border-white/8",
        className
      )}
    >
      {TRUST_BADGES.map(({ icon, label, sub }, i) => (
        <div
          key={label}
          className="flex flex-1 items-center gap-2 text-xs text-foreground/60 dark:text-white/60"
        >
          {i > 0 && (
            <div className="mr-2 h-8 w-px shrink-0 bg-foreground/10 dark:bg-white/10" />
          )}
          <HugeiconsIcon
            icon={icon}
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
          <span className={cn(isMobile && "hidden sm:inline")}>
            <strong className="block font-semibold text-foreground dark:text-white">
              {label}
            </strong>
            {!isMobile && sub}
          </span>
        </div>
      ))}
    </motion.div>
  )
}
