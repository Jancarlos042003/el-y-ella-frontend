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

import { loginSchema } from '@/schemas/auth.schemas'
import type { LoginInput } from '@/types/auth.types'
import { useLogin } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>()

  function onSubmit(data: LoginInput) {
    const result = loginSchema.safeParse(data)
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginInput
        setError(field, { message: issue.message })
      }
      return
    }

    mutate(result.data, {
      onError: (error: unknown) => {
        const msg = (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message
        toast.error(msg ?? 'Email o contraseña incorrectos.')
      },
    })
  }

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
      <div className="absolute inset-0 bg-[#f9f5f0]/65 backdrop-blur-sm dark:bg-[#1a0a0f]/75" />

      {/* glass card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/45 bg-white/80 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-[16px] dark:border-[#ff69b4]/15 dark:bg-[#1a0a0f]/80">
          {/* logo */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#ff69b4]/15">
              <HugeiconsIcon
                icon={FlowerIcon}
                className="size-6 text-[#ff69b4]"
                strokeWidth={1.5}
              />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#151515] dark:text-white">
              Iniciar sesión
            </h1>
            <p className="text-sm text-[#151515]/60 dark:text-white/60">
              ¿No tienes cuenta?{' '}
              <Link
                href={ROUTES.register}
                className="font-semibold text-[#ff69b4] hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </div>

          {/* formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            {/* email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#151515]/80 dark:text-white/80">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                {...register('email')}
                className="rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-[#151515]/40 transition-colors focus:border-[#ff69b4] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#ff69b4]"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* contraseña */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#151515]/80 dark:text-white/80">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 pr-11 text-sm outline-none placeholder:text-[#151515]/40 transition-colors focus:border-[#ff69b4] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#ff69b4]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#151515]/40 hover:text-[#ff69b4] dark:text-white/40"
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
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-[#ff69b4] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff69b4]/90 disabled:opacity-60"
            >
              {isPending ? (
                <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" strokeWidth={1.5} />
              ) : (
                <>
                  Ingresar
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
