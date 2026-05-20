# Arquitectura UX del Carrito — El y Ella Detalles

Este documento describe la arquitectura de 3 niveles diseñada para unificar la experiencia del carrito entre dispositivos Desktop y Mobile, resolviendo discrepancias previas en el flujo hacia el Checkout.

## Problema Resuelto

Anteriormente, el flujo de compra presentaba una inconsistencia arquitectónica:
- **Desktop:** Utilizaba un `CartDrawer` (Mini-Cart) que permitía hacer un "bypass" directamente hacia el checkout (`/pago`). Esto limitaba la escalabilidad, ya que impedía añadir pasos intermedios (ej. dedicatorias, cálculo de envíos, cross-selling) por falta de espacio en el Drawer.
- **Mobile/Tablet:** Utilizaba un Bottom Tab Navigation que dirigía correctamente a una página completa (`/carrito`), creando dos caminos separados para llegar al pago.

## Solución: Arquitectura de 3 Niveles

La nueva arquitectura unifica el embudo de conversión, garantizando que **todos los usuarios pasen por el `Full Cart Page` (`/carrito`)** antes de llegar al Checkout, independientemente del dispositivo.

### Nivel 1 — Mini Cart (Solo Desktop)

- **Componente:** `CartDrawer` (Right Drawer).
- **Objetivo:** Funcionar estrictamente como una vista rápida (preview) y ofrecer feedback visual inmediato cuando se añade un producto.
- **Contenido:** Lista compacta de productos, cantidades, subtotal y opción para eliminar.
- **Acción Principal:** El botón principal ("Revisar pedido") **no inicia el pago**. Su única función es cerrar el Drawer y navegar hacia la ruta `/carrito`.
- **Ventaja UX:** Ocupa poco espacio y permite al usuario seguir navegando por el catálogo sin interrupciones severas.

### Nivel 2 — Full Cart Experience (Desktop & Mobile)

- **Componente/Ruta:** `app/(public)/carrito/page.tsx`.
- **Objetivo:** Ser el **único** puente de entrada hacia el Checkout (`/pago`).
- **Responsabilidad:** 
  - Validar si el usuario está autenticado (redirige a `/login` si no lo está).
  - Confirmar el desglose detallado de la orden.
  - **Escalabilidad:** Este es el lugar designado para futuras expansiones (formularios de dedicatoria, selección de fechas de entrega, recomendaciones de productos adicionales).
- **Layout:** Estructura responsiva (Grid). En desktop muestra un resumen lateral sticky, mientras que en mobile se adapta verticalmente.

### Nivel 3 — Puntos de Entrada y Navegación

El acceso al carrito se adapta según el dispositivo respetando la convergencia en el Nivel 2:

- **Desktop (Navbar Icon):** 
  - Al hacer click en el icono del carrito en el header, se activa el estado global (`isCartOpen` en Zustand) abriendo el `CartDrawer` (Nivel 1).
- **Mobile (Bottom Nav Tab):** 
  - El icono del carrito en la barra de navegación inferior es un enlace directo (`<Link>`) a `/carrito`. Se omite el Drawer porque en pantallas pequeñas una vista de pantalla completa proporciona una experiencia más cómoda y nativa.

## Diagrama de Flujo Unificado

### Desktop
```text
[ Navbar Cart Icon ]
        ↓ (abre Zustand Drawer)
[ Right Drawer (Mini-Cart) ]
        ↓ (click en "Revisar pedido")
[ Full Cart Page (/carrito) ]
        ↓ (click en "Proceder al pago" + Validación Auth)
[ Checkout (/pago) ]
        ↓
[ Mercado Pago ]
```

### Mobile / Tablet
```text
[ Bottom Tab Cart ]
        ↓ (navegación directa)
[ Full Cart Page (/carrito) ]
        ↓ (click en "Proceder al pago" + Validación Auth)
[ Checkout (/pago) ]
        ↓
[ Mercado Pago ]
```

## Beneficios
1. **Flujo Predecible:** Un solo camino hacia `/pago`.
2. **Preparado para Crecer:** Espacio reservado en `/carrito` para añadir lógica de negocio compleja antes de cobrar.
3. **Consistencia:** No hay lógicas duplicadas de redirección a Login o validación de Checkout repartidas por la aplicación.
