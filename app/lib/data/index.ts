import { BASE_URL } from '@/lib/constants'

import type {
  DataResponse,
  QuotationClient,
  Customer,
  Product,
  ProductCategory,
  CustomerFromService,
  UpdateCustomer,
  Agency,
  LabelType,
  CreateAgency,
  CreateLabel,
} from '@/types'
import { fetchData } from '@/lib/utils'
import { getCompanybyRuc, getCustomerByDni } from '@/lib/services/sunat'
import { HTTPRequestError } from '@/lib/errors'
import { fakePromise } from '@/lib/utils'

//----------------------------- Quotations ----------------------------->
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

//----------------------------- Customers ----------------------------->
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

export async function fetchCustomerByRuc(
  ruc: string
): Promise<CustomerFromService> {
  if (ruc.length === 11) {
    try {
      //Search customer in Database
      const url = `${BASE_URL}/api/customers/ruc/${ruc}`
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

  if (ruc.length === 8) {
    try {
      const customer = await getCustomerByDni(ruc)
      return {
        ruc: customer.ruc,
        name: customer.company,
        address: customer.address,
      }
    } catch (error) {
      console.log(error)
    }
  }
  throw new HTTPRequestError('El Ruc Debe tener 11 digitos')
}

export async function fetchCustomerById(id: string) {
  const url = `${BASE_URL}/api/customers/${id}`
  const data = fetchData<Customer>(url)
  return data
}

export async function updateCustomer(
  id: string,
  customerToUpdate: UpdateCustomer
) {
  const url = `${BASE_URL}/api/customers/${id}`
  const data = await fetchData<Customer>(url, {
    method: 'PUT',
    body: JSON.stringify(customerToUpdate),
  })
  return data
}

//----------------------------- Products ----------------------------->
export async function fetchProducts(): Promise<Product[]> {
  const url = `${BASE_URL}/api/products`
  const data = await fetchData<DataResponse<Product>>(url)
  return data.items
}

export async function fetchProductById(id: string): Promise<Product> {
  const url = `${BASE_URL}/api/products/${id}`
  const data = await fetchData<Product>(url)
  return data
}

export async function fetchProductCategories() {
  const url = `${BASE_URL}/api/product-categories`
  const data = await fetchData<DataResponse<ProductCategory>>(url)
  return data.items
}

//Auth
export async function login(email: string, password: string) {
  const url = `${BASE_URL}/api/auth/login`
  const data = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())

  return data
}

//----------------------------- Agencies ----------------------------->
export async function fetchAgencies(): Promise<Agency[]> {
  const url = `${BASE_URL}/api/agencies`
  const data = await fetchData<DataResponse<Agency>>(url)
  return data.items
}

export async function fetchAgencyById(id: string) {
  const url = `${BASE_URL}/api/agencies/${id}`
  const data = await fetchData<Agency>(url)
  return data
}

export async function createAgency(agencyToCreate: CreateAgency) {
  const url = `${BASE_URL}/api/agencies`
  const data = await fetchData<Agency>(url, {
    method: 'POST',
    body: JSON.stringify(agencyToCreate),
  })
  return data
}

export async function updateAgency(id: string, agencyToUpdate: Agency) {
  const url = `${BASE_URL}/api/agencies/${id}`
  const data = await fetchData<Agency>(url, {
    method: 'PUT',
    body: JSON.stringify(agencyToUpdate),
  })
  return data
}

export async function deleteAgency(id: string) {
  const url = `${BASE_URL}/api/agencies/${id}`
  const data = await fetchData<Agency>(url, {
    method: 'DELETE',
  })
  return data
}

//----------------------------- Labels ----------------------------->
export async function fetchLabels(): Promise<LabelType[]> {
  const url = `${BASE_URL}/api/labels`
  const data = await fetchData<DataResponse<LabelType>>(url)
  return data.items
}

export async function fetchLabelById(id: string) {
  const url = `${BASE_URL}/api/labels/${id}`
  const data = await fetchData<LabelType>(url)
  return data
}

export async function createLabel(labelToCreate: CreateLabel) {
  const url = `${BASE_URL}/api/labels`
  const data = await fetchData<LabelType>(url, {
    method: 'POST',
    body: JSON.stringify(labelToCreate),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export async function updateLabel(id: string, labelToUpdate: LabelType) {
  const url = `${BASE_URL}/api/labels/${id}`
  const data = await fetchData<LabelType>(url, {
    method: 'PUT',
    body: JSON.stringify(labelToUpdate),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export async function deleteLabel(id: string) {
  const url = `${BASE_URL}/api/labels/${id}`
  const data = await fetchData<LabelType>(url, {
    method: 'DELETE',
  })
  return data
}

//----------------------------- Auth ----------------------------->
export async function validateCredentials({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const url = `${BASE_URL}/api/auth`
    const data = await fetchData<{ userId: string; ok: boolean }>(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log({ data })
    return data.userId
  } catch (error) {
    console.log('error in validateCredentials', error)
    return null
  }
}
