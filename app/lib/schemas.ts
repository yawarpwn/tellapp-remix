import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  description: z.string(),
  price: z.coerce.string(),
  cost: z.coerce.string().optional(),
  link: z.string().optional(),
  category: z.string(),
  code: z.string(),
  unitSize: z.string(),
  rank: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const InsertProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateProductSchema = ProductSchema.partial()
