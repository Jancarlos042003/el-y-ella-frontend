"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useSaleStore } from '@/store/saleStore'
import { ROUTES } from '@/constants/routes'
import type { LoginInput, RegisterInput, AuthResponse } from '@/types/auth.types'

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

  return useMutation({
    mutationFn: (data: LoginInput) =>
      api.post<AuthResponse>('/api/v1/auth/login', data).then((r) => r.data),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      if (user.role === 'ADMIN') {
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

  return useMutation({
    mutationFn: (data: RegisterInput) =>
      api.post<AuthResponse>('/api/v1/auth/register', data).then((r) => r.data),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      if (user.role === 'ADMIN') {
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
