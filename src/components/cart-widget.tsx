'use client'

import { useCart } from '@/contexts/cart-context'
import { ShoppingBagIcon } from 'lucide-react'

export function CartWidget() {
  const { items } = useCart()

  return (
    <div className="flex items-center gap-2">
      <ShoppingBagIcon className="h-4 w-4 hover:text-zinc-500 cursor-pointer" />
      <span className="text-sm">Cart ({items.length})</span>
    </div>
  )
}
