'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/api'
import type { FlowerResponse } from '@/types/flores.types'
import type { FlowerRequestInput } from '@/types/admin.types'

export function useCrearFlor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FlowerRequestInput) =>
      api.post<FlowerResponse>('/api/v1/flowers', data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flowers'] })
      toast.success('Flor creada correctamente')
    },
    onError: () => toast.error('No se pudo crear la flor'),
  })
}

export function useActualizarFlor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FlowerRequestInput }) =>
      api.put<FlowerResponse>(`/api/v1/flowers/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flowers'] })
      toast.success('Flor actualizada correctamente')
    },
    onError: () => toast.error('No se pudo actualizar la flor'),
  })
}

export function useEliminarFlor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/flowers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flowers'] })
      toast.success('Flor eliminada correctamente')
    },
    onError: () => toast.error('No se pudo eliminar la flor'),
  })
}
