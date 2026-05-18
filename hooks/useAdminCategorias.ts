'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/api'
import type { CategoryResponse } from '@/types/flores.types'
import type { CategoryRequestInput } from '@/types/admin.types'

export function useCrearCategoria() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CategoryRequestInput) =>
      api.post<CategoryResponse>('/api/v1/categories', data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría creada correctamente')
    },
    onError: () => toast.error('No se pudo crear la categoría'),
  })
}

export function useActualizarCategoria() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryRequestInput }) =>
      api.put<CategoryResponse>(`/api/v1/categories/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría actualizada correctamente')
    },
    onError: () => toast.error('No se pudo actualizar la categoría'),
  })
}

export function useEliminarCategoria() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría eliminada correctamente')
    },
    onError: () => toast.error('No se pudo eliminar la categoría'),
  })
}
