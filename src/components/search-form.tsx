'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FormEvent } from 'react'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] item-center bg-zinc-200 rounded-full gap-3 px-4 py-2  ring-zinc-900"
    >
      <Search className="w-5 h-5 text-zinc-800" />
      <input
        name="q"
        placeholder="Buscar produtos..."
        defaultValue={query ?? ''}
        type="text"
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-800"
        required
      />
    </form>
  )
}
