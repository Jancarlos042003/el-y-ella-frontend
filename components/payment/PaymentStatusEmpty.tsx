import Link from 'next/link'

import { Button } from '@/components/ui/button'

type PaymentStatusEmptyProps = {
  title: string
  description: string
  href: string
  actionLabel: string
}

export function PaymentStatusEmpty({
  title,
  description,
  href,
  actionLabel,
}: PaymentStatusEmptyProps) {
  return (
    <section className="glass mx-auto max-w-3xl rounded-[2rem] px-6 py-12 text-center md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
        Información incompleta
      </p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-foreground/65 md:text-base">
        {description}
      </p>

      <Button asChild size="lg" className="mt-8 rounded-full px-6">
        <Link href={href}>{actionLabel}</Link>
      </Button>
    </section>
  )
}
