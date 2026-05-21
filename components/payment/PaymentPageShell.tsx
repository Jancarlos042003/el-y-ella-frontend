type PaymentPageShellProps = {
  children: React.ReactNode
}

export function PaymentPageShell({ children }: PaymentPageShellProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[24rem] bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">{children}</div>
    </div>
  )
}
