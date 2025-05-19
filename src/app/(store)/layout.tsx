import { Header } from '@/components/header'
import { CartProviver } from '@/contexts/cart-context'
import type { ReactNode } from 'react'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProviver>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 px-8 py-8">
        <Header />
        {children}
      </div>
    </CartProviver>
  )
}
