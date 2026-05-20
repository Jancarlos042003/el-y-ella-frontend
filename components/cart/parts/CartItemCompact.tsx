"use client"

import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  MinusSignIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons"
import type { CartResponse } from "@/types/carrito.types"

interface CartItemPartsProps {
  item: CartResponse
  onUpdateQuantity: (delta: number) => void
  onRemove: () => void
  isUpdating?: boolean
}

export function CartItemCompact({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}: CartItemPartsProps) {
  return (
    <div className="group flex gap-4 px-3 py-2">
      {/* imagen */}
      <div className="shadow-soft relative size-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
        <Image
          src={item.flowerImageUrl || "/images/ramo-flores-banner.png"}
          alt={item.flowerName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="line-clamp-2 font-serif text-lg leading-tight font-medium text-foreground">
            {item.flowerName}
          </h4>
          <button
            onClick={onRemove}
            className="transition-luxury text-foreground/50 hover:text-destructive"
            aria-label="Eliminar producto"
          >
            <HugeiconsIcon icon={Delete02Icon} className="size-4" />
          </button>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1 rounded-full border border-primary/10 bg-primary/5 p-1">
            <button
              onClick={() => onUpdateQuantity(-1)}
              className="transition-luxury flex size-7 items-center justify-center rounded-full text-primary hover:bg-primary/25 disabled:opacity-30"
              disabled={item.quantity <= 1 || isUpdating}
            >
              <HugeiconsIcon icon={MinusSignIcon} className="size-3.5" />
            </button>
            <span className="w-6 text-center text-base font-bold text-primary">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(1)}
              className="transition-luxury flex size-7 items-center justify-center rounded-full text-primary hover:bg-primary/25 disabled:opacity-30"
              disabled={isUpdating}
            >
              <HugeiconsIcon icon={Add01Icon} className="size-3.5" />
            </button>
          </div>
          <div className="text-right">
            <p className="font-sans text-lg font-bold text-primary">
              ${item.subtotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
