"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  User02Icon,
  ShoppingBag01Icon,
  Settings01Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons"

import { ROUTES } from "@/constants/routes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// const menuItemClass =
//   "cursor-pointer gap-2 text-sm font-medium text-[#151515]/75 transition-colors " +
//   "data-[highlighted]:bg-[#ff69b4]/10 data-[highlighted]:text-[#ff69b4] " +
//   "dark:text-white/75 dark:data-[highlighted]:bg-[#ff69b4]/10 dark:data-[highlighted]:text-[#ff69b4]"

const menuItemClass =
  "cursor-pointer gap-2 text-sm font-medium text-[#151515]/75 " +
  "data-[highlighted]:bg-[#ff69b4]/10 data-[highlighted]:text-[#ff69b4] " +
  "dark:text-white/75 dark:data-[highlighted]:bg-[#ff69b4]/10 dark:data-[highlighted]:text-[#ff69b4]"

interface UserDropdownProps {
  user: { name: string; email: string; role?: string }
  logout: { mutate: () => void; isPending: boolean }
}

export function UserDropdown({ user, logout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 outline-none">
          <Avatar className="size-9 border-2 border-[#ff69b4]/20 transition-colors hover:border-[#ff69b4]">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#ff69b4] text-xs font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium text-[#151515]/80 dark:text-white/80">
              Hola, {user.name} 👋
            </p>
            <p className="text-xs leading-none text-[#151515]/60 dark:text-white/60">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className={menuItemClass}>
            <Link href={ROUTES.perfil}>
              <HugeiconsIcon
                icon={User02Icon}
                className="size-4"
                strokeWidth={1.5}
              />
              <span>Mi Perfil</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className={menuItemClass}>
            <Link href="/pedidos">
              <HugeiconsIcon
                icon={ShoppingBag01Icon}
                className="size-4"
                strokeWidth={1.5}
              />
              <span>Mis Pedidos</span>
            </Link>
          </DropdownMenuItem>

          {user.role === "ROLE_ADMIN" && (
            <DropdownMenuItem asChild className={menuItemClass}>
              <Link href={ROUTES.admin}>
                <HugeiconsIcon
                  icon={Settings01Icon}
                  className="size-4"
                  strokeWidth={1.5}
                />
                <span>Panel Admin</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer gap-2 text-red-600 data-[highlighted]:bg-red-100 data-[highlighted]:text-red-600 dark:data-[highlighted]:bg-red-950/20"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          <HugeiconsIcon
            icon={Logout01Icon}
            className="size-4"
            strokeWidth={1.5}
          />
          <span>{logout.isPending ? "Saliendo..." : "Cerrar sesión"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
