"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ShoppingBasket01Icon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { useCarrito, useClearCart } from "@/hooks/useCarrito"
import { useMe } from "@/hooks/useAuth"
import { ROUTES } from "@/constants/routes"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart/CartItem"

export default function CarritoPage() {
  const router = useRouter()
  const { data: cart = [], isLoading } = useCarrito()
  const { data: user } = useMe()
  const { mutate: clearCart, isPending: isClearing } = useClearCart()

  const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0)
  const total = subtotal // Por ahora sin envío ni impuestos complejos

  function handleCheckout() {
    if (!user) {
      toast.info("Inicia sesión para finalizar tu compra")
      router.push(`${ROUTES.login}?redirect=${encodeURIComponent(ROUTES.pago)}`)
      return
    }
    router.push(ROUTES.pago)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4">
        <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-foreground/60">Cargando tu carrito...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60svh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
          <HugeiconsIcon
            icon={ShoppingBasket01Icon}
            className="size-10 text-primary"
            strokeWidth={1.5}
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
          className="transition-luxury hover:bg-primary-dark rounded-full bg-primary px-8 py-3 font-semibold text-white"
        >
          Explorar catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="mb-10 font-serif text-4xl font-bold text-foreground">
        Mi Carrito
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* lista de items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} variant="expanded" />
            ))}
          </div>

          <div className="mt-8 flex justify-start">
            <Button
              variant="ghost"
              onClick={() => clearCart()}
              disabled={isClearing}
              className="transition-luxury rounded-full text-foreground/40 hover:bg-destructive/5 hover:text-destructive"
            >
              {isClearing ? "Vaciando..." : "Vaciar carrito"}
            </Button>
          </div>
        </div>

        {/* resumen */}
        <div className="lg:col-span-1">
          <div className="glass shadow-floating sticky top-28 flex flex-col gap-6 rounded-[2rem] p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Resumen
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-foreground/60">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-foreground/60">
                <span>Envío</span>
                <span className="font-medium text-primary">Gratis</span>
              </div>
              <div className="mt-2 h-px bg-border" />
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="transition-luxury hover:bg-primary-dark shadow-luxury mt-4 flex items-center justify-center gap-2 rounded-full bg-primary py-4 font-bold text-white active:scale-95"
            >
              Proceder al pago
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-5"
                strokeWidth={2}
              />
            </button>

            <p className="text-center text-xs text-foreground/40">
              Paga de forma segura con Mercado Pago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
