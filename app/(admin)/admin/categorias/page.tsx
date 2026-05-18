'use client'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  PlusSignIcon,
  PencilEdit01Icon,
  Delete01Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CategoriasFormDialog } from '@/components/admin/CategoriasFormDialog'
import { useCategorias } from '@/hooks/useCategorias'
import { useEliminarCategoria } from '@/hooks/useAdminCategorias'
import type { CategoryResponse } from '@/types/flores.types'

export default function AdminCategoriasPage() {
  const [dialogCategoria, setDialogCategoria] = useState<
    CategoryResponse | 'nueva' | null
  >(null)
  const [categoriaAEliminar, setCategoriaAEliminar] =
    useState<CategoryResponse | null>(null)

  const { data: categorias = [], isLoading } = useCategorias()
  const eliminarCategoria = useEliminarCategoria()

  const confirmarEliminar = () => {
    if (!categoriaAEliminar) return
    eliminarCategoria.mutate(categoriaAEliminar.id, {
      onSuccess: () => setCategoriaAEliminar(null),
    })
  }

  return (
    <>
      <div className="space-y-5">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Categorías</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {categorias.length} categorías en el sistema
            </p>
          </div>
          <Button onClick={() => setDialogCategoria('nueva')}>
            <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" strokeWidth={2} />
            Nueva categoría
          </Button>
        </div>

        {/* Tabla */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 3 }).map((__, j) => (
                      <TableCell key={j}>
                        <div className="h-4 rounded bg-muted animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : categorias.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    No hay categorías aún
                  </TableCell>
                </TableRow>
              ) : (
                categorias.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {cat.id}
                    </TableCell>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setDialogCategoria(cat)}
                          title="Editar"
                        >
                          <HugeiconsIcon
                            icon={PencilEdit01Icon}
                            size={16}
                            strokeWidth={1.5}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setCategoriaAEliminar(cat)}
                          title="Eliminar"
                          className="hover:text-destructive hover:bg-destructive/10"
                        >
                          <HugeiconsIcon
                            icon={Delete01Icon}
                            size={16}
                            strokeWidth={1.5}
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog crear / editar */}
      <CategoriasFormDialog
        categoria={
          dialogCategoria === 'nueva'
            ? null
            : (dialogCategoria as CategoryResponse | null)
        }
        abierto={dialogCategoria !== null}
        onCerrar={() => setDialogCategoria(null)}
      />

      {/* AlertDialog confirmar eliminación */}
      <AlertDialog
        open={categoriaAEliminar !== null}
        onOpenChange={(v) => !v && setCategoriaAEliminar(null)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar categoría?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente{' '}
              <strong className="text-foreground">{categoriaAEliminar?.name}</strong>{' '}
              y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={confirmarEliminar}
              disabled={eliminarCategoria.isPending}
            >
              {eliminarCategoria.isPending ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
