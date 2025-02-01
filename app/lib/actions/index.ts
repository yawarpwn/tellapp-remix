import { HTTPRequestError } from '@/lib/errors'
import { fakePromise, fetchData } from '@/lib/utils'

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

export async function createQuotationAction(newQuotation: Object) {
  const url = `${BASE_URL}/api/quotations`
  const data = await fetchData<{ insertedNumber: number }>(url, {
    method: 'POST',
    body: JSON.stringify(newQuotation),
  })

  console.log('create quotation action')
  console.log(data)

  return data.insertedNumber
}

export async function duplicateQuotationAction(quotationNumber: number) {
  const quotation = await fetchQuotaitonByNumber(quotationNumber)
  const insertedQuotationNumber = await createQuotationAction({
    ...quotation,
    id: crypto.randomUUID(),
  })
  return insertedQuotationNumber
}
