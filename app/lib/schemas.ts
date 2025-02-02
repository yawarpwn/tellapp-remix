import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(10, 'El producto debe tener al menos 10 caracteres'),
  price: z.coerce.number().positive(),
  cost: z.coerce.number().optional(),
  link: z.string().url().optional(),
  category: z.string(),
  categoryId: z.coerce.number({
    message: 'Seleccione una categoría',
  }),
  code: z.string(),
  unitSize: z.string(),
  rank: z.coerce.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertProductSchema = productSchema.omit({
  id: true,
  rank: true,
  category: true,
  createdAt: true,
  updatedAt: true,
})

export const updateProductSchema = productSchema.partial()
