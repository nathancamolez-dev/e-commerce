'use client'
import { useAuth } from '@/contexts/login-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const router = useRouter()

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement>,
    email: string,
    password: string
  ) {
    event.preventDefault()
    const response = await login(email, password)

    if (response === 'ok') {
      toast.success('Login efetuado com sucesso.')

      if (localStorage.getItem('redirect')) {
        router.push(localStorage.getItem('redirect') as string)
        localStorage.removeItem('redirect')
      } else {
        router.push('/')
      }
    } else if (response === 'error') {
      toast.error('Email ou senha invalidos.')
    }
  }

  return (
    <form action="">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email:
        </label>
        <input
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-zinc-200 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="Email"
        />
        <label htmlFor="email" className="block text-sm font-medium">
          Senha:
        </label>
        <input
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-zinc-200 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="password"
          placeholder=""
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="mt-6 bg-emerald-600 hover:bg-emerald-700"
          onClick={e => handleSubmit(e, email, password)}
        >
          Login
        </Button>
      </div>
    </form>
  )
}
