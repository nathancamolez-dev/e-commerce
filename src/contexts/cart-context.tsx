'use client'
import { createContext, useContext, useState } from 'react'

interface CartItem {
  cartId: string
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
  removeItem: (cartId: string) => void
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
      const productInCart = state.some(
        item => item.productId === productId && item.option === option
      )

      if (productInCart) {
        return state.map(item => {
          if (item.productId === productId && item.option === option) {
            return {
              ...item,
              quantity: quantityMod ? quantityMod : item.quantity + 1,
            }
          }
          return item
        })
      }
      return [
        ...state,
        {
          cartId: crypto.randomUUID().toString(),
          productId,
          name,
          image,
          price,
          option,
          quantity: 1,
        },
      ]
    })
  }

  function removeItem(cartId: string) {
    setCartItem(state => {
      return state.filter(item => item.cartId !== cartId)
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItem, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
