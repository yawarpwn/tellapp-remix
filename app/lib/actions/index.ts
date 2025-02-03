import { HTTPRequestError } from '@/lib/errors'
import { fakePromise, fetchData } from '@/lib/utils'
import type {
  CreateQuotationClient,
  Product,
  QuotationClient,
  UpdateProduct,
  UpdateQuotationClient,
} from '@/types'
import { fetchQuotaitonByNumber } from '@/lib/data'
import { BASE_URL } from '@/lib/constants'
import type { Customer, InsertProduct } from '@/types'

export async function deleteQuotationAction(quotationNumber: number) {
  const url = `${BASE_URL}/api/quotations/${quotationNumber}`
  const data = await fetchData<Customer>(url, {
    method: 'DELETE',
  })
  return data
}

export async function createQuotationAction(
  newQuotation: CreateQuotationClient
) {
  const url = `${BASE_URL}/api/quotations`
  const data = await fetchData<{ insertedNumber: number }>(url, {
    method: 'POST',
    body: JSON.stringify(newQuotation),
  })

  return data.insertedNumber
}

export async function updateQuotationAction(
  quotationToUpdate: UpdateQuotationClient
) {
  const url = `${BASE_URL}/api/quotations/${quotationToUpdate.id}`
  console.log({ url, quotationToUpdate })
  const updateQuotation = await fetchData<QuotationClient>(url, {
    method: 'PUT',
    body: JSON.stringify(quotationToUpdate),
  })

  return updateQuotation
}

export async function duplicateQuotationAction(quotationNumber: number) {
  const quotation = await fetchQuotaitonByNumber(quotationNumber)
  const insertedQuotationNumber = await createQuotationAction({
    ...quotation,
  })
  return insertedQuotationNumber
}

export async function createProductAction(productToInsert: InsertProduct) {
  const url = `${BASE_URL}/api/products`
  const data = await fetchData<Product>(url, {
    method: 'POST',
    body: JSON.stringify(productToInsert),
  })
  return data
}

export async function updateProductAction(
  id: string,
  productToUpdate: UpdateProduct
) {
  console.log('update product action')
  const url = `${BASE_URL}/api/products/${id}`
  const updatedProduct = await fetchData<Product>(url, {
    method: 'PUT',
    body: JSON.stringify(productToUpdate),
  })

  return updatedProduct
}

export async function deleteProductAction(id: string) {
  const url = `${BASE_URL}/api/products/${id}`
  const data = await fetchData<Product>(url, {
    method: 'DELETE',
  })
  return data
}
