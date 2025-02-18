import { BASE_URL } from '@/lib/constants'
import type { CreateWatermark, UpdateWatermark, Watermark } from '@/types'
import type {
  DataResponse,
  QuotationClient,
  CreateQuotationClient,
  UpdateProduct,
  InsertProduct,
  UpdateQuotationClient,
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

//----------------------------- Quotations ----------------------------->
export async function fetchQuotations(
  token: string
): Promise<QuotationClient[]> {
  const url = `${BASE_URL}/api/quotations`
  const data = await fetchData<DataResponse<QuotationClient>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.items
}

export async function fetchQuotaitonByNumber(
  quotationNumber: number,
  token: string
) {
  const url = `${BASE_URL}/api/quotations/${quotationNumber}`
  const data = await fetchData<QuotationClient>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function deleteQuotation(quotationNumber: number, token: string) {
  const url = `${BASE_URL}/api/quotations/${quotationNumber}`
  const data = await fetchData<Customer>(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function createQuotation(
  newQuotation: CreateQuotationClient,
  token: string
) {
  const url = `${BASE_URL}/api/quotations`
  const data = await fetchData<{ insertedNumber: number }>(url, {
    method: 'POST',
    body: JSON.stringify(newQuotation),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return data.insertedNumber
}

export async function updateQuotation(
  quotationToUpdate: UpdateQuotationClient,
  token: string
) {
  const url = `${BASE_URL}/api/quotations/${quotationToUpdate.id}`
  console.log({ url, quotationToUpdate })
  const updateQuotation = await fetchData<QuotationClient>(url, {
    method: 'PUT',
    body: JSON.stringify(quotationToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return updateQuotation
}

export async function duplicateQuotation(
  quotationNumber: number,
  token: string
) {
  const quotation = await fetchQuotaitonByNumber(quotationNumber, token)
  const insertedQuotationNumber = await createQuotation(
    {
      ...quotation,
    },
    token
  )
  return insertedQuotationNumber
}

type FetchCustomerOptions = {
  onlyRegular?: boolean
}

//----------------------------- Customers ----------------------------->
export async function fetchCustomers(
  token: string,
  options?: FetchCustomerOptions
): Promise<Customer[]> {
  const { onlyRegular = false } = options ?? {}
  const url = `${BASE_URL}/api/customers`
  const data = await fetchData<DataResponse<Customer>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return onlyRegular
    ? data.items.filter((customer) => customer.isRegular)
    : data.items
}

export async function searchCustomerByDniOrRuc(dniRuc: string, token: string) {
  //Search customer in Database
  const url = `${BASE_URL}/api/customers/search/${dniRuc}`
  const customer = await fetchData<CustomerFromService>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return {
    id: customer.id,
    ruc: customer.ruc,
    name: customer.name,
    address: customer.address,
  }
}

export async function fetchCustomerById(id: string, token: string) {
  const url = `${BASE_URL}/api/customers/${id}`
  const data = fetchData<Customer>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function updateCustomer(
  id: string,
  customerToUpdate: UpdateCustomer,
  token: string
) {
  const url = `${BASE_URL}/api/customers/${id}`
  const data = await fetchData<Customer>(url, {
    method: 'PUT',
    body: JSON.stringify(customerToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

//----------------------------- Products ----------------------------->
export async function fetchProducts(token: string): Promise<Product[]> {
  const url = `${BASE_URL}/api/products`
  const data = await fetchData<DataResponse<Product>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.items
}

export async function fetchProductById(
  id: string,
  token: string
): Promise<Product> {
  const url = `${BASE_URL}/api/products/${id}`
  const data = await fetchData<Product>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function fetchProductCategories(token: string) {
  const url = `${BASE_URL}/api/product-categories`
  const data = await fetchData<DataResponse<ProductCategory>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.items
}

export async function createProduct(
  productToInsert: InsertProduct,
  token: string
) {
  const url = `${BASE_URL}/api/products`
  const data = await fetchData<Product>(url, {
    method: 'POST',
    body: JSON.stringify(productToInsert),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function updateProduct(
  id: string,
  productToUpdate: UpdateProduct,
  token: string
) {
  console.log('update product ')
  const url = `${BASE_URL}/api/products/${id}`
  const updatedProduct = await fetchData<Product>(url, {
    method: 'PUT',
    body: JSON.stringify(productToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return updatedProduct
}

export async function deleteProduct(id: string, token: string) {
  const url = `${BASE_URL}/api/products/${id}`
  const data = await fetchData<Product>(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

//----------------------------- Agencies ----------------------------->
export async function fetchAgencies(token: string): Promise<Agency[]> {
  const url = `${BASE_URL}/api/agencies`
  const data = await fetchData<DataResponse<Agency>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.items
}

export async function fetchAgencyById(id: string, token: string) {
  const url = `${BASE_URL}/api/agencies/${id}`
  const data = await fetchData<Agency>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function createAgency(
  agencyToCreate: CreateAgency,
  token: string
) {
  const url = `${BASE_URL}/api/agencies`
  const data = await fetchData<Agency>(url, {
    method: 'POST',
    body: JSON.stringify(agencyToCreate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function updateAgency(
  id: string,
  agencyToUpdate: Agency,
  token: string
) {
  const url = `${BASE_URL}/api/agencies/${id}`
  const data = await fetchData<Agency>(url, {
    method: 'PUT',
    body: JSON.stringify(agencyToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function deleteAgency(id: string, token: string) {
  const url = `${BASE_URL}/api/agencies/${id}`
  const data = await fetchData<Agency>(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

//----------------------------- Labels ----------------------------->
export async function fetchLabels(token: string): Promise<LabelType[]> {
  const url = `${BASE_URL}/api/labels`
  const data = await fetchData<DataResponse<LabelType>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.items
}

export async function fetchLabelById(id: string, token: string) {
  const url = `${BASE_URL}/api/labels/${id}`
  const data = await fetchData<LabelType>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function createLabel(labelToCreate: CreateLabel, token: string) {
  const url = `${BASE_URL}/api/labels`
  const data = await fetchData<LabelType>(url, {
    method: 'POST',
    body: JSON.stringify(labelToCreate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function updateLabel(
  id: string,
  labelToUpdate: LabelType,
  token: string
) {
  const url = `${BASE_URL}/api/labels/${id}`
  const data = await fetchData<LabelType>(url, {
    method: 'PUT',
    body: JSON.stringify(labelToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function deleteLabel(id: string, token: string) {
  const url = `${BASE_URL}/api/labels/${id}`
  const data = await fetchData<LabelType>(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

//----------------------------- Watermarks -----------------------------\\
export async function fetchWatermarks(token: string): Promise<Watermark[]> {
  const url = `${BASE_URL}/api/watermarks`
  const data = await fetchData<DataResponse<Watermark>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.items
}

export async function fetchWatermarkById(id: string, token: string) {
  const url = `${BASE_URL}/api/watermarks/${id}`
  const data = await fetchData<Watermark>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function createWatermark(formData: FormData, token: string) {
  const url = `${BASE_URL}/api/watermarks`
  const data = await fetchData<Watermark>(url, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function updateWatermarkl(
  id: string,
  labelToUpdate: UpdateWatermark,
  token: string
) {
  const url = `${BASE_URL}/api/watermarks/${id}`
  const data = await fetchData<Watermark>(url, {
    method: 'PUT',
    body: JSON.stringify(labelToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export async function deleteWatermark(id: string, token: string) {
  const url = `${BASE_URL}/api/watermarks/${id}`
  const data = await fetchData<Watermark>(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

//----------------------------- Auth ----------------------------->

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const url = `${BASE_URL}/auth/login`
  const data = await fetchData<{ token: string }>(url, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })

  return data.token
}
