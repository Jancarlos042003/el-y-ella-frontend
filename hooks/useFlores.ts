"use client"

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import type { PageFlowerResponse } from '@/types/flores.types'

interface FloresParams {
  q?: string
  categoryId?: number
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'bestseller'
  page?: number
  size?: number
}

export function useFlores(params?: FloresParams) {
  return useQuery<PageFlowerResponse>({
    queryKey: ['flowers', params],
    queryFn: () =>
      api.get<PageFlowerResponse>('/api/v1/flowers', { params }).then((r) => r.data),
    staleTime: 60_000,
  })
}
