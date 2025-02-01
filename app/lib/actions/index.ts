import { HTTPRequestError } from '@/lib/errors'
import { fakePromise, fetchData } from '@/lib/utils'
import type {
  CreateQuotationClient,
  QuotationClient,
  UpdateQuotationClient,
} from '@/types'
import { fetchQuotaitonByNumber } from '@/lib/data'
import { BASE_URL } from '@/lib/constants'
import type { Customer } from '@/types'

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
