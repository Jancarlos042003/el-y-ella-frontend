import { cookies } from 'next/headers'

const BASE = process.env.NEXT_PUBLIC_API_URL!

export async function serverFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Cookie: `jwt=${jwt}` } : {}),
      ...options?.headers,
    },
  })

  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json() as Promise<T>
}
