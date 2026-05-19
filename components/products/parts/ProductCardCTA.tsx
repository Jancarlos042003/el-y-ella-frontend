"use client"

import { HugeiconsIcon } from '@hugeicons/react'
import {
  ShoppingCart01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons'
import { cn } from "@/lib/utils"

interface ProductCardCTAProps {
  onClick?: () => void
  className?: string
}

export function ProductCardCTA({ onClick, className }: ProductCardCTAProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "mt-auto flex w-full items-center justify-between rounded-xl border border-primary/35 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-luxury hover:bg-primary/10 hover:border-primary/45",
        className
      )}
    >
      <span className="flex items-center gap-2">
        <HugeiconsIcon icon={ShoppingCart01Icon} className="size-4" strokeWidth={1.5} />
        Agregar al carrito
      </span>
      <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={1.5} />
    </button>
  )
}
