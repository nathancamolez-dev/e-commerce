'use client'

import { useCart } from '@/contexts/cart-context'
import { useAuth } from '@/contexts/login-context'
import { useState } from 'react'
import { toast } from 'sonner'
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
  const { user } = useAuth()
  const [optionSelected, setOptionSelected] = useState('')

  function handleOptionSelect(option: string) {
    setOptionSelected(option)
  }

  function handleAddToCart() {
    if (!user) {
      toast.error('Por favor faça login para usar o carrinho')
      return
    }
    addToCart(productId, name, image, price, optionSelected)
    toast.success('Item adicionado ao carrinho')
  }

  return (
    <>
      <ComboboxDemo
        optionsAvailable={options}
        name={name}
        onOptionSelect={handleOptionSelect}
        required={true}
      />
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-300 cursor-pointer hover:bg-emerald-400 disabled:bg-emerald-700 disabled:cursor-not-allowed"
        disabled={!optionSelected}
      >
        Adicionar ao carrinho
      </button>
    </>
  )
}
