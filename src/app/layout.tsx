import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { Toaster } from 'sonner'
import { authOptions } from './api/auth/[...nextauth]/route'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | BareMade',
    default: 'BareMade',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="pt">
      <body className={'bg-zinc-50 text-zinc-900 antialiased'}>
        <SessionProvider session={session}>
          {children}
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  )
}
