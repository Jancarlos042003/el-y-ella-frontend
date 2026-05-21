import { Suspense } from 'react'
import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Iniciar sesión — El y Ella Detalles",
}

export default function LoginPage() {
  // Suspense es obligatorio: LoginForm usa useSearchParams(),
  // sin este boundary Next.js haría CSR bailout y perdería ?redirect= en el hydration.
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
