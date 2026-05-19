"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface NavbarSearchProps {
  isMobile?: boolean
  onClose?: () => void
  className?: string
}

export function NavbarSearch({
  isMobile = false,
  onClose,
  className,
}: NavbarSearchProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/catalogo?q=${encodeURIComponent(query.trim())}`)
    if (onClose) onClose()
  }

  if (isMobile) {
    return (
      <form onSubmit={handleSubmit} className={cn("px-4 pb-3", className)}>
        <div className="flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-2 text-sm dark:bg-white/5">
          <HugeiconsIcon
            icon={Search01Icon}
            className="size-4 shrink-0 text-primary"
            strokeWidth={1.5}
          />
          <input
            autoFocus
            type="text"
            placeholder="Buscar flores, bouquets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-foreground/40 dark:text-white dark:placeholder:text-white/40"
          />
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("hidden md:block", className)}>
      <div className="flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1.5 text-sm dark:bg-white/5">
        <HugeiconsIcon
          icon={Search01Icon}
          className="size-4 shrink-0 text-primary"
          strokeWidth={1.5}
        />
        <input
          type="text"
          placeholder="Buscar flores..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-40 bg-transparent transition-all outline-none placeholder:text-foreground/40 focus:w-56 lg:w-48 dark:text-white dark:placeholder:text-white/40"
        />
      </div>
    </form>
  )
}
