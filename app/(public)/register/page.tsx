import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Crear cuenta — El y Ella Detalles',
}

export default function RegisterPage() {
  return <RegisterForm />
}
