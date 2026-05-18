# Sistema de Diseño — El y Ella Detalles

## Concepto visual

**Apple-inspired UI + glassmorphism moderado.** Premium, elegante, minimalista.
Transmite: delicadeza · romanticismo · exclusividad · calma visual · lujo sutil.
Referencia estética: Apple Store, Shopify premium themes, campañas editoriales de flores luxury.

---

## Paleta de colores

```css
--color-primary:    #ff69b4;   /* Rosa — CTAs, badges, iconos destacados, estados activos */
--color-background: #f9f5f0;   /* Fondo general — crema cálido, potencia el glassmorphism */
--color-dark:       #151515;   /* Títulos, jerarquía tipográfica, navegación */
```

### Dark mode
```css
--color-dark-bg:      #1a0a0f;   /* Fondo oscuro cálido */
--color-dark-surface: #2a1520;   /* Superficie de cards */
--color-dark-glow:    #ff69b4;   /* Glow rosado suave en acentos */
```

---

## Tipografía

Mezcla deliberada de dos familias — no intercambiar sus roles:

| Rol | Familia | Dónde |
|---|---|---|
| **Serif elegante** | Playfair Display (o similar) | Hero title, headings de sección, nombre del producto en cards |
| **Sans-serif minimalista** | Poppins | Navegación, descripciones, precios, botones, labels, body text |

### Patrón de heading dos tonos (hero)
```
Flores elegantes para          ← dark (#151515), serif
momentos especiales            ← primary (#ff69b4), serif
```
La segunda línea del heading principal siempre en rosa.

### Escala base
```css
font-size: 62.5%;   /* :root → 1rem = 10px, fidelidad con el diseño original */
```

---

## Breakpoints

```ts
sm: '468px'    // mobile
md: '768px'    // tablet
lg: '1024px'   // desktop
```

---

## Glassmorphism

### Dónde aplicar

| Elemento | Aplica | Notas |
|---|---|---|
| **Navbar** | ✅ | Flotante sobre hero; ver regla scroll-aware abajo |
| **Hero card** | ✅ | Panel izquierdo del hero |
| **Product cards** | ✅ | Sutil — sombra suave + fondo translúcido |
| **Testimonios** | ✅ | Cards de clientes |
| **Newsletter** | ✅ | Bloque de suscripción |
| **Login / Register / Pago** | ✅ | Páginas con imagen de fondo floral |
| Header sólido (scroll down) | ❌ | Solo cuando el navbar ya salió del hero |

### Implementación base

```css
.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

/* Fallback para navegadores sin backdrop-filter */
@supports not (backdrop-filter: blur(12px)) {
  .glass { background: rgba(255, 255, 255, 0.92); }
}

/* Dark mode */
.dark .glass {
  background: rgba(26, 10, 15, 0.72);
  border-color: rgba(255, 105, 180, 0.15);
}
```

### Intensidades por componente

| Componente | Background opacity | Blur |
|---|---|---|
| Navbar | 0.80 | 16px |
| Hero card | 0.72 | 12px |
| Product card | 0.60 | 8px |
| Testimonio | 0.65 | 10px |
| Newsletter | 0.70 | 12px |

---

## Navbar

### Comportamiento scroll-aware (desktop)

```
Posición inicial (sobre hero):
  → position: fixed, glass effect completo, sin fondo sólido

Después de scroll > 80px (salió del hero):
  → background: rgba(255,255,255,0.95), sombra más pronunciada
  → transición suave 300ms
```

### Estructura visual

```
[Logo + tagline]  [Categorías ▾] [Rosas] [Tulipanes] [Girasoles] [Bouquets] [Ocasiones] [Ofertas 🔴Nuevo]  ··  [🔍 Buscar flores, bouquets...]  [👤 Iniciar sesión]  [🛒 Carrito (3)]
```

- **Logo**: Ícono floral + "El y ella" serif + subtítulo "FLORES QUE CUENTAN HISTORIAS" sans pequeño
- **Carrito**: Botón rosa primario con badge de contador
- **Iniciar sesión**: Solo icono + texto, sin fondo
- **Bordes**: `border-radius: 1.6rem` cuando está sobre hero; `border-radius: 0` cuando está sticky sólido

### Mobile navbar
Bottom navigation fijo, estilo iOS:
```
[🏠 Inicio] [⊞ Categorías] [♡ Favoritos] [🛒 Carrito] [👤 Cuenta]
```
- Fondo: glass oscuro rosado en dark mode / glass claro en light
- Ícono activo: color primary `#ff69b4`

---

## Hero

### Layout desktop (2 columnas)

```
┌─────────────────────────────────────────────────────────────────┐
│  [45%] Glass card izquierda    │  [55%] Imagen floral hero      │
│                                │                                 │
│  ⭐ ENVÍO EL MISMO DÍA         │   (bouquet rosas en jarrón      │
│                                │    cristal, pétalos, mármol,   │
│  Flores elegantes para         │    tela rosada, fondo pastel)  │
│  momentos especiales           │                                 │
│  ————                          │                    ▶ Descubre  │
│  Bouquets premium elaborados   │              cómo creamos tu   │
│  con flores frescas y          │                     bouquet    │
│  entregas que enamoran.        │                                 │
│                                │    ← ● ○ ○ →                   │
│  [Comprar ahora →] [Ver colec.]│                                 │
│                                │                                 │
│  🚚 Envíos  🔒 Pago  🌸 Flores │                                 │
│  a todo el país  seguro  frescas│                                │
└─────────────────────────────────────────────────────────────────┘
```

### Glass card del hero
- `border-radius: 2rem`
- Badge superior: pill pequeño con ⭐ + texto uppercase pequeño
- Heading: serif, dos tonos (dark + primary en segunda línea)
- Separador: línea horizontal rosa debajo del heading
- CTAs: botón primario rosa filled + botón secundario outlined oscuro
- Trust badges: fila de 3 iconos + texto pequeño

### Imagen hero
- Fondo: `/public/images/hero-bg.jpg` (imagen del jarrón con rosas, pétalos, tela rosada)
- `object-fit: cover`, posición derecha
- Superposición de slides con navegación (dots + flechas laterales)

---

## Product Card

Anatomía (imagen de referencia #3):

```
┌─────────────────────────────────────┐
│ [Más vendido 🏷]          [♡]       │  ← badge + favorito
│                                     │
│         [imagen floral]             │  ← 60% altura de la card
│       fondo suave integrado         │
│                                     │
├─────────────────────────────────────┤
│ Bouquet Rosas Premium               │  ← serif bold
│ ⭐ 4.9 (128)              $59.990   │  ← rating + precio en misma fila
│                                     │
│ [🛒 Agregar al carrito         →]   │  ← CTA outlined
└─────────────────────────────────────┘
```

- `border-radius: 1.6rem`
- Sombra: `box-shadow: 0 2px 16px rgba(0,0,0,0.07)`
- Badge: pill rosa, posición `absolute` top-left
- Favorito: círculo outline, posición `absolute` top-right
- Nombre: `font-family: serif`, `font-weight: 700`
- Precio: tipografía grande, alineado a la derecha
- CTA: `border: 1.5px solid #ff69b4`, texto + ícono carrito + flecha derecha

---

## Categorías

Cards horizontales minimalistas en fila:

```
[img] Rosas          [img] Tulipanes      [img] Girasoles      [img] Bouquets
      Ver colección →       Ver colección →      Ver colección →      Ver colección →
```

- Fondo: blanco / glass muy sutil
- Borde: `1px solid rgba(0,0,0,0.06)`
- `border-radius: 1.2rem`
- Imagen circular o cuadrada redondeada a la izquierda

---

## Testimonios

Cards con:
- Comillas decorativas grandes en primary
- Texto del comentario
- Avatar circular + nombre + estrellas
- Fondo: glass sutil

---

## Newsletter

Bloque glass full-width:
- Icono envelope primary
- Título + subtítulo
- Input + botón CTA en la misma fila

---

## Animaciones

| Herramienta | Cuándo usar |
|---|---|
| `tw-animate-css` | Fade-in de secciones, spin de loaders, hover en cards (escala/sombra) |
| `motion` | Navbar scroll-aware transition, menú mobile slide, AnimatePresence en carrito, stagger en product grid |

Consultar **MCP de motion** antes de implementar cualquier animación con la librería.

---

## shadcn — Componentes aprobados

Usar shadcn **solo** para preservar la identidad visual premium en elementos funcionales:

| Componente | Dónde |
|---|---|
| `Dialog`, `AlertDialog` | Confirmaciones en admin |
| `Table` | Tablas CRUD en admin |
| `Select` | Selectores de categoría y estado en admin |
| `Input`, `Button` | Formularios del admin |
| `Sonner` | Toasts globales |

**No usar shadcn** en: Navbar, Hero, ProductCard, CategoryCard, Testimonios, Newsletter, Footer, Login, Register, Pago — todos son componentes custom.

### Configuración shadcn
```json
{ "style": "radix-maia", "iconLibrary": "hugeicons", "rsc": true }
```
Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`
