'use client'

import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addProductFormSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome do produto precisa ter no mínimo 3 caracteres',
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: 'O preço precisa ser maior que R$ 0,01' }),
  description: z.string().optional(),
  image: z.string().min(1, {
    message: 'A imagem é obrigatória',
  }),
})

type AddProductFormSchema = z.infer<typeof addProductFormSchema>

export function AddProductForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddProductFormSchema>({
    resolver: zodResolver(addProductFormSchema),
  })

  useEffect(() => {
    register('image')
  }, [register])

  async function handleAddProduct(data: AddProductFormSchema) {
    console.log(data)
    // Aqui você faria o upload da imagem para o seu backend
    // e obteria a URL final para salvar no banco de dados.
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files || files.length === 0) {
      return
    }
    const file = files[0]
    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
    setValue('image', previewURL, { shouldValidate: true })
  }

  return (
    <div className="flex flex-row gap-20 items-center">
      <Image
        src={preview ?? '/icon.png'}
        alt="Product image"
        width={400}
        height={400}
        className="w-[400px] h-[400px] resize"
      />
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="relative flex flex-col  gap-4 w-[480px]"
      >
        <div className="justify-center">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome do produto</label>
            <input
              id="name"
              type="text"
              className="border border-zinc-300 rounded-md p-2"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              type="number"
              step="0.01"
              className="border border-zinc-300 rounded-md p-2"
              {...register('price')}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              className="border border-zinc-300 rounded-md p-2"
              {...register('description')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="image">Imagem do produto</label>
            <input
              id="image"
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              Procurar imagem
            </Button>
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button type="submit">Adicionar produto</Button>
        </div>
      </form>
    </div>
  )
}
