"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  MinusSignIcon,
  Delete02Icon,
  ShoppingCart01Icon,
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
import {
  useCarrito,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from "@/hooks/useCarrito"
import { useMe } from "@/hooks/useAuth"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const router = useRouter()
  const { isCartOpen, setIsCartOpen } = useSaleStore()
  const { data: cart = [], isLoading } = useCarrito()
  const { data: user } = useMe()

  const updateItem = useUpdateCartItem()
  const removeItem = useRemoveCartItem()
  const clearCart = useClearCart()

  const total = cart.reduce((acc, item) => acc + item.subtotal, 0)

  const handleUpdateQuantity = (
    id: number,
    flowerId: number,
    currentQty: number,
    delta: number
  ) => {
    const newQty = currentQty + delta
    if (newQty < 1) return
    updateItem.mutate({ id, data: { flowerId, quantity: newQty } })
  }

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
                  icon={ShoppingCart01Icon}
                  className="size-12 text-primary/20"
                />
              </div>
              <p className="font-serif text-xl font-medium text-foreground/60">
                Tu carrito está vacío
              </p>
              <Button
                variant="ghost"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-primary/20 text-primary hover:bg-primary/5"
              >
                Explorar catálogo
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 px-1">
              {cart.map((item) => (
                <div key={item.id} className="group flex gap-4">
                  <div className="shadow-soft relative size-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={item.flowerImageUrl || "/images/placeholder.png"}
                      alt={item.flowerName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="line-clamp-2 font-serif text-lg leading-tight font-medium text-foreground">
                        {item.flowerName}
                      </h4>
                      <button
                        onClick={() =>
                          removeItem.mutate(user ? item.id : item.flowerId)
                        }
                        className="transition-luxury text-foreground/30 hover:text-destructive"
                        aria-label="Eliminar producto"
                      >
                        <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-primary/10 bg-primary/5 p-1">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.flowerId,
                              item.quantity,
                              -1
                            )
                          }
                          className="transition-luxury flex size-7 items-center justify-center rounded-full text-primary hover:bg-primary/10 disabled:opacity-30"
                          disabled={item.quantity <= 1 || updateItem.isPending}
                        >
                          <HugeiconsIcon
                            icon={MinusSignIcon}
                            className="size-3.5"
                          />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.flowerId,
                              item.quantity,
                              1
                            )
                          }
                          className="transition-luxury flex size-7 items-center justify-center rounded-full text-primary hover:bg-primary/10 disabled:opacity-30"
                          disabled={updateItem.isPending}
                        >
                          <HugeiconsIcon
                            icon={Add01Icon}
                            className="size-3.5"
                          />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-sans text-sm font-bold text-primary">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
