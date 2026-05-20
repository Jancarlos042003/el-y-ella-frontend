import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverFetch } from '@/lib/api.server'
import type { FlowerResponse } from '@/types/flores.types'
import type { ReviewResponse } from '@/types/review.types'
import { ProductDetail } from '@/components/products/ProductDetail'
import { ReviewSection } from '@/components/products/ReviewSection'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const flower = await serverFetch<FlowerResponse>(`/api/v1/flowers/${id}`).catch(() => null)
  return {
    title: flower ? `${flower.name} — El y Ella Detalles` : 'Producto — El y Ella Detalles',
  }
}

export default async function FlowerDetailPage({ params }: Props) {
  const { id } = await params

  const [flowerResult, reviewsResult] = await Promise.allSettled([
    serverFetch<FlowerResponse>(`/api/v1/flowers/${id}`),
    serverFetch<ReviewResponse[]>(`/api/v1/reviews/flower/${id}`),
  ])

  if (flowerResult.status === 'rejected') {
    notFound()
  }

  const flower = flowerResult.value
  const reviews = reviewsResult.status === 'fulfilled' ? reviewsResult.value : []

  return (
    <>
      <ProductDetail flower={flower} />
      <ReviewSection flowerId={flower.id} initialReviews={reviews} />
    </>
  )
}
