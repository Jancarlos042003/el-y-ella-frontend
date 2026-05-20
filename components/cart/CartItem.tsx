"use client"

import { toast } from "sonner"
import { useUpdateCartItem, useRemoveCartItem } from "@/hooks/useCarrito"
import { useMe } from "@/hooks/useAuth"
import type { CartResponse } from "@/types/carrito.types"

// Sub-componentes presentacionales
import { CartItemCompact } from "./parts/CartItemCompact"
import { CartItemExpanded } from "./parts/CartItemExpanded"

interface CartItemProps {
  item: CartResponse
  variant?: "compact" | "expanded"
}

/**
 * CartItem - Componente Controlador
 * Gestiona la lógica de negocio y mutaciones, delegando el renderizado
 * a sub-componentes especializados según la variante.
 */
export function CartItem({ item, variant = "expanded" }: CartItemProps) {
  const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem()
  const { mutate: removeItem } = useRemoveCartItem()
  const { data: user } = useMe()

  const handleUpdateQuantity = (delta: number) => {
    const newQty = item.quantity + delta
    if (newQty < 1) return

    updateItem({
      id: item.id,
      data: { flowerId: item.flowerId, quantity: newQty },
    })
  }

  const handleRemove = () => {
    const idToRemove = user ? item.id : item.flowerId
    removeItem(idToRemove, {
      onSuccess: () => toast.success("Producto eliminado"),
    })
  }

  const commonProps = {
    item,
    onUpdateQuantity: handleUpdateQuantity,
    onRemove: handleRemove,
    isUpdating,
  }

  if (variant === "compact") {
    return <CartItemCompact {...commonProps} />
  }

  return <CartItemExpanded {...commonProps} />
}
