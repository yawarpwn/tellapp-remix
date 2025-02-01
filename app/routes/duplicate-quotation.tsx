import { duplicateQuotationAction } from '@/lib/actions'
import type { Route } from './+types/duplicate-quotation'
import { redirect } from 'react-router'

export async function action({ params }: Route.ActionArgs) {
  try {
    const createdQuotationNumber = await duplicateQuotationAction(
      +params.number
    )
    return redirect('/quotations/' + createdQuotationNumber)
  } catch (error) {
    console.log(error)
    return {
      error: 'Error duplicando cotizacion',
    }
  }
}
