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

export function CartItemExpanded({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}: CartItemPartsProps) {
  return (
    <div className="transition-luxury hover:shadow-luxury flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 sm:flex-row sm:items-center">
      {/* imagen */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl sm:w-32">
        <Image
          src={item.flowerImageUrl || "/images/ramo-flores-banner.png"}
          alt={item.flowerName}
          fill
          className="object-cover"
        />
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col justify-center gap-1">
        <h3 className="font-serif text-lg font-bold text-foreground">
          {item.flowerName}
        </h3>
        <p className="text-sm text-foreground/60">
          Precio unitario: ${item.price.toLocaleString()}
        </p>
      </div>

      {/* controles */}
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
          <button
            onClick={() => onUpdateQuantity(-1)}
            className="flex size-8 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            disabled={item.quantity <= 1 || isUpdating}
          >
            <HugeiconsIcon
              icon={MinusSignIcon}
              className="size-4"
              strokeWidth={2}
            />
          </button>
          <span className="w-8 text-center text-sm font-bold">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(1)}
            className="flex size-8 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            disabled={isUpdating}
          >
            <HugeiconsIcon
              icon={Add01Icon}
              className="size-4"
              strokeWidth={2}
            />
          </button>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-lg font-bold text-primary">
            ${item.subtotal.toLocaleString()}
          </span>
          <button
            onClick={onRemove}
            className="text-foreground/40 transition-colors hover:text-destructive"
            title="Eliminar item"
          >
            <HugeiconsIcon
              icon={Delete02Icon}
              className="size-5"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
