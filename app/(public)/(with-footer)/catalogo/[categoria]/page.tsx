import type { Metadata } from 'next'
import { Suspense } from 'react'
import { serverFetch } from '@/lib/api.server'
import type { CategoryResponse } from '@/types/flores.types'
import type { PageFlowerResponse } from '@/types/flores.types'
import { ProductGrid } from '@/components/home/ProductGrid'
import { ProductFilters } from '@/components/products/ProductFilters'

interface Props {
  params: Promise<{ categoria: string }>
  searchParams: Promise<{ sort?: string; page?: string; q?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const name = categoria === 'todas' ? 'Catálogo' : decodeURIComponent(categoria)
  return { title: `${capitalize(name)} — El y Ella Detalles` }
}

export default async function CatalogoPage({ params, searchParams }: Props) {
  const { categoria } = await params
  const { sort = 'newest', page = '0', q } = await searchParams

  const [categoriesResult, flowersResult] = await Promise.allSettled([
    serverFetch<CategoryResponse[]>('/api/v1/categories'),
    serverFetch<PageFlowerResponse>(buildFlowersUrl(categoria, { sort, page, q })),
  ])

  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : []
  const paginatedFlowers = flowersResult.status === 'fulfilled' ? flowersResult.value : null
  const flowers = paginatedFlowers?.content ?? []

  const categoryLabel =
    categoria === 'todas'
      ? 'Todas las flores'
      : categories.find((c) => c.name.toLowerCase() === categoria.toLowerCase())?.name ??
        capitalize(decodeURIComponent(categoria))

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-10 md:px-6">
      {/* encabezado */}
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-bold text-[#151515] dark:text-white md:text-4xl">
          {categoryLabel}
        </h1>
        {paginatedFlowers && (
          <p className="text-sm text-[#151515]/60 dark:text-white/60">
            {paginatedFlowers.totalElements} resultado
            {paginatedFlowers.totalElements !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* filtros */}
      <div className="mb-6">
        <Suspense>
          <ProductFilters currentSort={sort} />
        </Suspense>
      </div>

      {/* grid */}
      {flowers.length > 0 ? (
        <ProductGrid flowers={flowers} />
      ) : (
        <p className="py-20 text-center text-[#151515]/50 dark:text-white/50">
          No se encontraron flores en esta categoría.
        </p>
      )}

      {/* paginación simple */}
      {paginatedFlowers && paginatedFlowers.totalPages > 1 && (
        <Pagination
          currentPage={paginatedFlowers.number}
          totalPages={paginatedFlowers.totalPages}
          sort={sort}
          q={q}
        />
      )}
    </div>
  )
}

/* ── helpers ── */

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function buildFlowersUrl(
  categoria: string,
  { sort, page, q }: { sort: string; page: string; q?: string },
) {
  const params = new URLSearchParams({ sort, page, size: '12' })
  if (q) params.set('q', q)
  return `/api/v1/flowers?${params.toString()}`
}

/* ── Paginación ── */

function Pagination({
  currentPage,
  totalPages,
  sort,
  q,
}: {
  currentPage: number
  totalPages: number
  sort: string
  q?: string
}) {
  const makeHref = (page: number) => {
    const params = new URLSearchParams({ sort, page: String(page) })
    if (q) params.set('q', q)
    return `?${params.toString()}`
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      {currentPage > 0 && (
        <a
          href={makeHref(currentPage - 1)}
          className="rounded-full border border-black/10 px-4 py-2 text-sm text-[#151515] hover:border-[#ff69b4] dark:border-white/10 dark:text-white"
        >
          ← Anterior
        </a>
      )}
      <span className="text-sm text-[#151515]/60 dark:text-white/60">
        Página {currentPage + 1} de {totalPages}
      </span>
      {currentPage < totalPages - 1 && (
        <a
          href={makeHref(currentPage + 1)}
          className="rounded-full border border-black/10 px-4 py-2 text-sm text-[#151515] hover:border-[#ff69b4] dark:border-white/10 dark:text-white"
        >
          Siguiente →
        </a>
      )}
    </nav>
  )
}
