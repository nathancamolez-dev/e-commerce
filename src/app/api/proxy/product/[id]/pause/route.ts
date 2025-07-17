import type { NextRequest } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const auth = req.headers.get('authorization')

  const backEndURL = new URL(`http://localhost:3333/product/${id}/pause`)

  const res = await fetch(backEndURL.toString(), {
    method: 'PUT',
    headers: {
      authorization: auth || '',
    },
    cache: 'no-cache',
  })

  return new Response(null, { status: res.status })
}
