import type { NextRequest } from 'next/server'
import data from './users.json'

interface LoginProps {
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginProps
  const { email, password } = body

  if (!email || !password) {
    return Response.json(
      { message: 'Email and password are required' },
      { status: 400 }
    )
  }

  const user = data.profiles.find(profile => profile.email === email)

  if (user && user.password === password) {
    return Response.json({ user }, { status: 200 })
  }
  return Response.json({ status: 401 })
}
