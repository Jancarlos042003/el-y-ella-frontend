import Image from 'next/image'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

import { ROUTES } from '@/constants/routes'
import type { CategoryResponse } from '@/types/flores.types'
import { cn } from '@/lib/utils'

/* mapeo nombre de categoría → imagen local */
const CATEGORY_IMAGES: Record<string, string> = {
  rosas: '/images/categories/category-flowers.png',
  tulipanes: '/images/categories/category-tulips.png',
  girasoles: '/images/categories/category-sunflowers.png',
  bouquets: '/images/categories/category-bouquets.png',
}

function getCategoryImage(name: string) {
  return CATEGORY_IMAGES[name.toLowerCase()] ?? '/images/categories/category-flowers.png'
}

export function Categories({ categories }: { categories: CategoryResponse[] }) {
  if (!categories.length) return null

  return (
    <section className="mx-auto max-w-[90rem] px-4 py-12 md:px-6">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl font-bold text-foreground dark:text-white">
          Categorías
        </h2>
        <Link
          href="/catalogo"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-luxury"
        >
          Ver todo
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={ROUTES.catalogo(cat.name.toLowerCase())}
            className={cn(
              "group flex items-center gap-3 rounded-2xl glass-soft p-3 transition-luxury",
              "hover:border-primary/30 hover:shadow-soft"
            )}
          >
            {/* imagen circular */}
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-background">
              <Image
                src={getCategoryImage(cat.name)}
                alt={cat.name}
                fill
                sizes="56px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* texto */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-foreground dark:text-white">{cat.name}</p>
              <span className="flex items-center gap-0.5 text-xs text-primary">
                Ver colección
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
