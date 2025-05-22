'use client'

import { useCart } from '@/contexts/cart-context'

export interface AddToCartButtonProps {
  name: string
  productId: string
  image: string
  price: number
}

export function AddToCartButton({
  productId,
  name,
  image,
  price,
}: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(productId, name, image, price)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-300 cursor-pointer hover:bg-emerald-400"
    >
      Adicionar ao carrinho
    </button>
  )
}
