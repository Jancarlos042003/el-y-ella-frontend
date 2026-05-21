import axios from 'axios'

const api = axios.create({
  // baseURL vacío → URLs relativas al origen del browser → pasan por el
  // rewrite de next.config.mjs que proxea al backend de forma transparente.
  // api.server.ts conserva la URL absoluta para llamadas server-to-server.
  baseURL: '',
  withCredentials: true,
})

// Redirige al login en 401, excepto en /auth/me (puede ser 401 cuando no hay sesión)
api.interceptors.response.use(null, (error) => {
  const url: string = error.config?.url ?? ''
  
  if (error.response?.status === 401 && !url.includes('/auth/me')) {
    if (typeof window !== 'undefined') {
      const { pathname, search } = window.location
      
      // Evitar redirigir si ya está en login o register para no limpiar los searchParams actuales
      const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
      
      if (!isAuthPage) {
        const redirectUrl = encodeURIComponent(pathname + search)
        window.location.href = `/login?redirect=${redirectUrl}`
      }
    }
  }
  return Promise.reject(error)
})

export default api
