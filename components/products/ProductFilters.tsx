"use client"

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { SortingAZ01Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'bestseller', label: 'Más vendidos' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]['value']

interface ProductFiltersProps {
  currentSort?: string
}

export function ProductFilters({ currentSort = 'newest' }: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)
      params.delete('page') // reset pagination on filter change
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [pathname, router, searchParams],
  )

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className={cn(
        "flex items-center gap-2 rounded-xl border border-border bg-white/80 px-3 py-2 text-sm backdrop-blur-md transition-luxury",
        "focus-within:border-primary/50 dark:bg-white/5"
      )}>
        <HugeiconsIcon
          icon={SortingAZ01Icon}
          className="size-4 shrink-0 text-primary"
          strokeWidth={1.5}
        />
        <select
          value={currentSort}
          onChange={(e) => updateParam('sort', e.target.value as SortValue)}
          className="bg-transparent text-sm text-foreground outline-none dark:text-white cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-background text-foreground">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
