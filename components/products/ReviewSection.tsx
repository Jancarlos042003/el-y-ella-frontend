"use client"

import { useState } from 'react'
import { toast } from 'sonner'
import { HugeiconsIcon } from '@hugeicons/react'
import { StarIcon, Loading03Icon } from '@hugeicons/core-free-icons'

import type { ReviewResponse } from '@/types/review.types'
import { useReviews, useCreateReview } from '@/hooks/useReviews'
import { useMe } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

interface ReviewSectionProps {
  flowerId: number
  initialReviews: ReviewResponse[]
}

export function ReviewSection({ flowerId, initialReviews }: ReviewSectionProps) {
  const { data: reviews = initialReviews } = useReviews(flowerId)
  const { data: me } = useMe()
  const { mutate: createReview, isPending } = useCreateReview()

  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!comment.trim()) return

    createReview(
      { flowerId, rating, comment: comment.trim() },
      {
        onSuccess: () => {
          toast.success('Reseña publicada')
          setComment('')
          setRating(5)
        },
        onError: (error: unknown) => {
          const msg = (error as { response?: { data?: { message?: string } } })?.response?.data
            ?.message
          toast.error(msg ?? 'No se pudo publicar la reseña.')
        },
      },
    )
  }

  return (
    <section className="mx-auto max-w-[90rem] border-t border-border px-4 py-10 md:px-6">
      <h2 className="mb-6 font-serif text-2xl font-bold text-foreground dark:text-white">
        Reseñas ({reviews.length})
      </h2>

      {/* lista */}
      {reviews.length > 0 ? (
        <div className="mb-8 flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-border glass-soft p-5 shadow-soft transition-luxury hover:shadow-floating"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {/* avatar inicial */}
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground dark:text-white">
                      {review.userName}
                    </p>
                    <p className="text-xs text-foreground/50 dark:text-white/50">
                      {new Date(review.createdAt).toLocaleDateString('es-PE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <Stars value={review.rating} />
              </div>
              <p className="text-sm leading-relaxed text-foreground/80 dark:text-white/80">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-8 text-foreground/50 dark:text-white/50">
          Sé el primero en dejar una reseña.
        </p>
      )}

      {/* formulario — solo si hay sesión */}
      {me ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-border glass p-5 shadow-soft"
        >
          <h3 className="font-semibold text-foreground dark:text-white">Tu reseña</h3>

          {/* estrellas interactivas */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const val = i + 1
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRating(val)}
                  onMouseEnter={() => setHoverRating(val)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${val} estrella${val !== 1 ? 's' : ''}`}
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    className={cn(
                      "size-6 transition-luxury",
                      val <= (hoverRating || rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-foreground/20 dark:text-white/20'
                    )}
                    strokeWidth={1.5}
                  />
                </button>
              )
            })}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comparte tu experiencia con este producto..."
            rows={3}
            required
            className={cn(
              "rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none transition-luxury",
              "placeholder:text-foreground/40 focus:border-primary dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
            )}
          />

          <button
            type="submit"
            disabled={isPending || !comment.trim()}
            className="self-start rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-luxury hover:bg-primary-dark disabled:opacity-60"
          >
            {isPending ? (
              <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" strokeWidth={1.5} />
            ) : (
              'Publicar reseña'
            )}
          </button>
        </form>
      ) : (
        <p className="text-sm text-foreground/60 dark:text-white/60">
          <a href="/login" className="font-semibold text-primary hover:underline">
            Inicia sesión
          </a>{' '}
          para dejar una reseña.
        </p>
      )}
    </section>
  )
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          className={cn(
            "size-4 transition-luxury",
            i < value ? 'text-amber-400 fill-amber-400' : 'text-foreground/20 dark:text-white/20'
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}
