import { BASE_URL } from '@/lib/constants'

import type { DataResponse, QuotationClient, Customer, Product } from '@/types'
import { fetchData } from '@/lib/utils'
import { getCompanybyRuc } from '@/lib/services/sunat'
import { HTTPRequestError } from '@/lib/errors'
import { fakePromise } from '@/lib/utils'

export async function fetchQuotations(): Promise<QuotationClient[]> {
  console.log('fetch quotations')
  const url = `${BASE_URL}/api/quotations`
  const data = await fetchData<DataResponse<QuotationClient>>(url)
  console.log(data.items)
  return data.items
}

export async function fetchQuotaitonByNumber(quotationNumber: number) {
  const url = `${BASE_URL}/api/quotations/${quotationNumber}`
  const data = await fetchData<QuotationClient>(url)
  return data
}

type FetchCustomerOptions = {
  onlyRegular?: boolean
}
export async function fetchCustomers(
  options?: FetchCustomerOptions
): Promise<Customer[]> {
  const { onlyRegular = false } = options ?? {}
  const url = `${BASE_URL}/api/customers`
  const data = await fetchData<DataResponse<Customer>>(url)
  return onlyRegular
    ? data.items.filter((customer) => customer.isRegular)
    : data.items
}

export async function fetchProducts(): Promise<Product[]> {
  await fakePromise(2000)
  const url = `${BASE_URL}/api/products`
  const data = await fetchData<DataResponse<Product>>(url)
  return data.items
}

type CustomerFromService = {
  id?: string
  ruc: string
  name: string
  address?: string
}

export async function fetchCustomerByRuc(
  ruc: string
): Promise<CustomerFromService> {
  if (ruc.length !== 11) {
    throw new HTTPRequestError('El Ruc Debe tener 11 digitos')
  }

  try {
    //Search customer in Database
    const url = `${BASE_URL}/api/customers/${ruc}`
    const customerFromDatabase = await fetchData<Customer>(url)
    return {
      id: customerFromDatabase.id,
      ruc: customerFromDatabase.ruc,
      name: customerFromDatabase.name,
      address: customerFromDatabase.address ?? undefined,
    }
  } catch (error) {
    //Search customer in Sunat
    const customerFromSunat = await getCompanybyRuc(ruc)
    return {
      id: undefined,
      ruc: customerFromSunat.ruc,
      name: customerFromSunat.company,
      address: customerFromSunat.address,
    }
  }
}
