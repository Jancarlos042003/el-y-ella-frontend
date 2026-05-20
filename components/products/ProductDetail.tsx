"use client"

import { useState } from 'react'
import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ShoppingCart01Icon,
  MinusSignIcon,
  Add01Icon,
  StarIcon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'

import type { FlowerResponse } from '@/types/flores.types'
import { useAddToCartAction } from '@/hooks/useCarrito'
import { useMe } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

interface ProductDetailProps {
  flower: FlowerResponse
}

export function ProductDetail({ flower }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { handleAddToCart, isPending } = useAddToCartAction()
  const { data: me } = useMe()

  const rating = flower.averageRating ?? 4.8
  const reviewCount = flower.reviewCount ?? 0

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* imagen */}
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-background">
          <Image
            src={flower.imageUrl}
            alt={flower.name}
            fill
            priority
            className="object-cover transition-luxury"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* info */}
        <div className="flex flex-col gap-6">
          {/* categorías */}
          <div className="flex flex-wrap gap-2">
            {flower.categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
              >
                {cat.name}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl font-bold text-foreground dark:text-white md:text-4xl">
            {flower.name}
          </h1>

          {/* rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon
                  key={i}
                  icon={StarIcon}
                  className={cn(
                    "size-4 transition-luxury",
                    i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-foreground/20 dark:text-white/20'
                  )}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-sm text-foreground/60 dark:text-white/60">
              {rating.toFixed(1)} ({reviewCount} reseña{reviewCount !== 1 ? 's' : ''})
            </span>
          </div>

          {/* precio */}
          <p className="font-serif text-4xl font-bold text-primary">
            {new Intl.NumberFormat('es-PE', {
              style: 'currency',
              currency: 'PEN',
            }).format(flower.price)}
          </p>

          {/* descripción */}
          <p className="leading-relaxed text-foreground/70 dark:text-white/70">
            {flower.description}
          </p>

          {/* stock */}
          {flower.stock !== undefined && (
            <p className="text-sm text-foreground/50 dark:text-white/50">
              {flower.stock > 0 ? `${flower.stock} disponibles` : 'Sin stock'}
            </p>
          )}

          {/* cantidad + botón */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-border bg-white/50 dark:bg-white/5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center rounded-full hover:bg-foreground/5 transition-luxury"
                aria-label="Reducir cantidad"
              >
                <HugeiconsIcon icon={MinusSignIcon} className="size-4" strokeWidth={1.5} />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(flower.stock ?? 99, q + 1))}
                className="flex size-10 items-center justify-center rounded-full hover:bg-foreground/5 transition-luxury"
                aria-label="Aumentar cantidad"
              >
                <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleAddToCart(flower, quantity)}
              disabled={isPending || flower.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-luxury hover:bg-primary-dark disabled:opacity-60"
            >
              {isPending ? (
                <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" strokeWidth={1.5} />
              ) : (
                <>
                  <HugeiconsIcon icon={ShoppingCart01Icon} className="size-4" strokeWidth={1.5} />
                  Agregar al carrito
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
