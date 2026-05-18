"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DeliveryTruck01Icon,
  Shield01Icon,
  FlowerIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

const TRUST_BADGES = [
  { icon: DeliveryTruck01Icon, label: "Envíos", sub: "a todo el país" },
  { icon: Shield01Icon, label: "Pago", sub: "seguro" },
  { icon: FlowerIcon, label: "Flores", sub: "frescas" },
]

/* etiquetas cortas solo para mobile */
const TRUST_BADGES_MOBILE = [
  { icon: DeliveryTruck01Icon, label: "Envío" },
  { icon: Shield01Icon, label: "Pago" },
  { icon: FlowerIcon, label: "Frescura" },
]

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-5.5rem)] overflow-hidden">
      {/* ══════════════════════════════════════════
          MOBILE / TABLET  (< lg)
          Bouquet PNG + fondo rosa + card inferior
      ══════════════════════════════════════════ */}
      <div className="relative flex min-h-[calc(100svh-5.5rem)] flex-col lg:hidden">
        {/* fondo foto completo */}
        <Image
          src="/images/bg-hero-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* espaciador — empuja el contenido al fondo */}
        <div className="flex-1" />

        {/* zona card: tres capas — mx-4/mb-6 da el efecto flotante */}
        <div className="relative z-10 mx-4 mb-6">
          {/* capa 1: glass card — anima hacia arriba
              72% opacidad + backdrop-blur-[12px] = glassmorphism del design system */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="absolute inset-0 z-[1] rounded-[2rem] border border-white/50 bg-white/[72%] shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-[12px] dark:border-white/10 dark:bg-[#1a0a0f]/65"
          />

          {/* capa 2: bouquet — anima desde arriba (opuesto al card)
              -top-[10rem] sube el ramo 160px; h-[20rem] = 320px → solapa 160px en la card
              w-64 = 256px cabe en cualquier móvil sin desbordarse */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="pointer-events-none absolute -top-40 left-1/2 z-[5] h-[13rem] w-64 -translate-x-1/2"
          >
            <Image
              src="/images/ramo-flores-banner.png"
              alt="Bouquet de rosas"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </motion.div>

          {/* capa 3: texto — anima hacia arriba, encima del bouquet
              pt-44 = 176px > 160px de solapado → el texto empieza justo bajo el jarrón */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut" as const,
              delay: 0.05,
            }}
            className="relative z-[10] flex flex-col gap-3.5 rounded-[2rem] p-6"
          >
            {/* badge */}
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#ff69b4]/30 bg-[#ff69b4]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#ff69b4] uppercase">
              ⭐ Envío el mismo día
            </span>

            {/* heading */}
            <div>
              <h1 className="font-serif text-3xl leading-tight font-bold text-[#151515]">
                Flores elegantes para{" "}
                <span className="text-[#ff69b4]">momentos especiales</span>
              </h1>
              <div className="mt-3 h-px w-14 bg-[#ff69b4]" />
            </div>

            {/* descripción */}
            <p className="text-sm leading-relaxed text-[#151515]/65">
              Bouquets premium elaborados con flores frescas y entregas que
              enamoran.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="flex items-center gap-2 rounded-full bg-[#ff69b4] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff69b4]/90"
              >
                Comprar ahora
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-4"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            {/* trust badges mobile — icono + etiqueta corta con divisores */}
            <div className="flex items-center divide-x divide-black/10 border-t border-black/8 pt-4">
              {TRUST_BADGES_MOBILE.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-1 items-center justify-center gap-1.5 px-2 text-xs"
                >
                  <HugeiconsIcon
                    icon={icon}
                    className="size-5 shrink-0 text-[#ff69b4]"
                    strokeWidth={1.5}
                  />
                  <span className="font-medium text-[#151515]">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP  (lg+)
          Imagen completa de fondo + glass card izquierda
      ══════════════════════════════════════════ */}
      <Image
        src="/images/bg-hero-bouquet.png"
        alt="Bouquet de rosas premium"
        fill
        priority
        className="hidden object-cover object-center lg:block"
        sizes="100vw"
      />

      <div className="relative mx-auto hidden min-h-[calc(100svh-5.5rem)] w-full max-w-[90rem] items-center px-4 py-16 md:px-6 lg:flex">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="flex max-w-xl flex-col gap-7 rounded-[2rem] border border-white/50 bg-white/55 p-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-[14px] dark:border-white/10 dark:bg-[#1a0a0f]/65"
        >
          {/* badge */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#ff69b4]/30 bg-[#ff69b4]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#ff69b4] uppercase"
          >
            ⭐ Envío el mismo día
          </motion.span>

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl leading-tight font-bold text-[#151515] md:text-5xl dark:text-white">
              Flores elegantes para{" "}
              <span className="text-[#ff69b4]">momentos especiales</span>
            </h1>
            <div className="mt-3 h-px w-16 bg-[#ff69b4]" />
          </motion.div>

          {/* descripción */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[15px] leading-relaxed text-[#151515]/65 dark:text-white/65"
          >
            Bouquets premium elaborados con flores frescas y entregas que
            enamoran.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/catalogo"
              className="flex items-center gap-2 rounded-full bg-[#ff69b4] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff69b4]/90"
            >
              Comprar ahora
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4"
                strokeWidth={1.5}
              />
            </Link>
          </motion.div>

          {/* trust badges desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-center border-t border-black/8 pt-4 dark:border-white/8"
          >
            {TRUST_BADGES.map(({ icon, label, sub }, i) => (
              <div
                key={label}
                className="flex flex-1 items-center gap-2 text-xs text-[#151515]/60 dark:text-white/60"
              >
                {i > 0 && (
                  <div className="mr-2 h-8 w-px shrink-0 bg-black/10 dark:bg-white/10" />
                )}
                <HugeiconsIcon
                  icon={icon}
                  className="size-5 shrink-0 text-[#ff69b4]"
                  strokeWidth={1.5}
                />
                <span>
                  <strong className="block font-semibold text-[#151515] dark:text-white">
                    {label}
                  </strong>
                  {sub}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
