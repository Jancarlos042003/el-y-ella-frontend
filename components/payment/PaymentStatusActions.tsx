import Link from 'next/link'

import { Button } from '@/components/ui/button'

type PaymentStatusAction = {
  href: string
  label: string
  variant?: 'default' | 'outline' | 'ghost'
}

type PaymentStatusActionsProps = {
  actions: PaymentStatusAction[]
}

export function PaymentStatusActions({ actions }: PaymentStatusActionsProps) {
  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      {actions.map((action) => (
        <Button
          key={`${action.href}-${action.label}`}
          asChild
          variant={action.variant ?? 'default'}
          size="lg"
          className="rounded-full px-6"
        >
          <Link href={action.href}>{action.label}</Link>
        </Button>
      ))}
    </div>
  )
}
