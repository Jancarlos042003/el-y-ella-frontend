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
import { updateUserRequestSchema } from '@/schemas/admin.schemas'
import type { UpdateUserRequestInput, UserResponse } from '@/types/admin.types'
import { useActualizarUsuario } from '@/hooks/useAdminUsuarios'

interface UsuariosFormDialogProps {
  usuario: UserResponse | null
  abierto: boolean
  onCerrar: () => void
}

/* El key externo en UsuariosFormDialog resetea este componente al cambiar el usuario */
function UsuariosFormBody({
  usuario,
  onCerrar,
}: {
  usuario: UserResponse
  onCerrar: () => void
}) {
  const actualizarUsuario = useActualizarUsuario()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateUserRequestInput>({
    defaultValues: {
      name: usuario.name,
      address: usuario.address ?? '',
      phone: usuario.phone ?? '',
    },
  })

  const onSubmit = handleSubmit((rawData) => {
    const payload = {
      name: rawData.name || undefined,
      address: rawData.address || undefined,
      phone: rawData.phone || undefined,
    }

    const result = updateUserRequestSchema.safeParse(payload)
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof UpdateUserRequestInput
        setError(field, { message: issue.message })
      }
      return
    }

    actualizarUsuario.mutate(
      { id: usuario.id, data: result.data },
      { onSuccess: onCerrar },
    )
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
      {/* Info no editable */}
      <div className="rounded-xl bg-muted/50 px-4 py-3 flex flex-col gap-0.5">
        <p className="text-xs text-muted-foreground">Email (no modificable)</p>
        <p className="text-sm font-medium">{usuario.email}</p>
      </div>

      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Nombre</label>
        <Input
          {...register('name')}
          placeholder="Nombre completo"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Dirección */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Dirección</label>
        <Input
          {...register('address')}
          placeholder="Dirección de envío"
          aria-invalid={!!errors.address}
        />
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Teléfono</label>
        <Input
          {...register('phone')}
          placeholder="Ej. 987654321"
          maxLength={20}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <DialogFooter className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCerrar}
          disabled={actualizarUsuario.isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={actualizarUsuario.isPending}>
          {actualizarUsuario.isPending ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function UsuariosFormDialog({
  usuario,
  abierto,
  onCerrar,
}: UsuariosFormDialogProps) {
  return (
    <Dialog open={abierto} onOpenChange={(v) => !v && onCerrar()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
        </DialogHeader>
        {/* key resetea el formulario al cambiar el usuario seleccionado */}
        {usuario && (
          <UsuariosFormBody
            key={usuario.id}
            usuario={usuario}
            onCerrar={onCerrar}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
