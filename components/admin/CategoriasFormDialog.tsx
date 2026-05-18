'use client'

import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { categoryRequestSchema } from '@/schemas/admin.schemas'
import type { CategoryRequestInput } from '@/types/admin.types'
import type { CategoryResponse } from '@/types/flores.types'
import { useCrearCategoria, useActualizarCategoria } from '@/hooks/useAdminCategorias'

interface CategoriasFormDialogProps {
  /** null → crear nueva | CategoryResponse → editar */
  categoria: CategoryResponse | null
  abierto: boolean
  onCerrar: () => void
}

/* El key externo en CategoriasFormDialog resetea este componente al cambiar la categoría */
function CategoriasFormBody({
  categoria,
  onCerrar,
}: {
  categoria: CategoryResponse | null
  onCerrar: () => void
}) {
  const esEdicion = categoria !== null
  const crearCategoria = useCrearCategoria()
  const actualizarCategoria = useActualizarCategoria()
  const isPending = crearCategoria.isPending || actualizarCategoria.isPending

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryRequestInput>({
    defaultValues: { name: categoria?.name ?? '' },
  })

  const onSubmit = handleSubmit((rawData) => {
    const result = categoryRequestSchema.safeParse(rawData)
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CategoryRequestInput
        setError(field, { message: issue.message })
      }
      return
    }
    if (esEdicion) {
      actualizarCategoria.mutate(
        { id: categoria.id, data: result.data },
        { onSuccess: onCerrar },
      )
    } else {
      crearCategoria.mutate(result.data, { onSuccess: onCerrar })
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Nombre *</label>
        <Input
          {...register('name')}
          placeholder="Ej. Rosas"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <DialogFooter className="pt-2">
        <Button type="button" variant="outline" onClick={onCerrar} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? 'Guardando...'
            : esEdicion
              ? 'Guardar cambios'
              : 'Crear categoría'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function CategoriasFormDialog({
  categoria,
  abierto,
  onCerrar,
}: CategoriasFormDialogProps) {
  return (
    <Dialog open={abierto} onOpenChange={(v) => !v && onCerrar()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{categoria ? 'Editar categoría' : 'Nueva categoría'}</DialogTitle>
        </DialogHeader>
        {/* key resetea el estado del formulario al cambiar la categoría seleccionada */}
        <CategoriasFormBody
          key={categoria?.id ?? 'nueva'}
          categoria={categoria}
          onCerrar={onCerrar}
        />
      </DialogContent>
    </Dialog>
  )
}
