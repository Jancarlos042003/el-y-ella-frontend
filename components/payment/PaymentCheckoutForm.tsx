'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CreditCardIcon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'

import { checkoutFormSchema, checkoutRequestSchema, problemDetailSchema } from '@/schemas/pago.schemas'
import { useCarrito } from '@/hooks/useCarrito'
import { useCheckout } from '@/hooks/usePago'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'
import type { CheckoutFormInput, CheckoutInput } from '@/types/pago.types'
import type { AuthResponse } from '@/types/auth.types'

type PaymentCheckoutFormProps = {
  user?: AuthResponse
}

const inputClass = cn(
  'rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none transition-luxury',
  'placeholder:text-foreground/40 focus:border-primary',
  'dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-primary'
)

const labelClass = 'text-sm font-medium text-foreground/80 dark:text-white/80'

export function PaymentCheckoutForm({ user }: PaymentCheckoutFormProps) {
  // Se genera una sola vez por sesión de checkout para que los reintentos
  // sean reconocidos por el backend y no creen órdenes duplicadas.
  const idempotencyKey = useRef(crypto.randomUUID())

  const { mutate, isPending } = useCheckout()
  const { data: cart = [] } = useCarrito()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormInput>({
    defaultValues: {
      fullName: user?.name ?? '',
      email: user?.email ?? '',
      phone: '',
      shippingAddress: '',
      city: '',
      state: '',
      postalCode: '',
    },
  })

  useEffect(() => {
    reset((currentValues) => ({
      ...currentValues,
      fullName: currentValues.fullName || user?.name || '',
      email: currentValues.email || user?.email || '',
    }))
  }, [reset, user?.email, user?.name])

  function onSubmit(data: CheckoutFormInput) {
    const result = checkoutFormSchema.safeParse(data)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CheckoutFormInput
        setError(field, { message: issue.message })
      }
      return
    }

    if (cart.length === 0) {
      toast.error('Tu carrito está vacío. Agrega productos antes de iniciar el pago.')
      return
    }

    // El backend solo necesita los opcionales cuando realmente fueron completados.
    const shippingData = Object.fromEntries(
      Object.entries(result.data).filter(([, value]) => value !== '')
    )

    const payloadResult = checkoutRequestSchema.safeParse({
      ...shippingData,
      items: cart.map((item) => ({
        flowerId: item.flowerId,
        quantity: item.quantity,
      })),
      idempotencyKey: idempotencyKey.current,
    })

    if (!payloadResult.success) {
      toast.error('No se pudo preparar el checkout. Revisa tu carrito e inténtalo nuevamente.')
      return
    }

    const payload: CheckoutInput = payloadResult.data

    mutate(payload, {
      onSuccess: ({ initPoint }) => {
        window.location.href = initPoint
      },
      onError: (error: unknown) => {
        const problem = problemDetailSchema.safeParse(
          (error as AxiosError<unknown>)?.response?.data
        )
        const message = problem.success ? problem.data.detail || problem.data.title : undefined

        toast.error(message ?? 'No se pudo iniciar el pago. Inténtalo nuevamente.')
      },
    })
  }

  return (
    <section className="glass rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">
            Checkout seguro
          </p>
          <h1 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Confirma tus datos antes de pagar
          </h1>
        </div>

        <Link
          href={ROUTES.carrito}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/65 transition-luxury hover:text-primary"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" strokeWidth={1.6} />
          Volver al carrito
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5 md:grid-cols-2" noValidate>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelClass}>Nombre completo</label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Tu nombre y apellido"
            {...register('fullName')}
            className={inputClass}
          />
          {errors.fullName ? (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            {...register('email')}
            className={inputClass}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Teléfono</label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+51 999 999 999"
            {...register('phone')}
            className={inputClass}
          />
          {errors.phone ? <p className="text-xs text-destructive">{errors.phone.message}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelClass}>Dirección de envío</label>
          <input
            type="text"
            autoComplete="street-address"
            placeholder="Av., calle o referencia"
            {...register('shippingAddress')}
            className={inputClass}
          />
          {errors.shippingAddress ? (
            <p className="text-xs text-destructive">{errors.shippingAddress.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Ciudad</label>
          <input
            type="text"
            autoComplete="address-level2"
            placeholder="Lima"
            {...register('city')}
            className={inputClass}
          />
          {errors.city ? <p className="text-xs text-destructive">{errors.city.message}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Departamento / Estado</label>
          <input
            type="text"
            autoComplete="address-level1"
            placeholder="Lima"
            {...register('state')}
            className={inputClass}
          />
          {errors.state ? <p className="text-xs text-destructive">{errors.state.message}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Código postal</label>
          <input
            type="text"
            autoComplete="postal-code"
            placeholder="15001"
            {...register('postalCode')}
            className={inputClass}
          />
          {errors.postalCode ? (
            <p className="text-xs text-destructive">{errors.postalCode.message}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-primary/12 bg-primary/6 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-primary/12">
                <HugeiconsIcon icon={CreditCardIcon} className="size-5 text-primary" strokeWidth={1.6} />
              </div>
              <div>
                <p className="font-medium text-foreground">Pago procesado por Mercado Pago</p>
                <p className="mt-1 text-sm leading-6 text-foreground/60">
                  Tu pedido se crea en el backend y luego te redirigimos al checkout seguro para
                  completar el pago.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-luxury hover:bg-primary-dark disabled:opacity-60"
            >
              {isPending ? (
                <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" strokeWidth={1.6} />
              ) : (
                <>
                  Proceder a Mercado Pago
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={1.6} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
