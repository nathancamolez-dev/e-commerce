import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import type { Product } from '@/data/types/product'
import type { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'

interface ProductProps {
  params: Promise<{
    slug: string
  }>
}

async function getProductDetails(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = await response.json()

  return product
}

export async function generateMetadata(props: ProductProps): Promise<Metadata> {
  const params = await props.params
  const slug = z.string().parse(params.slug)
  const product = await getProductDetails(slug)

  return {
    title: product.title,
  }
}

export async function generatStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map(product => {
    return { slug: product.slug }
  })
}

export default async function ProductPage(props: ProductProps) {
  const params = await props.params
  const slug = z.string().parse(params.slug)
  const product = await getProductDetails(slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          className="rounded-lg"
          src={product.image}
          alt=""
          width={750}
          height={700}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-600">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block  rounded-full bg-violet-200 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className="text-sm text-zinc-500">
            Em 12x de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}{' '}
            s/ juros.
          </span>
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
        <AddToCartButton
          productId={product.id}
          name={product.title}
          image={product.image}
          price={product.price}
        />
      </div>
    </div>
  )
}
