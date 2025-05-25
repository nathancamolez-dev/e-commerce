'use client'

import { useCart } from '@/contexts/cart-context'
import ComboboxDemo from './combobox'

export interface FormAddToCartProps {
  name: string
  productId: string
  price: number
  image: string
  options: string[]
}

export function FormAddToCart({
  productId,
  name,
  image,
  price,
  options,
}: FormAddToCartProps) {
  const { addToCart } = useCart()
  let optionSelected: string

  function handleOptionSelect(option: string) {
    optionSelected = option
  }

  function handleAddToCart() {
    addToCart(productId, name, image, price, optionSelected)
  }

  return (
    <>
      <ComboboxDemo
        optionsAvailable={options}
        name={name}
        onOptionSelect={handleOptionSelect}
      />
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-300 cursor-pointer hover:bg-emerald-400"
      >
        Adicionar ao carrinho
      </button>
    </>
  )
}
