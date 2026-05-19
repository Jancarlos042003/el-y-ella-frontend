import type { CartResponse } from '@/types/carrito.types'
import type { FlowerResponse } from '@/types/flores.types'

const GUEST_CART_KEY = 'el-y-ella-guest-cart'

export function getGuestCart(): CartResponse[] {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem(GUEST_CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export function saveGuestCart(cart: CartResponse[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart))
}

export function clearGuestCart(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(GUEST_CART_KEY)
}

export function addToGuestCart(flower: FlowerResponse, quantity: number): CartResponse[] {
  const cart = getGuestCart()
  const existingItemIndex = cart.findIndex((item) => item.flowerId === flower.id)

  if (existingItemIndex > -1) {
    const item = cart[existingItemIndex]
    const newQuantity = item.quantity + quantity
    cart[existingItemIndex] = {
      ...item,
      quantity: newQuantity,
      subtotal: newQuantity * item.price,
    }
  } else {
    const newItem: CartResponse = {
      id: Math.floor(Math.random() * 1000000), // ID temporal para el cliente
      flowerId: flower.id,
      flowerName: flower.name,
      flowerImageUrl: flower.imageUrl ?? '',
      quantity,
      price: flower.price,
      subtotal: flower.price * quantity,
      addedAt: new Date().toISOString(),
    }
    cart.push(newItem)
  }

  saveGuestCart(cart)
  return cart
}

export function updateGuestCartItem(flowerId: number, quantity: number): CartResponse[] {
  const cart = getGuestCart()
  const itemIndex = cart.findIndex((item) => item.flowerId === flowerId)

  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity
    cart[itemIndex].subtotal = quantity * cart[itemIndex].price
    saveGuestCart(cart)
  }

  return cart
}

export function removeGuestCartItem(flowerId: number): CartResponse[] {
  const cart = getGuestCart().filter((item) => item.flowerId !== flowerId)
  saveGuestCart(cart)
  return cart
}
