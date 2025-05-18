import { z } from 'zod'
import data from '../data.json'
export async function GET({ params }: { params: { slug: string } }) {
  const slug = z.string().parse(params.slug)

  const productDetails = data.products.find(product => product.slug === slug)

  if (!productDetails) {
    return Response.json({ message: 'Product not found' }, { status: 400 })
  }

  return Response.json(productDetails)
}
