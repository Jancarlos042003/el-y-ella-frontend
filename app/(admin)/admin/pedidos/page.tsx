'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import { EyeIcon } from '@hugeicons/core-free-icons'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useAdminPedidos, useActualizarEstadoPedido } from '@/hooks/useAdminPedidos'
import type { OrderResponse, UpdateOrderStatusInput } from '@/types/admin.types'

const ESTADO_LABEL: Record<string, string> = {
  PENDING: 'Pendiente',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

const ESTADO_VARIANTE: Record<
  string,
  'secondary' | 'outline' | 'default' | 'destructive'
> = {
  PENDING: 'secondary',
  SHIPPED: 'outline',
  DELIVERED: 'default',
  CANCELLED: 'destructive',
}

const ORDER_STATUSES = Object.entries(ESTADO_LABEL) as [
  UpdateOrderStatusInput['status'],
  string,
][]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminPedidosPage() {
  const [pedidoDetalle, setPedidoDetalle] = useState<OrderResponse | null>(null)

  const { data: pedidos = [], isLoading } = useAdminPedidos()
  const actualizarEstado = useActualizarEstadoPedido()

  return (
    <>
      <div className="space-y-5">
        {/* Encabezado */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pedidos.length} pedidos en total
          </p>
        </div>

        {/* Tabla */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Detalle</TableHead>
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
              ) : pedidos.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    No hay pedidos aún
                  </TableCell>
                </TableRow>
              ) : (
                pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    {/* ID */}
                    <TableCell className="tabular-nums text-muted-foreground font-medium">
                      #{pedido.id}
                    </TableCell>

                    {/* Cliente */}
                    <TableCell>
                      <p className="font-medium leading-tight">{pedido.userName}</p>
                    </TableCell>

                    {/* Total */}
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatCurrency(pedido.total)}
                    </TableCell>

                    {/* Estado — badge + select para cambiar */}
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Badge variant={ESTADO_VARIANTE[pedido.status]}>
                          {ESTADO_LABEL[pedido.status] ?? pedido.status}
                        </Badge>
                        <Select
                          value={pedido.status}
                          onValueChange={(value) =>
                            actualizarEstado.mutate({
                              id: pedido.id,
                              data: {
                                status: value as UpdateOrderStatusInput['status'],
                              },
                            })
                          }
                          disabled={
                            actualizarEstado.isPending &&
                            actualizarEstado.variables?.id === pedido.id
                          }
                        >
                          <SelectTrigger className="h-7 w-36 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ORDER_STATUSES.map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>

                    {/* Fecha */}
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground tabular-nums">
                      {formatDate(pedido.createdAt)}
                    </TableCell>

                    {/* Ver detalle */}
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setPedidoDetalle(pedido)}
                        title="Ver detalle"
                      >
                        <HugeiconsIcon icon={EyeIcon} size={16} strokeWidth={1.5} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Sheet — detalle del pedido */}
      <Sheet
        open={pedidoDetalle !== null}
        onOpenChange={(v) => !v && setPedidoDetalle(null)}
      >
        <SheetContent className="flex flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="p-6 pb-4 border-b border-border">
            <SheetTitle>Pedido #{pedidoDetalle?.id}</SheetTitle>
            <SheetDescription>
              {pedidoDetalle?.userName}
              {pedidoDetalle?.createdAt
                ? ` · ${formatDate(pedidoDetalle.createdAt)}`
                : ''}
            </SheetDescription>
          </SheetHeader>

          {/* Lista de ítems */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {pedidoDetalle?.details.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {item.flowerImageUrl ? (
                  <div className="relative size-12 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.flowerImageUrl}
                      alt={item.flowerName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-12 rounded-lg bg-muted shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.flowerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="font-medium tabular-nums shrink-0">
                  {formatCurrency(item.subtotal)}
                </p>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="border-t border-border p-6 flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg tabular-nums">
              {formatCurrency(pedidoDetalle?.total ?? 0)}
            </span>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
