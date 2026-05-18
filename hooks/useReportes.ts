'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/api'

export function useDescargarReporteUsuarios() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.get('/api/v1/reports/users', {
        responseType: 'blob',
      })
      // Crea un enlace temporal para disparar la descarga en el navegador
      const url = URL.createObjectURL(response.data as Blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte-usuarios.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    onSuccess: () => toast.success('Reporte descargado correctamente'),
    onError: () => toast.error('No se pudo generar el reporte'),
  })
}
