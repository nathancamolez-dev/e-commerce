import { AvatarForm } from '@/components/avatar-form'
import { Button } from '@/components/ui/button'

export default async function ProfilePage() {
  return (
    <div className="grid pl-100 pt-15 gap-4">
      <div className="w-max flex items-center justify-center gap-6">
        <AvatarForm />
        <h1 className="text-4xl font-bold leading-tight pt-24">Perfil:</h1>
      </div>
      <form action="">
        <div className="pl-52 gap-8 h-4 ">
          <div className="grid flex-col gap-2 pb-8">
            <label htmlFor="name">Nome:</label>
            <input
              className=" bg-zinc-200/50 w-max rounded-sm  placeholder-zinc-900 pl-1"
              type="text"
              placeholder="Nathan Alves Camolez"
            />
          </div>

          <div className="grid flex-col gap-2 pb-8">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              className=" bg-zinc-200/50 w-max rounded-sm  placeholder-zinc-900 pl-1"
              type="email"
              placeholder="nathan.camolez@unesp.br"
            />
          </div>

          <div className="grid flex-col gap-2 pb-8">
            <label htmlFor="address">Endereço:</label>
            <input
              className=" bg-zinc-200/50 w-max rounded-sm  placeholder-zinc-900 pl-1"
              type="text"
              placeholder="Rua Palmeiras - 12 - SP"
            />
          </div>
          <div className=" grid flex-col gap-2 pb-8">
            <label htmlFor="address">Senha:</label>
            <Button
              className="items-center justify-center w-max bg-emerald-500 hover:bg-emerald-600 hover:cursor-pointer"
              type="button"
            >
              Alterar senha
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
