import { env } from '@/env'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { GoogleProfile } from 'next-auth/providers/google'

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
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: '',
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, profile, user }) {
      if (user && profile) {
        token.id = profile.sub
        token.image = user.image ?? ''
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.image = token.image as string
      return session
    },
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
