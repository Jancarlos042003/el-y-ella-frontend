"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSaleStore } from '@/store/saleStore'
import type { CartResponse, CartItemRequest, AddToCartInput } from '@/types/carrito.types'
import type { FlowerResponse } from '@/types/flores.types'
import {
  getGuestCart,
  addToGuestCart,
  updateGuestCartItem,
  removeGuestCartItem,
  clearGuestCart,
} from '@/lib/cart.utils'

function syncLocalCartState(
  qc: ReturnType<typeof useQueryClient>,
  setCartCount: (value: number) => void,
  cart: CartResponse[] = getGuestCart()
) {
  qc.setQueryData(['cart'], cart)
  setCartCount(cart.length)
}

export function useCarrito() {
  return useQuery<CartResponse[]>({
    queryKey: ['cart'],
    queryFn: () => Promise.resolve(getGuestCart()),
    staleTime: 0,
  })
}

export function useAddToCart() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: async (data: AddToCartInput) => {
      if (!data.flower) throw new Error('Flower data is required for local cart')
      return addToGuestCart(data.flower, data.quantity)
    },
    onSuccess: (cart) => {
      syncLocalCartState(qc, setCartCount, cart)
    },
  })
}

export function useAddToCartAction() {
  const { mutate, isPending } = useAddToCart()

  const handleAddToCart = (flower: FlowerResponse, quantity: number = 1) => {
    mutate(
      { flowerId: flower.id, quantity, flower },
      {
        onSuccess: () => toast.success(`${flower.name} añadido al carrito`),
        onError: () => toast.error('No se pudo añadir al carrito. Inténtalo de nuevo.'),
      }
    )
  }

  return { handleAddToCart, isPending }
}

export function useUpdateCartItem() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: ({ data }: { id: number; data: CartItemRequest }) => {
      return Promise.resolve(updateGuestCartItem(data.flowerId, data.quantity))
    },
    onSuccess: (cart) => {
      syncLocalCartState(qc, setCartCount, cart)
    },
  })
}

export function useRemoveCartItem() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: async (id: number) => {
      // En el carrito local, el "id" que pasamos es en realidad el flowerId.
      return removeGuestCartItem(id)
    },
    onSuccess: (cart) => {
      syncLocalCartState(qc, setCartCount, cart)
    },
  })
}

export function useClearCart() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: async () => {
      clearGuestCart()
    },
    onSuccess: () => {
      syncLocalCartState(qc, setCartCount, [])
    },
  })
}
