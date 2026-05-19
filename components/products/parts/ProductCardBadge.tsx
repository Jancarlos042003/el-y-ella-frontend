"use client"

import { cn } from "@/lib/utils"

interface ProductCardBadgeProps {
  children: React.ReactNode
  className?: string
}

export function ProductCardBadge({ children, className }: ProductCardBadgeProps) {
  return (
    <span 
      className={cn(
        "rounded-full bg-primary/10 border border-primary/15 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  )
}
