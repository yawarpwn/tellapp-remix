import { BASE_URL } from '@/lib/constants'

import type { DataResponse, QuotationClient, Customer, Product } from '@/types'
import { fetchData } from '@/lib/utils'
import { getCompanybyRuc } from '@/lib/services/sunat'
import { HTTPRequestError } from '@/lib/errors'

async function fakePromise(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export async function fetchQuotations(): Promise<QuotationClient[]> {
  const url = `${BASE_URL}/api/quotations`
  const data = await fetchData<DataResponse<QuotationClient>>(url)
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

  const url = `${BASE_URL}/api/customers/${ruc}`
  //Search customer in Database
  const customerFromDatabase = await fetchData<Customer>(url)
  console.log({ customerFromDatabase })

  if (customerFromDatabase?.id) {
    return {
      id: customerFromDatabase.id,
      ruc: customerFromDatabase.ruc,
      name: customerFromDatabase.name,
      address: customerFromDatabase.address ?? undefined,
    }
  }

  //Search customer in Sunat
  const customerFromSunat = await getCompanybyRuc(ruc)
  return {
    id: undefined,
    ruc: customerFromSunat.ruc,
    name: customerFromSunat.company,
    address: customerFromSunat.address,
  }

  // const customer = {
  //   ruc: "20610555536",
  //   name: "TELL SENALES  SOCIEDAD ANONIMA CERRADa",
  //   address: "Maquinaria 325 - Callao",
  // };
  //
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(customerFromDatabase);
  //   }, 1000);
  // });
}
