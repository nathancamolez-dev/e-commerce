import type { NextRequest } from 'next/server'
import { z } from 'zod'
import data from '../data.json'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = z.string().parse(params.slug)

  const productDetails = data.products.find(product => product.slug === slug)

  if (!productDetails) {
    return Response.json({ message: 'Product not found' }, { status: 400 })
  }

  return Response.json(productDetails)
}
