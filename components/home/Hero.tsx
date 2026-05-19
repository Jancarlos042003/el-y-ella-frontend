"use client"

import Image from "next/image"
import { HeroCard } from "./parts/HeroCard"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-5.5rem)] overflow-hidden">
      {/* ══════════════════════════════════════════
          MOBILE / TABLET  (< lg)
      ══════════════════════════════════════════ */}
      <div className="relative flex min-h-[calc(100svh-5.5rem)] flex-col lg:hidden">
        <Image
          src="/images/mobile-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* scrim superior */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/80 via-white/20 to-transparent dark:from-background/80 dark:via-background/20" />

        {/* card glass mobile */}
        <HeroCard className="relative z-10 mx-4 mt-6" />

        <div className="flex-1" />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP  (lg+)
      ══════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <Image
          src="/images/bg-hero-bouquet.png"
          alt="Bouquet de rosas premium"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-[90rem] items-center px-4 py-16 md:px-6">
          <HeroCard isDesktop />
        </div>
      </div>
    </section>
  )
}
