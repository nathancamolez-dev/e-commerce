import LoginButton from '@/components/login-button'
import Image from 'next/image'

export default async function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-zinc-50 px-6 py-12 gap-12">
      <div className="flex-shrink-0">
        <Image
          src="/logo.png"
          alt="BareMade Logo"
          width={280}
          height={280}
          className="w-auto h-auto"
        />
      </div>

      <div className="text-left max-w-md">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Login</h1>
        <p className="text-zinc-600 text-lg mb-6">
          Faça o login para continuar. Utilizando apenas seu email Google para
          melhorar ainda mais sua experiência.
        </p>
        <div className="text-right">
          <LoginButton />
        </div>
      </div>
    </div>
  )
}
