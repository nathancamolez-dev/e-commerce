import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default async function Login() {
  return (
    <div className="flex  space-between items-center justify-start gap-28 h-screen pr-28">
      <Image
        src="/login-image.png"
        width={960}
        height={1080}
        alt="Login image"
        quality={100}
      />
      <div className="w-[400px] h-[400px] flex flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl font-bold">Login</h1>
        <form action="">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              name="email"
              className="w-full bg-zinc-200 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="Email"
            />
            <label htmlFor="email" className="block text-sm font-medium">
              Senha:
            </label>
            <input
              name="password"
              className="w-full bg-zinc-200 rounded-md px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
            />
          </div>
          <div className="flex justify-end">
            <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
