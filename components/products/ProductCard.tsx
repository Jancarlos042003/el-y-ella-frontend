"use client"

import Image from 'next/image'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ShoppingCart01Icon,
  FavouriteIcon,
  StarIcon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons'

import { ROUTES } from '@/constants/routes'
import type { FlowerResponse } from '@/types/flores.types'

interface ProductCardProps {
  flower: FlowerResponse
  badge?: string
}

export function ProductCard({ flower, badge }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-white/45 bg-white/60 shadow-[0_2px_16px_rgba(0,0,0,0.07)] backdrop-blur-[8px] dark:border-white/10 dark:bg-[#2a1520]/60">
      {/* badge */}
      {badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#ff69b4] px-3 py-1 text-[11px] font-semibold text-white">
          {badge}
        </span>
      )}

      {/* botón favorito */}
      <button
        aria-label="Agregar a favoritos"
        className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-sm transition-colors hover:border-[#ff69b4] hover:text-[#ff69b4] dark:border-white/20 dark:bg-[#1a0a0f]/80"
      >
        <HugeiconsIcon icon={FavouriteIcon} className="size-4" strokeWidth={1.5} />
      </button>

      {/* imagen */}
      <Link href={ROUTES.flores(flower.id)} className="block">
        <div className="relative h-52 w-full overflow-hidden bg-[#f9f5f0] dark:bg-[#2a1520]">
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
          <h3 className="line-clamp-2 font-serif text-[15px] font-bold leading-snug text-[#151515] dark:text-white">
            {flower.name}
          </h3>
        </Link>

        {/* rating + precio */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-[#151515]/60 dark:text-white/60">
            <HugeiconsIcon
              icon={StarIcon}
              className="size-3.5 fill-amber-400 text-amber-400"
              strokeWidth={0}
            />
            <span>{flower.averageRating?.toFixed(1) ?? '4.8'}</span>
            <span>({flower.reviewCount ?? 64})</span>
          </div>
          <span className="font-sans text-lg font-bold text-[#151515] dark:text-white">
            S/{' '}
            {flower.price.toLocaleString('es-PE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* CTA */}
        <button className="mt-auto flex w-full items-center justify-between rounded-xl border border-[#ff69b4] px-4 py-2.5 text-sm font-semibold text-[#ff69b4] transition-all hover:bg-[#ff69b4] hover:text-white">
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={ShoppingCart01Icon} className="size-4" strokeWidth={1.5} />
            Agregar al carrito
          </span>
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </article>
  )
}
