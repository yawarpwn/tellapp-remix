import { duplicateQuotation } from '@/lib/data'
import type { Route } from './+types/duplicate'
import { redirect } from 'react-router'

export async function action({ params }: Route.ActionArgs) {
  try {
    const createdQuotationNumber = await duplicateQuotation(+params.number)
    return redirect('/quotations/' + createdQuotationNumber)
  } catch (error) {
    console.log(error)
    return {
      error: 'Error duplicando cotizacion',
    }
  }
}
