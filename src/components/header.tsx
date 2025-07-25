import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import AccountDropDownMenu from './account-dropdown-menu'
import { CartModal } from './cart-modal'
import { Manager } from './manager'
import { SessionWatcher } from './SessionWatcher'
import { SearchForm } from './search-form'

export function Header() {
  return (
    <>
      <SessionWatcher />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-2xl font-extrabold text-zinc-900 group"
          >
            Bare
            <span className="group-hover:text-zinc-500">Made</span>
          </Link>
          <SearchForm />
          <Link
            href="/search?q="
            className=" flex gap-2  ml-8 text-md hover:text-zinc-500"
          >
            <ShoppingBag />
            Produtos{' '}
          </Link>
          <Manager />
        </div>
        <div className=" flex items-center gap-4">
          <CartModal />
          <div className="w-px h-4 " />

          <AccountDropDownMenu />
        </div>
      </div>
    </>
  )
}
