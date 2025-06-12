'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useUserModal } from '@/contexts/user-modal-context'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog'
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
  const { data: session } = useSession()
  const pathname = usePathname()

  const router = useRouter()
  console.log(session?.user)
  const user = session ? session.user : ''

  function handleLogin() {
    localStorage.setItem('redirect', pathname)
    router.push('/login')
  }

  function handleLogout() {
    signOut()
    toast.success('Logout efetuado com sucesso')
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
                  src={user.image}
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

            <AlertDialog>
              <AlertDialogTrigger>
                <DropdownMenuItem
                  onSelect={e => e.preventDefault()}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja deslogar da sua conta? Seu atual
                    carrinho será perdido.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-rose-500 hover:bg-rose-700 hover:cursor-pointer"
                  >
                    Deslogar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
