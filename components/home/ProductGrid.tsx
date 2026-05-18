"use client"

import { motion } from 'motion/react'
import { ProductCard } from '@/components/products/ProductCard'
import type { FlowerResponse } from '@/types/flores.types'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

interface ProductGridProps {
  flowers: FlowerResponse[]
  title?: string
}

export function ProductGrid({ flowers, title }: ProductGridProps) {
  if (!flowers.length) return null

  return (
    <section className="mx-auto max-w-[90rem] px-4 py-12 md:px-6">
      {title && (
        <h2 className="mb-8 font-serif text-2xl font-bold text-[#151515] dark:text-white">
          {title}
        </h2>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {flowers.map((flower, i) => (
          <motion.div key={flower.id} variants={item}>
            <ProductCard
              flower={flower}
              badge={i < 3 ? 'Más vendido' : undefined}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
