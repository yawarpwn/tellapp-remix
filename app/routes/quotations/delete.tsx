import { deleteQuotation } from '@/lib/data'
import type { Route } from './+types/delete'
import { redirect } from 'react-router'
import { HTTPRequestError } from '@/lib/errors'

export async function action({ params, context }: Route.ActionArgs) {
  try {
    await deleteQuotation(+params.number, context.cloudflare.env.TELL_API_KEY)
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
