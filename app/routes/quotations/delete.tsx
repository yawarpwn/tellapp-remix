import { deleteQuotation } from '@/lib/data'
import type { Route } from './+types/delete'
import { redirect } from 'react-router'
import { HTTPRequestError } from '@/lib/errors'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  try {
    await deleteQuotation(+params.number, token)
    return redirect('/quotations/')
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      return { error: error.message }
    }

    return {
      error: 'Error deleting quotation',
    }
  }
}
