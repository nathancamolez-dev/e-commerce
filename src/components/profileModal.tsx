'use client'
import { AvatarForm } from '@/components/avatar-form'
import { Button } from '@/components/ui/button'
import { useUserModal } from '@/contexts/user-modal-context'
import { useSession } from 'next-auth/react'

export default function ProfileModal() {
  const { isOpen, closeModal } = useUserModal()
  const { data: session } = useSession()

  const user = session?.user

  if (!session) {
    return null
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70  flex items-center justify-center
        `}
    >
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="relative bg-popover text-popover-foreground rounded-md border p-6 shadow-md w-full max-w-md
        data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        transition-all duration-300 ease-in-out"
      >
        <div className="items-center justify-center flex">
          <AvatarForm />
        </div>

        <h1 className="text-3xl font-bold text-start">Perfil</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              className="w-max bg-zinc-100 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="text"
              placeholder={user?.name}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              name="email"
              className="w-full bg-zinc-100 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="email"
              placeholder={user?.email}
            />
          </div>
          <div className="justify-end gap-3 flex">
            <Button
              className="w-max bg-rose-400 hover:bg-rose-600 text-white py-2 rounded-md hover:cursor-pointer"
              type="button"
              onClick={closeModal}
            >
              Fechar
            </Button>
            <Button
              className="w-max bg-emerald-400 hover:bg-emerald-600 text-white py-2 rounded-md hover:cursor-pointer"
              type="button"
              onClick={closeModal}
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
