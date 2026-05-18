'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { Download01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { useDescargarReporteUsuarios } from '@/hooks/useReportes'

export default function AdminReportesPage() {
  const descargarUsuarios = useDescargarReporteUsuarios()

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Generación y descarga de reportes en PDF
        </p>
      </div>

      {/* Listado de reportes disponibles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Reporte de usuarios */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-foreground">Reporte de Usuarios</p>
            <p className="text-sm text-muted-foreground">
              Listado completo de usuarios registrados en el sistema, incluyendo
              nombre, email, teléfono y fecha de registro.
            </p>
          </div>
          <div className="mt-auto">
            <Button
              onClick={() => descargarUsuarios.mutate()}
              disabled={descargarUsuarios.isPending}
              className="w-full"
            >
              <HugeiconsIcon
                icon={Download01Icon}
                data-icon="inline-start"
                strokeWidth={2}
              />
              {descargarUsuarios.isPending ? 'Generando PDF...' : 'Descargar PDF'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
