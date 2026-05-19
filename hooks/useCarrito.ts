"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useSaleStore } from '@/store/saleStore'
import type { CartResponse, CartItemRequest, AddToCartInput } from '@/types/carrito.types'
import type { AuthResponse } from '@/types/auth.types'
import {
  getGuestCart,
  addToGuestCart,
  updateGuestCartItem,
  removeGuestCartItem,
  clearGuestCart,
} from '@/lib/cart.utils'

export function useCarrito() {
  const qc = useQueryClient()
  const user = qc.getQueryData<AuthResponse>(['me'])

  return useQuery<CartResponse[]>({
    queryKey: ['cart'],
    queryFn: () => {
      if (!user) {
        return Promise.resolve(getGuestCart())
      }
      return api.get<CartResponse[]>('/api/v1/cart').then((r) => r.data)
    },
    staleTime: 0,
  })
}

export function useAddToCart() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: async (data: AddToCartInput) => {
      const user = qc.getQueryData<AuthResponse>(['me'])

      if (!user) {
        if (!data.flower) throw new Error('Flower data is required for guest cart')
        const updatedCart = addToGuestCart(data.flower, data.quantity)
        return updatedCart[updatedCart.length - 1] // Return the last added item or similar
      }

      return api
        .post<CartResponse>('/api/v1/cart', {
          flowerId: data.flowerId,
          quantity: data.quantity,
        })
        .then((r) => r.data)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['cart'] })
      const cart = qc.getQueryData<CartResponse[]>(['cart'])
      if (cart) setCartCount(cart.length)
    },
  })
}

export function useUpdateCartItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CartItemRequest }) => {
      const user = qc.getQueryData<AuthResponse>(['me'])

      if (!user) {
        updateGuestCartItem(data.flowerId, data.quantity)
        return Promise.resolve({} as CartResponse) // Mock response
      }

      return api.put<CartResponse>(`/api/v1/cart/${id}`, data).then((r) => r.data)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  })
}

export function useRemoveCartItem() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: async (id: number) => {
      const user = qc.getQueryData<AuthResponse>(['me'])

      if (!user) {
        // Para invitados, el "id" que pasamos es en realidad el flowerId
        removeGuestCartItem(id)
        return
      }

      await api.delete(`/api/v1/cart/${id}`)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['cart'] })
      const cart = qc.getQueryData<CartResponse[]>(['cart'])
      if (cart) setCartCount(cart.length)
    },
  })
}

export function useSyncCart() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: (items: CartItemRequest[]) =>
      api.post<CartResponse[]>('/api/v1/cart/sync', items).then((r) => r.data),
    onSuccess: async () => {
      clearGuestCart()
      await qc.invalidateQueries({ queryKey: ['cart'] })
      const cart = qc.getQueryData<CartResponse[]>(['cart'])
      if (cart) setCartCount(cart.length)
    },
  })
}

export function useClearCart() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: async () => {
      const user = qc.getQueryData<AuthResponse>(['me'])
      const cart = qc.getQueryData<CartResponse[]>(['cart']) || []

      if (!user) {
        clearGuestCart()
        return
      }

      if (cart.length > 0) {
        await Promise.all(cart.map((item) => api.delete(`/api/v1/cart/${item.id}`)))
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
      setCartCount(0)
    },
  })
}
