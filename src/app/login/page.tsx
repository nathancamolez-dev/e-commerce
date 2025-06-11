import LoginButton from '@/components/login-button'
import Image from 'next/image'

export default async function Login() {
  return (
    <div className="flex flex-col space-between items-center justify-start gap-1 h-screen pt-12 ">
      <Image
        src="/logo.png"
        width={240}
        height={240}
        alt="Login image"
        quality={100}
      />
      <div className="w-[400px] h-[400px] flex flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl font-bold">Login</h1>
        <LoginButton />
      </div>
    </div>
  )
}
