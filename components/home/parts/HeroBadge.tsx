"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface HeroBadgeProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function HeroBadge({ children, className, delay = 0.2 }: HeroBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur-sm",
        className
      )}
    >
      {children}
    </motion.span>
  )
}
