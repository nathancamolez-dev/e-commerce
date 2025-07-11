'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export function Manager() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <>
      {user && user.role === 'ADMIN' && (
        <Link
          href="/protected/manager"
          className=" flex gap-2  ml-8 text-md hover:text-zinc-500"
        >
          Gerenciar produtos
        </Link>
      )}
    </>
  )
}
