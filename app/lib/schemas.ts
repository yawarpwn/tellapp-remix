import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  description: z.string().trim().nonempty('Campo requerido'),
  price: z.coerce.number().positive(),
  cost: z.coerce.number().positive().optional(),
  link: z.string().url().optional(),
  category: z.string(),
  categoryId: z.coerce.number({
    message: 'Seleccione una categoría',
  }),
  code: z.string({
    message: 'Codigo es requerido',
  }),
  unitSize: z
    .string({
      message: 'Es requerido',
    })
    .min(3, 'El tamaño de la unidad debe tener al menos 3 caracteres'),
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
