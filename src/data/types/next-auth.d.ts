declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      email: string
      image: string
      role: string
    }
  }

  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
  }
}
