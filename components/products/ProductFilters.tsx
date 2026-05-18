"use client"

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { SortingAZ01Icon } from '@hugeicons/core-free-icons'

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
      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <HugeiconsIcon
          icon={SortingAZ01Icon}
          className="size-4 shrink-0 text-[#ff69b4]"
          strokeWidth={1.5}
        />
        <select
          value={currentSort}
          onChange={(e) => updateParam('sort', e.target.value as SortValue)}
          className="bg-transparent text-sm text-[#151515] outline-none dark:text-white"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
