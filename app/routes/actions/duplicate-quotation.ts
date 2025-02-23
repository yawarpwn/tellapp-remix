import { duplicateQuotation } from '@/lib/data'
import type { Route } from './+types/duplicate-quotation'
import { redirect } from 'react-router'
import { QUOTATIONS_KEY } from '@/lib/constants'

export async function action({ params, context }: Route.ActionArgs) {
  try {
    const createdQuotationNumber = await duplicateQuotation(
      +params.number,
      context.cloudflare.env.TELL_API_KEY
    )

    return redirect(`/quotations/${createdQuotationNumber}`)
  } catch (error) {
    console.log(error)
    return {
      error: 'Error duplicando cotizacion',
    }
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  localStorage.removeItem(QUOTATIONS_KEY)
  return await serverAction()
}
