import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href="/"
        className="relative group col-span-5 row-span-6 rounded-lg bg-zinc-50 overflow-hidden flex  justify-center items-end"
      >
        <Image
          src="/bolsa1.png"
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          alt="Product"
          quality={100}
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-zinc-50/60 p-1 pl-5">
          <span className="text-sm truncate">Bolsa de croche</span>
          <span className="flex h-full items-center justify-center rounded-full bg-zinc-100 px-4 font-semibold">
            399,88
          </span>
        </div>
      </Link>

      <Link
        href="/"
        className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-50 overflow-hidden flex  justify-center items-end"
      >
        <Image
          src="/bolsa2.png"
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          alt="Product"
          quality={100}
        />
        <div className="absolute bottom-10 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-zinc-50/60 p-1 pl-5">
          <span className="text-sm truncate">Bolsa de croche</span>
          <span className="flex h-full items-center justify-center rounded-full bg-zinc-100 px-4 font-semibold">
            399,88
          </span>
        </div>
      </Link>

      <Link
        href="/"
        className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-50 overflow-hidden flex  justify-center items-end"
      >
        <Image
          src="/bolsa2.png"
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          alt="Product"
          quality={100}
        />
        <div className="absolute bottom-10 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-zinc-50/60 p-1 pl-5">
          <span className="text-sm truncate">Bolsa de croche</span>
          <span className="flex h-full items-center justify-center rounded-full bg-zinc-100 px-4 font-semibold">
            399,88
          </span>
        </div>
      </Link>
    </div>
  )
}
