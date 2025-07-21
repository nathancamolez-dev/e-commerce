import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  console.log(session.user)

  const data = await req.json()
  if (session.user.email) {
    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: data.name,
      },
    })
    return NextResponse.json(updated)
  }
}
