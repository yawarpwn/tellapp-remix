import { duplicateQuotation } from '@/lib/data'
import type { Route } from './+types/duplicate'
import { redirect } from 'react-router'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  try {
    const createdQuotationNumber = await duplicateQuotation(
      +params.number,
      token
    )
    return redirect('/quotations/' + createdQuotationNumber)
  } catch (error) {
    console.log(error)
    return {
      error: 'Error duplicando cotizacion',
    }
  }
}
