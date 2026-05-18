'use client'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { PencilEdit01Icon, Delete01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
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
import { UsuariosFormDialog } from '@/components/admin/UsuariosFormDialog'
import { useAdminUsuarios, useEliminarUsuario } from '@/hooks/useAdminUsuarios'
import type { UserResponse } from '@/types/admin.types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminUsuariosPage() {
  const [usuarioEditar, setUsuarioEditar] = useState<UserResponse | null>(null)
  const [usuarioEliminar, setUsuarioEliminar] = useState<UserResponse | null>(null)

  const { data: usuarios = [], isLoading } = useAdminUsuarios()
  const eliminarUsuario = useEliminarUsuario()

  const confirmarEliminar = () => {
    if (!usuarioEliminar) return
    eliminarUsuario.mutate(usuarioEliminar.id, {
      onSuccess: () => setUsuarioEliminar(null),
    })
  }

  return (
    <>
      <div className="space-y-5">
        {/* Encabezado */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usuarios</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {usuarios.length} usuarios registrados
          </p>
        </div>

        {/* Tabla */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Nombre / Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                <TableHead className="hidden lg:table-cell">Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <TableCell key={j}>
                        <div className="h-4 rounded bg-muted animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : usuarios.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              ) : (
                usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    {/* ID */}
                    <TableCell className="tabular-nums text-muted-foreground">
                      {usuario.id}
                    </TableCell>

                    {/* Nombre + Email */}
                    <TableCell>
                      <p className="font-medium leading-tight">{usuario.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {usuario.email}
                      </p>
                    </TableCell>

                    {/* Rol */}
                    <TableCell>
                      <Badge
                        variant={usuario.role === 'ADMIN' ? 'default' : 'secondary'}
                      >
                        {usuario.role}
                      </Badge>
                    </TableCell>

                    {/* Teléfono */}
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {usuario.phone ?? '—'}
                    </TableCell>

                    {/* Fecha de registro */}
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground tabular-nums">
                      {formatDate(usuario.createdAt)}
                    </TableCell>

                    {/* Acciones */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setUsuarioEditar(usuario)}
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
                          onClick={() => setUsuarioEliminar(usuario)}
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

      {/* Dialog editar usuario */}
      <UsuariosFormDialog
        usuario={usuarioEditar}
        abierto={usuarioEditar !== null}
        onCerrar={() => setUsuarioEditar(null)}
      />

      {/* AlertDialog confirmar eliminación */}
      <AlertDialog
        open={usuarioEliminar !== null}
        onOpenChange={(v) => !v && setUsuarioEliminar(null)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la cuenta de{' '}
              <strong className="text-foreground">{usuarioEliminar?.name}</strong>{' '}
              ({usuarioEliminar?.email}) y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={confirmarEliminar}
              disabled={eliminarUsuario.isPending}
            >
              {eliminarUsuario.isPending ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
