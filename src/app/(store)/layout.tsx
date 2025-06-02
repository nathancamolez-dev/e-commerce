import { Header } from '@/components/header'
import ProfileModal from '@/components/profileModal'
import { CartProviver } from '@/contexts/cart-context'
import { UserModalProvider } from '@/contexts/user-modal-context'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProviver>
      <UserModalProvider>
        <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 px-8 py-8">
          <Header />
          {children}
          <ProfileModal />
          <Toaster richColors />
        </div>
      </UserModalProvider>
    </CartProviver>
  )
}
