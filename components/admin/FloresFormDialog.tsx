'use client'

import { useState } from 'react'
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
import { flowerRequestSchema } from '@/schemas/admin.schemas'
import type { FlowerRequestInput } from '@/types/admin.types'
import type { FlowerResponse } from '@/types/flores.types'
import { useCategorias } from '@/hooks/useCategorias'
import { useCrearFlor, useActualizarFlor } from '@/hooks/useAdminFlores'

interface FloresFormDialogProps {
  /** null → crear nueva flor | FlowerResponse → editar */
  flor: FlowerResponse | null
  abierto: boolean
  onCerrar: () => void
}

/* Cuerpo del formulario como componente separado.
   El `key` en FloresFormDialog resetea automáticamente el estado aquí
   cada vez que cambia la flor seleccionada, sin necesidad de useEffect. */
function FloresFormBody({
  flor,
  onCerrar,
}: {
  flor: FlowerResponse | null
  onCerrar: () => void
}) {
  const esEdicion = flor !== null
  const { data: categorias = [] } = useCategorias()

  // Inicialización lazy: estado se crea una vez al montar; el key externo resetea el componente
  const [categoryIds, setCategoryIds] = useState<number[]>(
    () => flor?.categories.map((c) => c.id) ?? []
  )

  const crearFlor = useCrearFlor()
  const actualizarFlor = useActualizarFlor()
  const isPending = crearFlor.isPending || actualizarFlor.isPending

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FlowerRequestInput>({
    defaultValues: {
      name: flor?.name ?? '',
      description: flor?.description ?? '',
      price: flor?.price,
      stock: flor?.stock ?? 0,
      imageUrl: flor?.imageUrl ?? '',
    },
  })

  const toggleCategoria = (id: number) =>
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )

  const onSubmit = handleSubmit((rawData) => {
    const payload = {
      ...rawData,
      description: rawData.description || undefined,
      imageUrl: rawData.imageUrl || undefined,
      categoryIds: categoryIds.length > 0 ? categoryIds : undefined,
    }

    const result = flowerRequestSchema.safeParse(payload)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FlowerRequestInput
        setError(field, { message: issue.message })
      }
      return
    }

    if (esEdicion) {
      actualizarFlor.mutate({ id: flor.id, data: result.data }, { onSuccess: onCerrar })
    } else {
      crearFlor.mutate(result.data, { onSuccess: onCerrar })
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Nombre *</label>
        <Input
          {...register('name')}
          placeholder="Ej. Rosa roja premium"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="Descripción opcional del producto"
          className="w-full rounded-2xl border border-input bg-input/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 resize-none"
        />
      </div>

      {/* Precio y Stock */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Precio (S/) *</label>
          <Input
            {...register('price')}
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            aria-invalid={!!errors.price}
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Stock</label>
          <Input {...register('stock')} type="number" min="0" placeholder="0" />
        </div>
      </div>

      {/* URL de imagen */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">URL de imagen</label>
        <Input
          {...register('imageUrl')}
          placeholder="https://res.cloudinary.com/..."
        />
      </div>

      {/* Categorías como pills seleccionables */}
      {categorias.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Categorías</label>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => {
              const seleccionada = categoryIds.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategoria(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    seleccionada
                      ? 'bg-primary text-white border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <DialogFooter className="pt-2">
        <Button type="button" variant="outline" onClick={onCerrar} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear flor'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function FloresFormDialog({ flor, abierto, onCerrar }: FloresFormDialogProps) {
  return (
    <Dialog open={abierto} onOpenChange={(v) => !v && onCerrar()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{flor ? 'Editar flor' : 'Nueva flor'}</DialogTitle>
        </DialogHeader>
        {/* key resetea todo el estado del formulario al cambiar la flor */}
        <FloresFormBody key={flor?.id ?? 'nueva'} flor={flor} onCerrar={onCerrar} />
      </DialogContent>
    </Dialog>
  )
}
