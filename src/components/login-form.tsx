'use client'
import { useAuth } from '@/contexts/login-context'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

export default function LoginForm() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      if (localStorage.getItem('redirect') !== null) {
        router.push(localStorage.getItem('redirect') as string)
        localStorage.removeItem('redirect')
      } else {
        router.push('/')
      }
    }
  })

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    try {
      signIn('google')
      toast.success('Login realizado com sucesso')
    } catch (error) {
      toast.error('Erro ao fazer login')
    }
  }

  return (
    <Button
      type="button"
      className="mt-6 bg-emerald-600 hover:bg-emerald-700"
      onClick={() => signIn('google')}
    >
      Entrar com o Google
    </Button>
  )
}
