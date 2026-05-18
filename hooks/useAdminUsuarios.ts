'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/api'
import type { UserResponse, UpdateUserRequestInput } from '@/types/admin.types'

export function useAdminUsuarios() {
  return useQuery<UserResponse[]>({
    queryKey: ['admin-users'],
    queryFn: () =>
      api.get<UserResponse[]>('/api/v1/admin/users').then((r) => r.data),
  })
}

export function useActualizarUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequestInput }) =>
      api.put<UserResponse>(`/api/v1/admin/users/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('Usuario actualizado correctamente')
    },
    onError: () => toast.error('No se pudo actualizar el usuario'),
  })
}

export function useEliminarUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/admin/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('Usuario eliminado correctamente')
    },
    onError: () => toast.error('No se pudo eliminar el usuario'),
  })
}
