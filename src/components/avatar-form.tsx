'use client'
import { SwitchCameraIcon } from 'lucide-react'
import Image from 'next/image'
import { type ChangeEvent, useRef, useState } from 'react'

export function AvatarForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [avatarURL, setAvatarURL] = useState<string>(
    'https://github.com/nathancamolez-dev.png'
  )
  function handleAvatarChange() {
    fileInputRef.current?.click()
  }
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setAvatarURL(objectUrl)
    }
  }
  return (
    <div className=" group w-max flex items-center justify-center gap-6">
      <Image
        id="avatar"
        className="h-48 w-48 rounded-full"
        src={avatarURL}
        alt="Profile picture"
        width={1080}
        height={1920}
        quality={100}
      />
      <button
        type="button"
        onClick={handleAvatarChange}
        className="absolute flex  justify-center items-center opacity-0 hover:opacity-100 h-48 w-48 hover:cursor-pointer group-hover:bg-zinc-900/80 rounded-full transition"
      >
        <SwitchCameraIcon
          className="h-8 jutify-center items-center w-8"
          color="white"
        />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
