"use client"

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import type { CategoryResponse } from '@/types/flores.types'

export function useCategorias() {
  return useQuery<CategoryResponse[]>({
    queryKey: ['categories'],
    queryFn: () =>
      api.get<CategoryResponse[]>('/api/v1/categories').then((r) => r.data),
    staleTime: Infinity,
  })
}
