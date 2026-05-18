'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  PlusSignIcon,
  PencilEdit01Icon,
  Delete01Icon,
  Image01Icon,
  Search01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
import { FloresFormDialog } from '@/components/admin/FloresFormDialog'
import { useFlores } from '@/hooks/useFlores'
import { useEliminarFlor } from '@/hooks/useAdminFlores'
import type { FlowerResponse } from '@/types/flores.types'

const PAGE_SIZE = 10

export default function AdminFloresPage() {
  const [page, setPage] = useState(0)
  const [inputBusqueda, setInputBusqueda] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [dialogFlor, setDialogFlor] = useState<FlowerResponse | 'nueva' | null>(null)
  const [florAEliminar, setFlorAEliminar] = useState<FlowerResponse | null>(null)

  const { data, isLoading } = useFlores({
    q: busqueda || undefined,
    page,
    size: PAGE_SIZE,
  })
  const eliminarFlor = useEliminarFlor()

  const flores = data?.content ?? []
  const totalPages = data?.totalPages ?? 0

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault()
    setBusqueda(inputBusqueda)
    setPage(0)
  }

  const confirmarEliminar = () => {
    if (!florAEliminar) return
    eliminarFlor.mutate(florAEliminar.id, {
      onSuccess: () => setFlorAEliminar(null),
    })
  }

  return (
    <>
      <div className="space-y-5">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Flores</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {data?.totalElements ?? 0} productos en el catálogo
            </p>
          </div>
          <Button onClick={() => setDialogFlor('nueva')}>
            <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" strokeWidth={2} />
            Nueva flor
          </Button>
        </div>

        {/* Buscador */}
        <form onSubmit={handleBuscar} className="flex gap-2 max-w-sm">
          <div className="relative flex-1">
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              strokeWidth={1.5}
            />
            <Input
              value={inputBusqueda}
              onChange={(e) => setInputBusqueda(e.target.value)}
              placeholder="Buscar por nombre..."
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Buscar
          </Button>
        </form>

        {/* Tabla */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Img.</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="hidden md:table-cell">Categorías</TableHead>
                <TableHead className="hidden lg:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <TableCell key={j}>
                        <div className="h-4 rounded bg-muted animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : flores.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    No hay flores que mostrar
                  </TableCell>
                </TableRow>
              ) : (
                flores.map((flor) => (
                  <TableRow key={flor.id}>
                    {/* Imagen */}
                    <TableCell>
                      {flor.imageUrl ? (
                        <div className="relative size-10 rounded-lg overflow-hidden">
                          <Image
                            src={flor.imageUrl}
                            alt={flor.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                          <HugeiconsIcon
                            icon={Image01Icon}
                            size={16}
                            className="text-muted-foreground"
                            strokeWidth={1.5}
                          />
                        </div>
                      )}
                    </TableCell>

                    {/* Nombre + descripción */}
                    <TableCell>
                      <p className="font-medium text-foreground leading-tight">{flor.name}</p>
                      {flor.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 max-w-[180px] truncate">
                          {flor.description}
                        </p>
                      )}
                    </TableCell>

                    {/* Precio */}
                    <TableCell className="text-right font-medium tabular-nums">
                      {new Intl.NumberFormat('es-PE', {
                        style: 'currency',
                        currency: 'PEN',
                      }).format(flor.price)}
                    </TableCell>

                    {/* Stock */}
                    <TableCell className="text-center">
                      <Badge variant={flor.stock === 0 ? 'destructive' : 'secondary'}>
                        {flor.stock === 0 ? 'Agotado' : flor.stock}
                      </Badge>
                    </TableCell>

                    {/* Categorías */}
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {flor.categories.map((cat) => (
                          <span
                            key={cat.id}
                            className="px-2 py-0.5 rounded-full text-xs bg-pink-50 text-primary font-medium"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </TableCell>

                    {/* Fecha */}
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground tabular-nums">
                      {new Date(flor.createdAt).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>

                    {/* Acciones */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setDialogFlor(flor)}
                          title="Editar"
                        >
                          <HugeiconsIcon icon={PencilEdit01Icon} size={16} strokeWidth={1.5} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setFlorAEliminar(flor)}
                          title="Eliminar"
                          className="hover:text-destructive hover:bg-destructive/10"
                        >
                          <HugeiconsIcon icon={Delete01Icon} size={16} strokeWidth={1.5} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Página {page + 1} de {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={16}
                  data-icon="inline-start"
                  strokeWidth={1.5}
                />
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
              >
                Siguiente
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  data-icon="inline-end"
                  strokeWidth={1.5}
                />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog crear / editar */}
      <FloresFormDialog
        flor={dialogFlor === 'nueva' ? null : (dialogFlor as FlowerResponse | null)}
        abierto={dialogFlor !== null}
        onCerrar={() => setDialogFlor(null)}
      />

      {/* AlertDialog confirmar eliminación */}
      <AlertDialog
        open={florAEliminar !== null}
        onOpenChange={(v) => !v && setFlorAEliminar(null)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar flor?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente{' '}
              <strong className="text-foreground">{florAEliminar?.name}</strong> del
              catálogo y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={confirmarEliminar}
              disabled={eliminarFlor.isPending}
            >
              {eliminarFlor.isPending ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
