import LoginForm from '@/components/login-form'
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
        <LoginForm />
      </div>
    </div>
  )
}
