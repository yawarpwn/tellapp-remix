import { z } from 'zod'
export const productCategories = [
  'cintas seguridad',
  'obras',
  'proteccion vial',
  'fotoluminiscente',
  'seguridad',
  'viales',
  'viniles',
  'lucha contra incendio',
  'articulos seguridad',
  'epp',
  'servicio',
  'ropa seguridad',
  'convencionales',
  'acrilicos',
] as const

export const productCategoriesSchema = z.object({
  id: z.string(),
  name: z.enum(productCategories),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const productSchema = z.object({
  id: z.string(),
  description: z.string().min(10, 'Campo requerido, mínimo 10 caracteres'),
  price: z
    .number({ message: 'Campo requerido' })
    .positive('Debe ser número positivo'),
  cost: z
    .number({
      message: 'Campo requerido',
    })
    .positive('Debe se número positivo'),
  link: z.string().url().optional(),
  category: z.enum(productCategories),
  code: z.string().min(3, 'Campo requerido, mínimo 3 caracteres'),
  unitSize: z.string().min(3, 'Campo requerido, mínimo 3 caracteres'),
  rank: z.coerce.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  productId: z.number(),
  categoryId: z.string(),
})

export const insertProductSchema = productSchema.omit({
  id: true,
  rank: true,
  createdAt: true,
  updatedAt: true,
  category: true,
})

export const updateProductSchema = insertProductSchema
  .partial()
  .omit({ productId: true })
