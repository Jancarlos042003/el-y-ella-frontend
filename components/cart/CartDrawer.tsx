"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  MinusSignIcon,
  Delete02Icon,
  ShoppingCart01Icon,
  ShoppingBasket01Icon,
} from "@hugeicons/core-free-icons"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useSaleStore } from "@/store/saleStore"
import { useCarrito, useClearCart } from "@/hooks/useCarrito"
import { useMe } from "@/hooks/useAuth"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { CartItem } from "./CartItem"

export function CartDrawer() {
  const router = useRouter()
  const { isCartOpen, setIsCartOpen } = useSaleStore()
  const { data: cart = [], isLoading } = useCarrito()
  const { data: user } = useMe()

  const clearCart = useClearCart()

  const total = cart.reduce((acc, item) => acc + item.subtotal, 0)

  const handleCheckout = () => {
    setIsCartOpen(false)
    if (!user) {
      router.push(ROUTES.login)
    } else {
      router.push(ROUTES.pago)
    }
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="glass flex w-full flex-col border-l-primary/10">
        <SheetHeader className="border-b border-primary/10 pb-6">
          <SheetTitle className="flex items-center gap-2 font-serif text-2xl">
            <HugeiconsIcon icon={ShoppingCart01Icon} className="text-primary" />
            Tu Carrito
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <span className="animate-pulse text-muted-foreground">
                Cargando carrito...
              </span>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="rounded-full bg-primary/5 p-6">
                <HugeiconsIcon
                  icon={ShoppingBasket01Icon}
                  className="size-12 text-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                  Tu carrito está vacío
                </h1>
                <p className="text-foreground/60">
                  ¿Aún no has elegido el detalle perfecto?
                </p>
              </div>
              <Link
                href={ROUTES.home}
                onClick={() => setIsCartOpen(false)}
                className="transition-luxury hover:bg-primary-dark rounded-full bg-primary px-8 py-3 font-semibold text-white"
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6 px-1">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} variant="compact" />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="border-t border-primary/10 pt-6">
            <div className="flex w-full flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  Total estimado
                </span>
                <span className="font-serif text-3xl font-bold text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="shadow-soft transition-luxury hover:bg-primary-dark h-14 w-full rounded-full bg-primary text-base font-bold text-white active:scale-[0.98]"
                >
                  Finalizar Compra
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => clearCart.mutate()}
                  className="transition-luxury rounded-full text-foreground/60 hover:bg-destructive/5 hover:text-destructive"
                  disabled={clearCart.isPending}
                >
                  {clearCart.isPending ? "Vaciando..." : "Vaciar carrito"}
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
