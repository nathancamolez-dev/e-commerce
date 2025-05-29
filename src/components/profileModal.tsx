'use client'
import { AvatarForm } from '@/components/avatar-form'
import { Button } from '@/components/ui/button'
import { useUserModal } from '@/contexts/user-modal-context'

export default function ProfileModal() {
  const { isOpen, closeModal } = useUserModal()
  if (!isOpen) {
    return null
  }
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 ">
      <div className="relative w-full max-w-md bg-white p-6 rounded-xl border border-zinc-200 shadow-lg space-y-6 ">
        <div className="absolute -top-9 -right-9">
          <AvatarForm />
        </div>

        <h1 className="text-3xl font-bold text-center">Perfil</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              className="w-max bg-zinc-100 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="text"
              placeholder="Nathan Alves Camolez"
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
              placeholder="nathan.camolez@unesp.br"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium">
              Endereço:
            </label>
            <input
              className="w-full bg-zinc-100 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="text"
              placeholder="Rua Palmeiras - 12 - SP"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Senha:
            </label>
            <Button
              className="w-max bg-emerald-400 hover:bg-emerald-600 text-white py-2 rounded-md hover:cursor-pointer"
              type="button"
            >
              Alterar senha
            </Button>
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
