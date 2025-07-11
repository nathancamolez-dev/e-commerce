import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/data/api'
import type { Product } from '@/data/types/product'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="relative group col-span-5 row-span-6 rounded-lg bg-zinc-50 overflow-hidden flex  justify-center items-end"
      >
        <Image
          src={highlightedProduct.image_url}
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          alt="Product"
          quality={100}
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-violet-200/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-zinc-100 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map(product => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-50 overflow-hidden flex  justify-center items-end"
          >
            <Image
              src={product.image_url}
              className="group-hover:scale-105 transition-transform duration-500"
              width={920}
              height={920}
              alt="Product"
              quality={100}
            />
            <div className="absolute bottom-10 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-violet-200/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-zinc-100 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
