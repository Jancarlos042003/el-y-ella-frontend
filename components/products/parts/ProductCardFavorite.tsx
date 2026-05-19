"use client"

import { HugeiconsIcon } from '@hugeicons/react'
import { FavouriteIcon } from '@hugeicons/core-free-icons'
import { cn } from "@/lib/utils"

interface ProductCardFavoriteProps {
  active?: boolean
  onClick?: (e: React.MouseEvent) => void
  className?: string
}

export function ProductCardFavorite({ active, onClick, className }: ProductCardFavoriteProps) {
  return (
    <button
      onClick={onClick}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn(
        "flex size-8 items-center justify-center rounded-full glass transition-luxury hover:border-primary/40 hover:text-primary",
        active && "text-primary border-primary/40",
        className
      )}
    >
      <HugeiconsIcon 
        icon={FavouriteIcon} 
        className={cn("size-4 transition-luxury", active && "fill-primary")} 
        strokeWidth={1.5} 
      />
    </button>
  )
}
