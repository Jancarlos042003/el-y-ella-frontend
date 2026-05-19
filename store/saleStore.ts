import { create } from 'zustand'

interface SaleState {
  cartCount: number
  mobileMenuOpen: boolean
  isCartOpen: boolean
  setCartCount: (n: number) => void
  toggleMobileMenu: () => void
  setIsCartOpen: (open: boolean) => void
}

export const useSaleStore = create<SaleState>((set) => ({
  cartCount: 0,
  mobileMenuOpen: false,
  isCartOpen: false,
  setCartCount: (n) => set({ cartCount: n }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setIsCartOpen: (open) => set({ isCartOpen: open }),
}))
