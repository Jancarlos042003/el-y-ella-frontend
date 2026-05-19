"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FlowerIcon,
  EyeIcon,
  ViewOffSlashIcon,
  Loading03Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons'

import { registerSchema } from '@/schemas/auth.schemas'
import type { RegisterInput } from '@/types/auth.types'
import { useRegister } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate, isPending } = useRegister()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>()

  function onSubmit(data: RegisterInput) {
    const result = registerSchema.safeParse(data)
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterInput
        setError(field, { message: issue.message })
      }
      return
    }

    mutate(result.data, {
      onError: (error: unknown) => {
        const msg = (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message
        toast.error(msg ?? 'No se pudo crear la cuenta. Inténtalo de nuevo.')
      },
    })
  }

  const inputClass = cn(
    "rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none transition-luxury",
    "placeholder:text-foreground/40 focus:border-primary",
    "dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-primary"
  )

  const labelClass = "text-sm font-medium text-foreground/80 dark:text-white/80"

  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] items-center justify-center overflow-hidden py-8">
      {/* fondo floral */}
      <Image
        src="/images/bg-hero-bouquet.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-background/65 backdrop-blur-sm dark:bg-background/75" />

      {/* glass card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex flex-col gap-6 rounded-[2rem] glass p-8 shadow-floating">
          {/* logo */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/15">
              <HugeiconsIcon
                icon={FlowerIcon}
                className="size-6 text-primary"
                strokeWidth={1.5}
              />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground dark:text-white">
              Crear cuenta
            </h1>
            <p className="text-sm text-foreground/60 dark:text-white/60">
              ¿Ya tienes cuenta?{' '}
              <Link
                href={ROUTES.login}
                className="font-semibold text-primary hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            {/* nombre */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>
                Nombre completo
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="María García"
                {...register('name')}
                className={inputClass}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* email */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                {...register('email')}
                className={inputClass}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* contraseña */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  {...register('password')}
                  className={cn(inputClass, "w-full pr-11")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary dark:text-white/40"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffSlashIcon : EyeIcon}
                    className="size-5"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* campos opcionales */}
            <details className="group">
              <summary className="cursor-pointer select-none text-sm font-medium text-primary hover:underline list-none">
                + Agregar dirección y teléfono (opcional)
              </summary>
              <div className="mt-3 flex flex-col gap-4">
                {/* dirección */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>
                    Dirección
                    <span className="ml-1 text-xs text-foreground/40 dark:text-white/40">
                      (opcional)
                    </span>
                  </label>
                  <input
                    type="text"
                    autoComplete="street-address"
                    placeholder="Av. Principal 123, Lima"
                    {...register('address')}
                    className={inputClass}
                  />
                </div>

                {/* teléfono */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>
                    Teléfono
                    <span className="ml-1 text-xs text-foreground/40 dark:text-white/40">
                      (opcional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+51 999 999 999"
                    {...register('phone')}
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </details>

            {/* submit */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-luxury hover:bg-primary-dark disabled:opacity-60"
            >
              {isPending ? (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="size-4 animate-spin"
                  strokeWidth={1.5}
                />
              ) : (
                <>
                  Crear cuenta
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
