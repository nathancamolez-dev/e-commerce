import z from 'zod'

export const addProductFormSchema = z.object({
  title: z.string().min(3, {
    message: 'O nome do produto precisa ter no mínimo 3 caracteres',
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: 'O preço precisa ser maior que R$ 0,01' }),
  description: z.string().optional(),
  featured: z.boolean(),
  image: z
    .instanceof(File)
    .refine(file => file.type.startsWith('image/'), {
      message: 'Envie uma imagem valida',
    })
    .nullable(),
  options: z.array(z.string()).min(1, {
    message: 'É obrigatorio o produto oferecer pelo menos uma opção',
  }),
})
