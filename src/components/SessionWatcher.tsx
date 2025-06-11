'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export function SessionWatcher() {
  const { status } = useSession()
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (status === 'authenticated' && !hasShownToast.current) {
      console.log('Funciona')
      toast.success('Login efetuado com sucesso')
      hasShownToast.current = true
    }
  }, [status])

  return null
}
