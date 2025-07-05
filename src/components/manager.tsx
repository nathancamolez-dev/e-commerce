'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function Manager() {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <>
      {user && (
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
