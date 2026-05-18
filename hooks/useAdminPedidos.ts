'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/api'
import type { OrderResponse, UpdateOrderStatusInput } from '@/types/admin.types'

export function useAdminPedidos() {
  return useQuery<OrderResponse[]>({
    queryKey: ['admin-orders'],
    queryFn: () =>
      api.get<OrderResponse[]>('/api/v1/admin/orders').then((r) => r.data),
  })
}

export function useActualizarEstadoPedido() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrderStatusInput }) =>
      api.put(`/api/v1/admin/orders/${id}/status`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      toast.success('Estado actualizado')
    },
    onError: () => toast.error('No se pudo actualizar el estado'),
  })
}
