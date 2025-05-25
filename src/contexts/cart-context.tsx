'use client'
import { createContext, useContext, useState } from 'react'

interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  option: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (
    name: string,
    image: string,
    productId: string,
    price: number,
    option: string,
    quantity?: number
  ) => void
  removeItem: (productId: string) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProviver({ children }: { children: React.ReactNode }) {
  const [cartItem, setCartItem] = useState<CartItem[]>([])

  function addToCart(
    productId: string,
    name: string,
    image: string,
    price: number,
    option: string,
    quantityMod?: number
  ) {
    setCartItem(state => {
      const productInCart = state.some(item => item.productId === productId)

      if (productInCart) {
        return state.map(item => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: quantityMod ? quantityMod : item.quantity + 1,
            }
          }
          return item
        })
      }
      return [...state, { productId, name, image, price, option, quantity: 1 }]
    })
  }

  function removeItem(productId: string) {
    setCartItem(state => {
      return state.filter(item => item.productId !== productId)
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItem, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
