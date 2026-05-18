import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

// Redirige al login en 401, excepto en /auth/me (puede ser 401 cuando no hay sesión)
api.interceptors.response.use(null, (error) => {
  const url: string = error.config?.url ?? ''
  if (error.response?.status === 401 && !url.includes('/auth/me')) {
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default api
