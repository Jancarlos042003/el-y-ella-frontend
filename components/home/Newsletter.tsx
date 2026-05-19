"use client"

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Mail01Icon, ArrowRight01Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[90rem] px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] glass p-8 text-center shadow-floating md:p-12">
          {/* ícono */}
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/15">
            <HugeiconsIcon icon={Mail01Icon} className="size-7 text-primary" strokeWidth={1.5} />
          </div>

          {/* título */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground dark:text-white md:text-3xl">
              Suscríbete y recibe{' '}
              <span className="text-primary">ofertas exclusivas</span>
            </h2>
            <p className="mt-2 text-sm text-foreground/60 dark:text-white/60">
              Descuentos, novedades y promociones especiales directo a tu correo.
            </p>
          </div>

          {/* formulario */}
          {submitted ? (
            <div className="flex items-center gap-2 rounded-full bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-5" strokeWidth={1.5} />
              ¡Gracias! Te enviaremos las mejores ofertas.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className={cn(
                  "flex-1 rounded-full border border-border bg-white/80 px-5 py-3 text-sm outline-none transition-luxury",
                  "placeholder:text-foreground/40 focus:border-primary dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                )}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-luxury hover:bg-primary-dark shrink-0"
              >
                Suscribirme
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={1.5} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
