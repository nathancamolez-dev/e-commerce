import jwt from 'jsonwebtoken'
import { env } from '@/env'

interface TokenPayload {
  id: string
  role: 'ADMIN' | 'USER'
}

export function signJwtFromToken(payload: TokenPayload) {
  const token = jwt.sign(payload, env.NEXTAUTH_SECRET, {
    expiresIn: '7d',
  })

  return token
}
