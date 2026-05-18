import { HugeiconsIcon } from '@hugeicons/react'
import { StarIcon } from '@hugeicons/core-free-icons'

const TESTIMONIALS = [
  {
    name: 'María García',
    comment:
      'Los ramos llegaron fresquísimos y más hermosos de lo que esperaba. Definitivamente el mejor servicio de flores que he probado.',
    rating: 5,
    initials: 'MG',
    location: 'Lima',
  },
  {
    name: 'Carlos Pérez',
    comment:
      'Envié un bouquet sorpresa a mi esposa y quedó encantada. El empaque y la frescura de las flores superaron todas mis expectativas.',
    rating: 5,
    initials: 'CP',
    location: 'Miraflores',
  },
  {
    name: 'Ana Torres',
    comment:
      '¡Los girasoles estaban preciosos! Llegaron perfectamente empacados y la entrega fue puntual. Volveré a pedir sin dudarlo.',
    rating: 5,
    initials: 'AT',
    location: 'San Isidro',
  },
]

export function Testimonials() {
  return (
    <section className="bg-[#ff69b4]/5 py-16 dark:bg-[#ff69b4]/5">
      <div className="mx-auto max-w-[90rem] px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#151515] dark:text-white md:text-3xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-2 text-sm text-[#151515]/60 dark:text-white/60">
            Más de 2 000 pedidos entregados con amor
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="flex flex-col gap-4 rounded-[1.6rem] border border-white/45 bg-white/65 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-[10px] dark:border-white/10 dark:bg-[#2a1520]/65"
            >
              {/* comillas decorativas */}
              <span className="font-serif text-5xl leading-none text-[#ff69b4]/40">&ldquo;</span>

              <p className="flex-1 text-sm leading-relaxed text-[#151515]/75 dark:text-white/75">
                {t.comment}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* avatar con iniciales */}
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#ff69b4]/20 text-sm font-bold text-[#ff69b4]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#151515] dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#151515]/50 dark:text-white/50">{t.location}</p>
                  </div>
                </div>

                {/* estrellas */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <HugeiconsIcon
                      key={i}
                      icon={StarIcon}
                      className="size-3.5 fill-amber-400 text-amber-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
