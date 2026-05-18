# Flujo de Pago — MercadoPago

## Responsabilidades

El backend crea la preferencia de pago y devuelve el `initPoint`. El frontend solo redirige — no integra ningún SDK de MercadoPago directamente.

## Flujo completo

```
1. /pago → usuario llena datos de envío (schemas/pago.schemas.ts)
2. POST /api/v1/payments/checkout → backend crea preferencia MP
                                  → devuelve { orderId, paymentId, initPoint }
3. Frontend: window.location.href = initPoint   ← única acción con MP
4. MercadoPago procesa y redirige a:
   - /pago/exito     → APPROVED  → mostrar resumen del pedido
   - /pago/pendiente → PENDING   → informar que está en revisión
   - /pago/error     → REJECTED  → mostrar error, permitir reintentar
5. Backend recibe webhook de MP y actualiza estado del pedido en BD
```

## Páginas de retorno

| Ruta | Estado MP | Acción |
|---|---|---|
| `/pago/exito` | `APPROVED` | Llamar `useEstadoPago(orderId)`, mostrar resumen, botón → `/pedidos` |
| `/pago/pendiente` | `PENDING` | Mensaje informativo, botón → `/pedidos/{orderId}` |
| `/pago/error` | `REJECTED` | Mensaje de error, botón → `/carrito` |

`orderId` y `paymentId` llegan como query params en la URL de retorno de MercadoPago.
