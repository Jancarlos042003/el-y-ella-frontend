import { create } from 'zustand'

interface SaleState {
  cartCount: number
  mobileMenuOpen: boolean
  setCartCount: (n: number) => void
  toggleMobileMenu: () => void
}

export const useSaleStore = create<SaleState>((set) => ({
  cartCount: 0,
  mobileMenuOpen: false,
  setCartCount: (n) => set({ cartCount: n }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}))
