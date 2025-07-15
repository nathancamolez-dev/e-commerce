import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    jwt: string
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
  }
}
