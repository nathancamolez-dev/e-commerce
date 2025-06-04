'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function LoginButton() {
  const router = useRouter()
  function handleSubmit() {
    router.push('/')
  }
  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        onClick={handleSubmit}
        className="mt-6 bg-emerald-600 hover:bg-emerald-700"
      >
        Login
      </Button>
    </div>
  )
}
