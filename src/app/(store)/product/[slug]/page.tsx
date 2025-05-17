import Image from 'next/image'

export default function ProductPage() {
  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src="/bolsa2.png"
          alt=""
          width={750}
          height={700}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">Bolsa</h1>

        <p className="mt-2 leading-relaxed text-zinc-600">
          Bolsa com o formato de rosa.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block  rounded-full bg-violet-200 px-5 py-2.5 font-semibold">
            R$399,90
          </span>
          <span className="text-sm text-zinc-500">Em 12x s/ juros.</span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Opções</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-100 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-100 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-100 text-sm font-semibold"
            >
              G
            </button>
          </div>
        </div>
        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-300"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}
