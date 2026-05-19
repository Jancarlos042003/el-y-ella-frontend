# Sistema de Diseño — El y Ella Detalles

## Concepto visual

### Dirección oficial de marca

**Editorial floral luxury + calm luxury UI**

La experiencia visual debe sentirse:
- elegante
- emocional
- premium
- aireada
- romántica
- sofisticada
- silenciosa visualmente

Inspiraciones:
- campañas editoriales de flores luxury
- boutiques premium
- Apple-inspired minimalism cálido
- Shopify premium floral themes
- fotografía lifestyle floral editorial

La interfaz debe priorizar:
1. Espacio negativo
2. Contraste suave
3. Transparencias
4. Profundidad sutil
5. Jerarquía por opacidad, no por saturación

Nunca:
- ecommerce agresivo
- dashboard SaaS
- UI saturada
- exceso de sombras
- colores extremadamente vibrantes
- demasiados elementos compitiendo

---

# Principios visuales

## Filosofía del sistema

La UI debe sentirse:
- ligera
- flotante
- refinada
- atmosférica
- calmada
- táctil
- premium

La experiencia visual debe parecer:
- una boutique editorial
- una campaña visual
- una experiencia emocional

No:
- una app técnica
- un marketplace
- un dashboard administrativo

---

# Paleta de colores

```css
--color-primary:    #f472b6;
--color-background: #f9f5f0;
--color-dark:       #151515;
```

## Uso del color primary

El rosa principal NO debe dominar toda la interfaz.

### El rosa sólido se reserva para:
- CTA principal
- estados activos prioritarios
- highlights importantes
- acciones emocionales clave

### El rosa translúcido se usa para:
- hover states
- pills
- bordes
- superficies suaves
- íconos
- glass accents

### Intensidades aprobadas

| Uso | Opacidad |
|---|---|
| Hover suave | 5%–10% |
| Surface accent | 8%–12% |
| Border accent | 12%–18% |
| Glow | 10%–15% |
| CTA principal | sólido |

Evitar:
- múltiples botones sólidos rosas
- hover extremadamente saturados
- texto blanco sobre fondos translúcidos

---

# Dark mode — Velvet Luxury

```css
--color-dark-bg:      #1a0a0f;
--color-dark-surface: #2a1520;
--color-dark-glow:    #f472b6;
```

## Filosofía dark mode

El dark mode debe sentirse:
- cálido
- elegante
- romántico
- cinematográfico
- velvet luxury

Nunca:
- gris corporativo
- negro puro
- alto contraste agresivo

---

# Tipografía

## Sistema tipográfico

| Rol | Familia | Uso |
|---|---|---|
| Serif elegante | Playfair Display | Hero titles, product names, section headings |
| Sans-serif minimalista | Poppins | Navegación, body text, botones, precios, labels |

### Regla crítica

NO intercambiar roles entre serif y sans-serif.

---

## Patrón hero heading

```txt
Flores elegantes para
momentos especiales
```

- Primera línea → dark
- Segunda línea → primary
- Ambas líneas → serif

---

## Escala base

```css
font-size: 62.5%;
```

---

# Breakpoints

```ts
sm: '468px'
md: '768px'
lg: '1024px'
```

---

# Glassmorphism

## Filosofía

Glassmorphism:
- sutil
- editorial
- suave
- atmosférico

Nunca:
- exagerado
- ultra blur
- demasiado transparente
- estilo SaaS futurista

---

## Clase base

```css
.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

@supports not (backdrop-filter: blur(12px)) {
  .glass {
    background: rgba(255,255,255,0.92);
  }
}

.dark .glass {
  background: rgba(26,10,15,0.72);
  border-color: rgba(244,114,182,0.15);
}
```

---

## Intensidades

| Componente | Background opacity | Blur |
|---|---|---|
| Navbar | 0.80 | 16px |
| Hero card | 0.72 | 12px |
| Product card | 0.60 | 8px |
| Testimonios | 0.65 | 10px |
| Newsletter | 0.70 | 12px |

---

# Sistema de sombras

## Filosofía

Las sombras deben ser:
- amplias
- suaves
- difusas
- casi invisibles

Nunca:
- oscuras
- compactas
- agresivas

---

## Sombras aprobadas

```css
shadow-soft:
0 4px 24px rgba(0,0,0,0.06)

shadow-floating:
0 10px 40px rgba(244,114,182,0.08)
```

Evitar:
```css
shadow-lg
shadow-xl
shadow-black/20
```

---

# Sistema de botones

Solo existen 3 categorías de botones.

---

## 1. Primary CTA

Uso:
- acción principal de la pantalla

Ejemplos:
- Comprar ahora
- Finalizar compra
- Confirmar pedido

### Estilo

```css
background: #f472b6;
color: white;
border-radius: 9999px;
```

### Hover

```css
background: #ec4899;
```

### Reglas

- máximo 1 CTA dominante por viewport
- usar con moderación
- prioridad visual alta

---

## 2. Soft Action Button

Uso:
- carrito
- filtros
- pills interactivas
- acciones secundarias importantes

### Estilo

```css
background: rgba(244,114,182,0.10);
border: 1px solid rgba(244,114,182,0.15);
color: #f472b6;
```

### Hover

```css
background: rgba(244,114,182,0.15);
border-color: rgba(244,114,182,0.25);
```

### Reglas

- NO usar texto blanco
- mantener apariencia translúcida
- hover incremental, nunca agresivo

---

## 3. Ghost Luxury Button

Uso:
- navegación
- dropdown items
- acciones terciarias

### Estilo

```css
background: transparent;
color: rgba(21,21,21,0.72);
```

### Hover

```css
background: rgba(244,114,182,0.05);
color: #f472b6;
```

### Reglas

- prioridad visual mínima
- sin sombras
- interacción sutil

---

# Hover & Motion Language

## Filosofía

La interacción debe sentirse:
- refinada
- suave
- orgánica
- atmosférica

Nunca:
- explosiva
- elástica
- exagerada
- demasiado técnica

---

## Reglas de hover

Incorrecto:
- translúcido → sólido
- hover muy saturado
- texto blanco sobre hover suave
- sombras fuertes
- escalas exageradas

Correcto:
- incrementos leves de opacidad
- profundidad sutil
- microtransiciones suaves

---

## Duraciones

| Tipo | Duración |
|---|---|
| Hover | 150ms–220ms |
| Navbar scroll | 300ms |
| Dropdown | 180ms |
| Modal | 250ms |

### Timing

```css
ease-out
```

Evitar:
```css
bounce
spring exagerado
ease-in-out excesivo
```

---

# Navbar

## Filosofía

El navbar debe sentirse:
- flotante
- ligero
- integrado con el hero
- premium

Nunca:
- pesado
- dominante
- demasiado sólido
- saturado

---

## Scroll-aware behavior

### Estado inicial

```txt
position: fixed
glass completo
sin fondo sólido
```

### Después de scroll > 80px

```txt
background: rgba(255,255,255,0.95)
sombra suave
transición 300ms
```

---

## Reglas visuales

- Priorizar transparencias
- Evitar múltiples elementos rosa sólido
- Hover states suaves
- El carrito NO debe competir con el CTA del hero
- El navbar debe “desaparecer” visualmente sobre el hero

---

## Carrito

Usa estilo:
- Soft Action Button

```css
background: rgba(244,114,182,0.10);
border: 1px solid rgba(244,114,182,0.15);
color: #f472b6;
```

Hover:
```css
background: rgba(244,114,182,0.15);
border-color: rgba(244,114,182,0.25);
```

NO usar:
- fondo rosa sólido
- texto blanco
- hover agresivo

---

## Badge "Nuevo"

```css
background: rgba(244,114,182,0.10);
border: 1px solid rgba(244,114,182,0.15);
color: #f472b6;
```

Nunca usar:
- rojo ecommerce
- badges agresivos

---

# Dropdowns

## Filosofía

Los dropdowns deben sentirse:
- cristal flotante
- superficie premium
- calm luxury

Nunca:
- panel admin
- menú técnico
- componente Radix default

---

## Estilo base

```css
background: rgba(255,255,255,0.78);
backdrop-filter: blur(18px);
border: 1px solid rgba(255,255,255,0.22);
box-shadow: 0 10px 40px rgba(244,114,182,0.08);
border-radius: 1.6rem;
```

Dark mode:
```css
background: rgba(26,10,15,0.78);
border-color: rgba(244,114,182,0.12);
```

---

# Hero

## Filosofía

El hero debe sentirse:
- editorial
- emocional
- premium
- cinematográfico

La fotografía debe ser:
- semi lifestyle cálida
- romántica
- natural
- suave

Nunca:
- fotografía de catálogo técnico
- imágenes muy saturadas
- stock photography evidente

---

## Glass card

- border-radius: 2rem
- profundidad suave
- contraste ligero
- mucho espacio negativo

---

## CTAs del hero

- CTA principal → filled pink
- CTA secundario → outlined luxury

Nunca:
- múltiples botones filled
- CTAs agresivos

---

# Product Cards

## Filosofía visual

Las product cards deben sentirse:
- editoriales
- boutique premium
- vitrinas emocionales
- lujo silencioso

Nunca:
- marketplace
- ecommerce agresivo
- catálogo saturado

---

## Reglas

- Priorizar fotografía emocional
- Evitar exceso de elementos UI
- Mucho espacio negativo
- Profundidad suave
- CTA integrado y silencioso

---

## Anatomía

- Fondo velvet luxury
- Imagen dominante
- Serif elegante en título
- CTA outlined calm luxury
- Badge sutil
- Favorito glass

---

## CTA recomendado

```css
border: 1px solid rgba(244,114,182,0.35);
background: rgba(244,114,182,0.04);
color: rgba(255,255,255,0.88);
```

Hover:
```css
background: rgba(244,114,182,0.08);
border-color: rgba(244,114,182,0.45);
```

---

# Categorías

## Filosofía

Minimalismo editorial.

Las categorías deben sentirse:
- ligeras
- premium
- táctiles
- limpias

---

## Estilo

- glass muy sutil
- border suave
- imágenes cálidas
- spacing amplio

---

# Testimonios

## Filosofía

Los testimonios deben sentirse:
- íntimos
- humanos
- elegantes

Nunca:
- tarjetas corporativas
- demasiado UI-heavy

---

# Newsletter

## Filosofía

El newsletter debe parecer:
- una invitación premium
- no un popup de marketing

---

# Motion

## Filosofía

Motion:
- casi invisible
- elegante
- refinado

---

## Aprobado

- fade
- micro movement
- stagger sutil
- navbar transitions suaves

---

## Evitar

- bounce
- parallax exagerado
- motion agresivo
- floating excesivo

---

# shadcn

## Permitido

| Componente | Uso |
|---|---|
| Dialog | Confirmaciones admin |
| Table | CRUD admin |
| Select | Admin |
| Input | Formularios admin |
| Button | Admin |
| Sonner | Toasts |

---

## No usar shadcn para

- Navbar
- Hero
- ProductCard
- CategoryCard
- Newsletter
- Footer
- Login
- Register
- Checkout

Todos deben ser custom.

---

# Configuración shadcn

```json
{
  "style": "radix-maia",
  "iconLibrary": "hugeicons",
  "rsc": true
}
```