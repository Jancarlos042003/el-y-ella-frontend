import { Hero } from '@/components/home/Hero'
import { Categories } from '@/components/home/Categories'
import { ProductGrid } from '@/components/home/ProductGrid'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'
import { serverFetch } from '@/lib/api.server'
import type { CategoryResponse, PageFlowerResponse } from '@/types/flores.types'

export default async function HomePage() {
  /* fetch paralelo desde el servidor; si el backend no responde, se usan arrays vacíos */
  const [categoriesResult, flowersResult] = await Promise.allSettled([
    serverFetch<CategoryResponse[]>('/api/v1/categories'),
    serverFetch<PageFlowerResponse>('/api/v1/flowers?sort=bestseller&size=10'),
  ])

  const categories =
    categoriesResult.status === 'fulfilled' ? categoriesResult.value : []
  const flowers =
    flowersResult.status === 'fulfilled' ? flowersResult.value.content : []

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <ProductGrid flowers={flowers} title="Productos destacados" />
      <Testimonials />
      <Newsletter />
    </>
  )
}
