import { revalidateTag } from 'next/cache'

export async function POST() {
  revalidateTag('user')
  return Response.json({ revalidated: true })
}
