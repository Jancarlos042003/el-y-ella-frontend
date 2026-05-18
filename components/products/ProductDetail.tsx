"use client"

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ShoppingCart01Icon,
  MinusSignIcon,
  Add01Icon,
  StarIcon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'

import type { FlowerResponse } from '@/types/flores.types'
import { useAddToCart } from '@/hooks/useCarrito'
import { useMe } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'

interface ProductDetailProps {
  flower: FlowerResponse
}

export function ProductDetail({ flower }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { mutate: addToCart, isPending } = useAddToCart()
  const { data: me } = useMe()

  const rating = flower.averageRating ?? 4.8
  const reviewCount = flower.reviewCount ?? 0

  function handleAddToCart() {
    if (!me) {
      window.location.href = ROUTES.login
      return
    }
    addToCart(
      { flowerId: flower.id, quantity },
      {
        onSuccess: () => toast.success('Añadido al carrito'),
        onError: () => toast.error('No se pudo añadir al carrito. Inténtalo de nuevo.'),
      },
    )
  }

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* imagen */}
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#f9f5f0] dark:bg-[#1a0a0f]">
          <Image
            src={flower.imageUrl}
            alt={flower.name}
            fill
            priority
            className="object-cover"
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
                className="rounded-full border border-[#ff69b4]/30 bg-[#ff69b4]/10 px-3 py-1 text-xs font-semibold text-[#ff69b4]"
              >
                {cat.name}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#151515] dark:text-white md:text-4xl">
            {flower.name}
          </h1>

          {/* rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon
                  key={i}
                  icon={StarIcon}
                  className={`size-4 ${i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300 dark:text-white/20'}`}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-sm text-[#151515]/60 dark:text-white/60">
              {rating.toFixed(1)} ({reviewCount} reseña{reviewCount !== 1 ? 's' : ''})
            </span>
          </div>

          {/* precio */}
          <p className="font-serif text-4xl font-bold text-[#ff69b4]">
            {new Intl.NumberFormat('es-PE', {
              style: 'currency',
              currency: 'PEN',
            }).format(flower.price)}
          </p>

          {/* descripción */}
          <p className="leading-relaxed text-[#151515]/70 dark:text-white/70">
            {flower.description}
          </p>

          {/* stock */}
          {flower.stock !== undefined && (
            <p className="text-sm text-[#151515]/50 dark:text-white/50">
              {flower.stock > 0 ? `${flower.stock} disponibles` : 'Sin stock'}
            </p>
          )}

          {/* cantidad + botón */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Reducir cantidad"
              >
                <HugeiconsIcon icon={MinusSignIcon} className="size-4" strokeWidth={1.5} />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(flower.stock ?? 99, q + 1))}
                className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Aumentar cantidad"
              >
                <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isPending || flower.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ff69b4] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff69b4]/90 disabled:opacity-60"
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
