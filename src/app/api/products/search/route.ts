import type { NextRequest } from 'next/server'
import { z } from 'zod'
import data from '../data.json'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q'))

  if (!query) {
    const products = data.products
    return Response.json(products)
  }

  const products = data.products.filter(product => {
    return product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  })

  if (!products.length) {
    return Response.json(
      { message: 'Products with this query does not exists.' },
      { status: 400 }
    )
  }

  return Response.json(products)
}
