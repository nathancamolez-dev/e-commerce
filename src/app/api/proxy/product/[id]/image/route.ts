import type { NextRequest } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData()

  const proxyForm = new FormData()
  for (const [key, value] of formData.entries()) {
    proxyForm.append(key, value)
  }

  const backendRes = await fetch(
    `http://localhost:3333/product/${params.id}/image`,
    {
      method: 'PATCH',
      headers: {
        Authorization: req.headers.get('authorization') || '',
      },
      body: proxyForm,
    }
  )

  const contentType = backendRes.headers.get('content-type') || ''
  const status = backendRes.status

  if (contentType.includes('application/json')) {
    const json = await backendRes.json()
    return new Response(JSON.stringify(json), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const blob = await backendRes.blob()
  return new Response(blob, {
    status,
    headers: { 'Content-Type': contentType },
  })
}
