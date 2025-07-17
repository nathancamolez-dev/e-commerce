import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const token = req.headers.get('authorization')

  const response = await fetch('http://localhost:3333/product', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: token ? token : '',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
