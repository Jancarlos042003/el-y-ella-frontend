"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useSaleStore } from '@/store/saleStore'
import { ROUTES } from '@/constants/routes'
import type { LoginInput, RegisterInput, AuthResponse } from '@/types/auth.types'
import { getGuestCart, clearGuestCart } from '@/lib/cart.utils'
import type { CartResponse } from '@/types/carrito.types'

export function useMe() {
  return useQuery<AuthResponse>({
    queryKey: ['me'],
    queryFn: () => api.get<AuthResponse>('/api/v1/auth/me').then((r) => r.data),
    staleTime: Infinity,
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: (data: LoginInput) =>
      api.post<AuthResponse>('/api/v1/auth/login', data).then((r) => r.data),
    onSuccess: async (user) => {
      queryClient.invalidateQueries({ queryKey: ['me'] })

      // Sincronizar carrito si hay items en localStorage
      const guestCart = getGuestCart()
      if (guestCart.length > 0) {
        try {
          const syncItems = guestCart.map((item) => ({
            flowerId: item.flowerId,
            quantity: item.quantity,
          }))
          const { data: remoteCart } = await api.post<CartResponse[]>(
            '/api/v1/cart/sync',
            syncItems
          )
          clearGuestCart()
          queryClient.setQueryData(['cart'], remoteCart)
          setCartCount(remoteCart.length)
        } catch (error) {
          console.error('Error syncing cart:', error)
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      }

      if (user.role === 'ROLE_ADMIN') {
        router.push(ROUTES.admin)
      } else {
        router.push(ROUTES.home)
      }
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: (data: RegisterInput) =>
      api.post<AuthResponse>('/api/v1/auth/register', data).then((r) => r.data),
    onSuccess: async (user) => {
      queryClient.invalidateQueries({ queryKey: ['me'] })

      // Sincronizar carrito si hay items en localStorage
      const guestCart = getGuestCart()
      if (guestCart.length > 0) {
        try {
          const syncItems = guestCart.map((item) => ({
            flowerId: item.flowerId,
            quantity: item.quantity,
          }))
          const { data: remoteCart } = await api.post<CartResponse[]>(
            '/api/v1/cart/sync',
            syncItems
          )
          clearGuestCart()
          queryClient.setQueryData(['cart'], remoteCart)
          setCartCount(remoteCart.length)
        } catch (error) {
          console.error('Error syncing cart:', error)
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      }

      if (user.role === 'ROLE_ADMIN') {
        router.push(ROUTES.admin)
      } else {
        router.push(ROUTES.home)
      }
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: () => api.post('/api/v1/auth/logout'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      setCartCount(0)
    },
  })
}
