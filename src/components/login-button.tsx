'use client'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
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
    await signIn('google', { redirect: false })
  }

  return (
    <Button
      type="button"
      className="mt-6 bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer"
      onClick={handleSubmit}
    >
      Entrar com o Google
    </Button>
  )
}
