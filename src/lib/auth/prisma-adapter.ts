// lib/auth/prisma-adapter.ts

import type { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import type { Account } from 'next-auth'
import type { Adapter, AdapterUser } from 'next-auth/adapters'

type PrismaUser = {
  id: string
  name: string
  email: string | null
  image: string | null
}

const toAdapterUser = (user: PrismaUser): AdapterUser => ({
  id: user.id,
  name: user.name,
  email: user.email!,
  emailVerified: null,
  image: user.image!,
})

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(data) {
      const cookieStore = await cookies()
      const userIdOnCookies = cookieStore.get('@baremade:userId')?.value

      if (!userIdOnCookies) {
        const user = await prisma.user.create({
          data: {
            name: data.name!,
            email: data.email,
            image: data.image,
          },
        })

        return toAdapterUser(user)
      }

      const updatedUser = await prisma.user.update({
        where: { id: userIdOnCookies },
        data: {
          name: data.name!,
          email: data.email,
          image: data.image,
        },
      })

      // Remove cookie no App Router
      cookieStore.delete('@baremade:userId')

      return toAdapterUser(updatedUser)
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id } })
      return user ? toAdapterUser(user) : null
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({ where: { email } })
      return user ? toAdapterUser(user) : null
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: { provider, providerAccountId },
        },
        include: { user: true },
      })
      return account ? toAdapterUser(account.user) : null
    },

    async updateUser(user) {
      if (!user.id) throw new Error('User ID is required for update.')

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name ?? undefined,
          email: user.email ?? undefined,
          image: user.image ?? undefined,
        },
      })

      return toAdapterUser(updatedUser)
    },

    async deleteUser(userId) {
      await prisma.user.delete({ where: { id: userId } })
    },

    async linkAccount(account: Account) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: { sessionToken, userId, expires },
      })

      return { sessionToken, userId, expires }
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      })

      if (!session) return null

      const { user, ...sessionData } = session

      return {
        session: {
          sessionToken: sessionData.sessionToken,
          userId: sessionData.userId,
          expires: sessionData.expires,
        },
        user: toAdapterUser(user),
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const updatedSession = await prisma.session.update({
        where: { sessionToken },
        data: {
          userId,
          expires,
        },
      })

      return {
        sessionToken: updatedSession.sessionToken,
        userId: updatedSession.userId,
        expires: updatedSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({ where: { sessionToken } })
    },
  }
}
