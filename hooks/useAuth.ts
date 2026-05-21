'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useSaleStore } from '@/store/saleStore'
import { ROUTES } from '@/constants/routes'
import type { LoginInput, RegisterInput, AuthResponse } from '@/types/auth.types'
import { getGuestCart } from '@/lib/cart.utils'

export function useMe() {
  return useQuery<AuthResponse>({
    queryKey: ['me'],
    queryFn: () => api.get<AuthResponse>('/api/v1/auth/me').then((r) => r.data),
    staleTime: Infinity,
    retry: false,
  })
}

function resolvePostLoginRoute(role: AuthResponse['role'], redirectTo?: string | null) {
  if (role === 'ROLE_ADMIN') {
    return ROUTES.admin
  }

  if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('/admin')) {
    return redirectTo
  }

  return ROUTES.home
}

export function useLogin(redirectTo?: string | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginInput) =>
      api.post<AuthResponse>('/api/v1/auth/login', data).then((r) => r.data),
    onSuccess: async (user) => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      // Hard navigation: garantiza que el middleware recibe la cookie jwt recién
      // seteada por el backend. router.push usa soft nav con cache stale.
      window.location.assign(resolvePostLoginRoute(user.role, redirectTo))
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterInput) =>
      api.post<AuthResponse>('/api/v1/auth/register', data).then((r) => r.data),
    onSuccess: async (user) => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      // Hard navigation por la misma razón que useLogin
      window.location.assign(user.role === 'ROLE_ADMIN' ? ROUTES.admin : ROUTES.home)
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
      queryClient.setQueryData(['cart'], getGuestCart())
      setCartCount(getGuestCart().length)
    },
  })
}
