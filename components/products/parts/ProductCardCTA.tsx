"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ShoppingCart01Icon, Loading03Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface ProductCardCTAProps {
  onClick?: () => void
  className?: string
  disabled?: boolean
  isLoading?: boolean
}

export function ProductCardCTA({
  onClick,
  className,
  disabled,
  isLoading,
}: ProductCardCTAProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "transition-luxury mt-auto flex w-full items-center justify-center rounded-xl border border-primary/35 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary hover:border-primary/45 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className="flex items-center gap-2">
        {isLoading ? (
          <HugeiconsIcon
            icon={Loading03Icon}
            className="size-4 animate-spin"
            strokeWidth={1.5}
          />
        ) : (
          <HugeiconsIcon
            icon={ShoppingCart01Icon}
            className="size-4"
            strokeWidth={1.5}
          />
        )}
        Agregar al carrito
      </span>
    </button>
  )
}
