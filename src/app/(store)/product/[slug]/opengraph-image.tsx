import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'
import { api } from '@/data/api'
import type { Product } from '@/data/types/product'
import { env } from '@/env'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProductDetails(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: ['produtc-detail'],
    },
  })

  const product = await response.json()

  return product
}
// Image generation
export default async function OgImage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const product = await getProductDetails(params.slug)

  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        background: colors.zinc[950],
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img src={productImageURL} alt="" style={{ width: '100%' }} />
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
