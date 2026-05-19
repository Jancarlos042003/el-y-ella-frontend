import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FlowerIcon,
  InstagramIcon,
  FacebookIcon,
  TiktokIcon,
  WhatsappIcon,
  Mail01Icon,
} from '@hugeicons/core-free-icons'

import { ROUTES } from '@/constants/routes'
import { FOOTER_CATEGORIES, FOOTER_HELP_LINKS } from '@/constants/navigation'
import { cn } from '@/lib/utils'

const SOCIAL = [
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { icon: TiktokIcon, href: 'https://tiktok.com', label: 'TikTok' },
  { icon: WhatsappIcon, href: 'https://wa.me/', label: 'WhatsApp' },
]

export function Footer() {
  const linkClass = "text-sm text-foreground/60 transition-luxury hover:text-primary dark:text-white/60"
  const titleClass = "text-sm font-semibold uppercase tracking-wider text-foreground dark:text-white"

  return (
    <footer className="mt-auto border-t border-border bg-background/80 backdrop-blur-sm dark:bg-background/80">
      <div className="mx-auto max-w-[90rem] px-4 py-12 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* columna 1 — marca */}
          <div className="flex flex-col gap-4">
            <Link href={ROUTES.home} className="flex items-center gap-2">
              <HugeiconsIcon
                icon={FlowerIcon}
                className="size-6 text-primary"
                strokeWidth={1.5}
              />
              <span className="font-serif text-xl font-bold text-foreground dark:text-white">
                El y ella
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-foreground/60 dark:text-white/60">
              Bouquets premium elaborados con flores frescas y entregas que enamoran. Llevamos tu
              mensaje en cada pétalo.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full border border-border text-foreground/60 transition-luxury hover:border-primary hover:text-primary dark:text-white/60"
                >
                  <HugeiconsIcon icon={icon} className="size-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* columna 2 — ayuda */}
          <div className="flex flex-col gap-3">
            <h3 className={titleClass}>
              Ayuda
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* columna 3 — categorías */}
          <div className="flex flex-col gap-3">
            <h3 className={titleClass}>
              Catálogo
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className={linkClass}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* columna 4 — contacto */}
          <div className="flex flex-col gap-3">
            <h3 className={titleClass}>
              Contacto
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hola@elyelladetalles.pe"
                  className={linkClass + " flex items-center gap-2"}
                >
                  <HugeiconsIcon icon={Mail01Icon} className="size-4 shrink-0" strokeWidth={1.5} />
                  hola@elyelladetalles.pe
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass + " flex items-center gap-2"}
                >
                  <HugeiconsIcon
                    icon={WhatsappIcon}
                    className="size-4 shrink-0"
                    strokeWidth={1.5}
                  />
                  +51 999 999 999
                </a>
              </li>
            </ul>
            <p className="mt-2 text-xs text-foreground/40 dark:text-white/40">
              Lun – Sáb: 9:00 am – 7:00 pm
              <br />
              Dom: 10:00 am – 4:00 pm
            </p>
          </div>
        </div>

        {/* línea inferior */}
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-foreground/40 dark:text-white/40">
          © {new Date().getFullYear()} El y Ella Detalles. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
