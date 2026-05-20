"use client"

import Image from 'next/image'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { StarIcon } from '@hugeicons/core-free-icons'

import { ROUTES } from '@/constants/routes'
import type { FlowerResponse } from '@/types/flores.types'
import { cn } from '@/lib/utils'
import { useAddToCartAction } from '@/hooks/useCarrito'
import { Loading03Icon } from '@hugeicons/core-free-icons'

// Sub-componentes
import { ProductCardBadge } from './parts/ProductCardBadge'
import { ProductCardCTA } from './parts/ProductCardCTA'
import { ProductCardFavorite } from './parts/ProductCardFavorite'

interface ProductCardProps {
  flower: FlowerResponse
  badge?: string
}

export function ProductCard({ flower, badge }: ProductCardProps) {
  const { handleAddToCart, isPending } = useAddToCartAction()

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl glass-soft shadow-soft transition-luxury hover:shadow-floating">
      {/* badge */}
      {badge && (
        <ProductCardBadge className="absolute left-3 top-3 z-10">
          {badge}
        </ProductCardBadge>
      )}

      {/* botón favorito */}
      <ProductCardFavorite 
        className="absolute right-3 top-3 z-10" 
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          // Lógica de favorito aquí
        }}
      />

      {/* imagen */}
      <Link href={ROUTES.flores(flower.id)} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-background">
          <Image
            src={flower.imageUrl || '/images/ramo-flores-banner.png'}
            alt={flower.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* info */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={ROUTES.flores(flower.id)}>
          <h3 className="line-clamp-2 font-serif text-[15px] font-bold leading-snug text-foreground dark:text-white">
            {flower.name}
          </h3>
        </Link>

        {/* rating + precio */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-foreground/60 dark:text-white/60">
            <HugeiconsIcon
              icon={StarIcon}
              className="size-3.5 fill-amber-400 text-amber-400"
              strokeWidth={0}
            />
            <span>{flower.averageRating?.toFixed(1) ?? '4.8'}</span>
            <span>({flower.reviewCount ?? 64})</span>
          </div>
          <span className="font-sans text-lg font-bold text-foreground dark:text-white">
            S/{' '}
            {flower.price.toLocaleString('es-PE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* CTA */}
        <ProductCardCTA 
          onClick={() => handleAddToCart(flower, 1)}
          disabled={isPending || flower.stock === 0}
          isLoading={isPending}
        />
      </div>
    </article>
  )
}
