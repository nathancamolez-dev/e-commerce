'use client'

import { useAuth } from '@/contexts/login-context'
import { useUserModal } from '@/contexts/user-modal-context'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function AccountDropDownMenu() {
  const { openModal } = useUserModal()
  const [isOpen, setIsOpen] = useState(false)
  const { logout, user } = useAuth()
  const pathname = usePathname()

  const router = useRouter()

  function handleLogin() {
    localStorage.setItem('redirect', pathname)
    router.push('/login')
  }

  function handleLogout() {
    logout()
  }

  function handleAccountAction(action: string) {
    router.push(`/${action}`)
  }
  return (
    <div className="flex items-center">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:bg-gray-200 hover:cursor-pointer"
          >
            {user ? (
              <>
                <Image
                  className="h-6 w-6 rounded-full"
                  src={user.avatar}
                  alt="Profile picture"
                  width={24}
                  height={24}
                />
                <span className="text-sm">{user.name}</span>
              </>
            ) : (
              <span className="text-sm">Login/Register</span>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        {user ? (
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={openModal} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleAccountAction('profile')}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Login
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push('/register')}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              Register
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
