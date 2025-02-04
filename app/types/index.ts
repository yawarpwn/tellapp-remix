import { z } from 'zod'
import {
  productSchema,
  insertProductSchema,
  updateProductSchema,
  productCategoriesSchema,
} from '@/lib/schemas'

type Prettyfy<T> = {
  [K in keyof T]: T[K]
}

export type CustomerFromService = {
  id?: string
  ruc: string
  name: string
  address?: string
}
export interface QuotationClient {
  id: string
  number: number
  deadline: number
  credit: number | null
  includeIgv: boolean
  isPaymentPending: boolean
  items: QuotationItem[]
  createdAt: Date
  updatedAt: Date
  customer: Omit<Customer, 'createdAt' | 'updatedAt'>
  customerId?: string | null
}

export type CreateQuotationClient = Omit<
  QuotationClient,
  'id' | 'number' | 'createdAt' | 'updatedAt'
>

export type UpdateQuotationClient = Partial<CreateQuotationClient> & {
  id: string
}

export interface Customer {
  id: string
  name: string
  ruc: string
  phone?: string | null
  address?: string | null
  email?: string | null
  isRegular: boolean
  createdAt: Date
  updatedAt: Date
}

export type Product = z.infer<typeof productSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type ProductCategory = z.infer<typeof productCategoriesSchema>

export interface QuotationItem {
  id: string
  description: string
  price: number
  cost?: number
  link?: string | null
  qty: number
  code: string
  unitSize: string
}
export interface DataResponse<T> {
  items: T[]
  meta: Meta
  links: Links
}

export interface Links {}

export interface Meta {
  totalItems: number
}

export type FieldErrorsProps = {
  errors: {
    [key: string]: string[]
  }
  name: string
}
