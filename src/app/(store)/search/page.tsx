import Image from 'next/image'
import Link from 'next/link'

export default function Search() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">Bolsa</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Link
          href={'/product/bacia-redonda'}
          className="group relative  rounded-lg bg-zinc-50 overflow-hidden flex  justify-center items-end"
        >
          <Image
            src="/bacia.png"
            className="group-hover:scale-105 transition-transform duration-500"
            width={480}
            height={480}
            alt="Product"
            quality={100}
          />
          <div className="absolute bottom-10 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-violet-200/60 p-1 pl-5">
            <span className="text-sm truncate">Bacia Redonda</span>
            <span className="flex h-full items-center justify-center rounded-full bg-zinc-100 px-4 font-semibold">
              {Number(39.9).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
