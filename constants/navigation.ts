import { ROUTES } from '@/constants/routes'

export const FOOTER_CATEGORIES = [
  { label: 'Rosas', href: ROUTES.catalogo('rosas') },
  { label: 'Tulipanes', href: ROUTES.catalogo('tulipanes') },
  { label: 'Girasoles', href: ROUTES.catalogo('girasoles') },
  { label: 'Bouquets', href: ROUTES.catalogo('bouquets') },
  { label: 'Ocasiones especiales', href: '/ocasiones' },
]

export const FOOTER_HELP_LINKS = [
  { label: 'Preguntas frecuentes', href: '/faq' },
  { label: 'Envíos y entregas', href: '/envios' },
  { label: 'Devoluciones', href: '/devoluciones' },
  { label: 'Términos y condiciones', href: '/terminos' },
  { label: 'Privacidad', href: '/privacidad' },
]
