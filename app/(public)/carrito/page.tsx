"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ShoppingCart01Icon,
  Delete02Icon,
  Add01Icon,
  MinusSignIcon,
  ArrowRight01Icon,
  ShoppingBasket01Icon,
} from '@hugeicons/core-free-icons'
import { toast } from 'sonner'

import { useCarrito, useUpdateCartItem, useRemoveCartItem, useClearCart } from '@/hooks/useCarrito'
import { useMe } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function CarritoPage() {
  const router = useRouter()
  const { data: cart = [], isLoading } = useCarrito()
  const { data: user } = useMe()
  const { mutate: updateItem } = useUpdateCartItem()
  const { mutate: removeItem } = useRemoveCartItem()
  const { mutate: clearCart, isPending: isClearing } = useClearCart()

  const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0)
  const total = subtotal // Por ahora sin envío ni impuestos complejos

  function handleUpdateQuantity(flowerId: number, id: number, currentQty: number, delta: number) {
    const newQty = currentQty + delta
    if (newQty < 1) return

    updateItem({
      id,
      data: { flowerId, quantity: newQty },
    })
  }

  function handleRemove(id: number) {
    removeItem(id, {
      onSuccess: () => toast.success('Producto eliminado'),
    })
  }

  function handleCheckout() {
    if (!user) {
      toast.info('Inicia sesión para finalizar tu compra')
      router.push(ROUTES.login)
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
          <HugeiconsIcon icon={ShoppingBasket01Icon} className="size-10 text-primary" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-bold text-foreground">Tu carrito está vacío</h1>
          <p className="text-foreground/60">¿Aún no has elegido el detalle perfecto?</p>
        </div>
        <Link
          href={ROUTES.home}
          className="rounded-full bg-primary px-8 py-3 font-semibold text-white transition-luxury hover:bg-primary-dark"
        >
          Explorar catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="mb-10 font-serif text-4xl font-bold text-foreground">Mi Carrito</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* lista de items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 transition-luxury hover:shadow-luxury sm:flex-row sm:items-center"
              >
                {/* imagen */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl sm:w-32">
                  <Image
                    src={item.flowerImageUrl || '/images/ramo-flores-banner.png'}
                    alt={item.flowerName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* info */}
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {item.flowerName}
                  </h3>
                  <p className="text-sm text-foreground/60">Precio unitario: ${item.price.toLocaleString()}</p>
                </div>

                {/* controles */}
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
                    <button
                      onClick={() => handleUpdateQuantity(item.flowerId, item.id, item.quantity, -1)}
                      className="flex size-8 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <HugeiconsIcon icon={MinusSignIcon} className="size-4" strokeWidth={2} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.flowerId, item.id, item.quantity, 1)}
                      className="flex size-8 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={2} />
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-lg font-bold text-primary">
                      ${item.subtotal.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleRemove(user ? item.id : item.flowerId)}
                      className="text-foreground/40 transition-colors hover:text-destructive"
                      title="Eliminar item"
                    >
                      <HugeiconsIcon icon={Delete02Icon} className="size-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-start">
            <Button
              variant="ghost"
              onClick={() => clearCart()}
              disabled={isClearing}
              className="rounded-full text-foreground/40 transition-luxury hover:bg-destructive/5 hover:text-destructive"
            >
              {isClearing ? 'Vaciando...' : 'Vaciar carrito'}
            </Button>
          </div>
        </div>

        {/* resumen */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 flex flex-col gap-6 rounded-[2rem] glass p-8 shadow-floating">
            <h2 className="font-serif text-2xl font-bold text-foreground">Resumen</h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-foreground/60">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-foreground/60">
                <span>Envío</span>
                <span className="text-primary font-medium">Gratis</span>
              </div>
              <div className="mt-2 h-px bg-border" />
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary py-4 font-bold text-white transition-luxury hover:bg-primary-dark shadow-luxury active:scale-95"
            >
              Proceder al pago
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-5" strokeWidth={2} />
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
