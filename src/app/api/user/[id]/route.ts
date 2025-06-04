import type { NextRequest } from 'next/server'
import { z } from 'zod'
import users from '../users.json'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = z.string().parse(params.id)

  const profileDetails = users.profiles.find(profile => profile.id === id)

  if (!profileDetails) {
    return Response.json({ message: 'Product not found' }, { status: 400 })
  }

  return Response.json(profileDetails)
}
