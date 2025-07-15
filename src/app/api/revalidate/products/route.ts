import { revalidateTag } from 'next/cache'

export async function POST() {
  revalidateTag('products')
  return Response.json({ revalidated: true })
}
