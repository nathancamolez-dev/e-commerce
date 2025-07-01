import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL_TEST: z.string().url(),
  APP_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors
  )

  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
