import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/lib/utils'

type PaymentStatusHeaderProps = {
  eyebrow: string
  title: string
  description: string
  icon: Parameters<typeof HugeiconsIcon>[0]['icon']
  tone?: 'success' | 'pending' | 'error'
}

const toneClasses = {
  success: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-300',
  pending: 'bg-amber-500/12 text-amber-600 dark:text-amber-300',
  error: 'bg-rose-500/12 text-rose-600 dark:text-rose-300',
}

export function PaymentStatusHeader({
  eyebrow,
  title,
  description,
  icon,
  tone = 'success',
}: PaymentStatusHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div
        className={cn(
          'flex size-16 items-center justify-center rounded-full',
          toneClasses[tone]
        )}
      >
        <HugeiconsIcon icon={icon} className="size-8" strokeWidth={1.6} />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
          {eyebrow}
        </p>
        <h1 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}
