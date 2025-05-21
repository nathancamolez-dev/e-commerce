import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartWidget } from './cart-widget'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-zinc-900 group">
          Bare
          <span className="group-hover:text-zinc-500">Made</span>
        </Link>
        <form
          action=""
          className="flex w-[320px] item-center bg-zinc-200 rounded-full gap-3 px-4 py-2  ring-zinc-900"
        >
          <Search className="w-5 h-5 text-zinc-800" />
          <input
            placeholder="Buscar produtos..."
            type="text"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-800"
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <CartWidget />
        <div className="w-px h-4 " />

        <Link
          href="/"
          className=" flex gap-2 text-xl font-semibold text-zinc-900 hover:text-zinc-500"
        >
          <span className="text-sm">Account</span>
          <Image
            className="h-6 w-6 rounded-full"
            src="https://github.com/nathancamolez-dev.png"
            alt="Profile picture"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  )
}
