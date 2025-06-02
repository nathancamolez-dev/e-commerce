'use client'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export function SearchNotFound() {
  const hasToasted = useRef(false)
  useEffect(() => {
    if (!hasToasted.current) {
      toast.error('Nenhum produto encontrado.')
      hasToasted.current = true
    }
  })

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-2xl font-bold">Nenhum produto encontrado</h1>
    </div>
  )
}
