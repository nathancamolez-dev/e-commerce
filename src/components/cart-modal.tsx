'use client'

import { useCart } from '@/contexts/cart-context'
import {
  BrushCleaning,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export function CartModal() {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const { items, addToCart, removeItem, subTotal, clearCart } = useCart()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  function updateQuantity(cartId: string, quantity: number) {
    const item = items.find(item => item.cartId === cartId)
    if (!item) {
      return
    }

    addToCart(
      item.productId,
      item.name,
      item.image,
      item.price,
      item.option,
      quantity
    )
  }

  function handleRemoveItem(cartId: string) {
    removeItem(cartId)
  }

  function handleClearCart() {
    clearCart()
  }

  return (
    <>
      <button
        type="button"
        className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm">Cart ({items.length})</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white/50 z-50 flex justify-end">
          <div
            ref={modalRef}
            className="bg-white  w-full max-w-md h-full flex flex-col shadow-lg animate-in slide-in-from-right"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                Seu carrinho ({items.length} items)
              </h2>
              <button type="button" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Seu carrinho está vazio</p>
                <p className="text-muted-foreground mt-1">
                  Adicione itens ao seu carrinho para continuar.
                </p>
                <div className="pt-8 gap-4">
                  <button
                    type="button"
                    className="border bg-emerald-300  p-2 rounded-md cursor-pointer hover:bg-emerald-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue comprando.
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto p-4">
                  {items.map(item => (
                    <div
                      key={item.cartId}
                      className="flex gap-4 py-4 border-b last:border-0"
                    >
                      <div className="shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1 gap-1">
                        <h3 className="font-medium">
                          {item.name} - {item.option}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                        <div className="flex items-center gap-2 mt-auto">
                          <button
                            type="button"
                            className="border flex justify-center items-center h-8 w-8 rounded-md cursor-pointer hover:bg-zinc-100 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              updateQuantity(item.cartId, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="border flex justify-center items-center h-8 w-8 rounded-md cursor-pointer hover:bg-zinc-100"
                            onClick={() =>
                              updateQuantity(item.cartId, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            className="border flex justify-center items-center h-8 w-8 rounded-md bg-red-300/55 hover:bg-red-300 cursor-pointer"
                            onClick={() =>
                              handleRemoveItem(item.cartId as string)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-cetner justify-center ">
                    <button
                      type="button"
                      onClick={handleClearCart}
                      className="mt-4 flex p-1 gap-2 h-12 w-42 items-center justify-center rounded-full bg-rose-300 cursor-pointer hover:bg-rose-400"
                    >
                      <BrushCleaning className="h-4 w-4" />
                      Limpar carrinho
                    </button>
                  </div>
                </div>
                <div className="border-t p-4">
                  <div className="flex justify-between py-2">
                    <span>Subtotal</span>
                    <span>
                      {subTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 my-4" />
                  <div className="flex justify-between py-2 font-medium">
                    <span>Total</span>
                    <span>
                      {subTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('Pagando ', items, subTotal)
                      }}
                      className="mt-8 flex h-12 w-32 items-center justify-center rounded-full bg-emerald-300 cursor-pointer hover:bg-emerald-400"
                    >
                      Pagamento
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
