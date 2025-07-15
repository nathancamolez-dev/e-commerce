import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import type { GoogleProfile } from 'next-auth/providers/google'
import GoogleProvider from 'next-auth/providers/google'
import { env } from '@/env'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import { signJwtFromToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
      async profile(profile: GoogleProfile) {
        const highResImage = profile.picture.replace(/=s\d+-c$/, '=s1080-c')
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: highResImage,
          role: 'USER',
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role as 'ADMIN' | 'USER'

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  debug: true,
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
