import { z } from 'zod'
import {
  productSchema,
  insertProductSchema,
  updateProductSchema,
  productCategoriesSchema,
  customerSchema,
  insertCustomerSchema,
  updateCustomerSchema,
} from '@/lib/schemas'

type Prettyfy<T> = {
  [K in keyof T]: T[K]
}

export type CustomerFromService = {
  id?: string
  ruc: string
  name: string
  address?: string
  isRegular: boolean
}
export interface QuotationClient {
  id: string
  number: number
  deadline: number
  credit: number | null
  includeIgv: boolean
  isPaymentPending: boolean
  items: QuotationItem[]
  createdAt: string
  updatedAt: string
  customer: Omit<Customer, 'createdAt' | 'updatedAt' | 'id'>
  customerId?: string | null
}

export type CreateQuotationClient = Omit<
  QuotationClient,
  'id' | 'number' | 'createdAt' | 'updatedAt'
>

export type UpdateQuotationClient = Partial<CreateQuotationClient> & {
  id: string
}

// ------------------------- Products --------------------------------------->
export type Product = z.infer<typeof productSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type ProductCategory = z.infer<typeof productCategoriesSchema>

//------------------------- Customer ---------------------------------------->
export type Customer = z.infer<typeof customerSchema>
export type InsertCustomer = z.infer<typeof insertCustomerSchema>
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>

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

//---------------------------- Agencies  -------------------------------------->

export interface Agency {
  id: string
  name: string
  ruc: string
  phone: string
  address: string
  createdAt: string
  updatedAt: string
}

export type CreateAgency = Omit<Agency, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateAgency = Partial<CreateAgency>

// -------------------------- Labels  --------------------------------------//
export interface LabelType {
  id: string
  recipient: string
  destination: string
  dniRuc: string
  phone: string
  address: string
  observations: string
  agencyId?: string | null
  createdAt: string
  updatedAt: string
  agency: Agency
}

export type CreateLabel = Omit<LabelType, 'id' | 'createdAt' | 'updatedAt' | 'agency'>
export type UpdateLabel = Partial<CreateLabel>

// -------------------------- Watermark  --------------------------------------//
export type Watermark = {
  id: string
  width: number
  height: number
  url: string
  publicId: string
  format: string
  createdAt: string
  updatedAt: string
  thumbUrl: string
}
export type CreateWatermark = Omit<Watermark, 'id' | 'createdAt' | 'updatedAt' | 'thumbUrl'>
export type UpdateWatermark = Partial<CreateWatermark>

export type CloudinarySignature = {
  timestamp: number
  signature: string
  apikey: string
  cloudname: string
}
