"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import type { ReviewResponse, ReviewRequest } from '@/types/review.types'

export function useReviews(flowerId: number) {
  return useQuery<ReviewResponse[]>({
    queryKey: ['reviews', flowerId],
    queryFn: () =>
      api.get<ReviewResponse[]>(`/api/v1/reviews/flower/${flowerId}`).then((r) => r.data),
    staleTime: 60_000,
  })
}

export function useCreateReview() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ReviewRequest) =>
      api.post<ReviewResponse>('/api/v1/reviews', data).then((r) => r.data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['reviews', variables.flowerId] })
    },
  })
}

export function useDeleteReview(flowerId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/reviews/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews', flowerId] })
    },
  })
}
