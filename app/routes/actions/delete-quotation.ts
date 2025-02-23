import { deleteQuotation } from '@/lib/data'
import type { Route } from './+types/delete-quotation'
import { HTTPRequestError } from '@/lib/errors'
import { QUOTATIONS_KEY } from '@/lib/constants'
import { cache } from '@/lib/utils'

export async function action({ params, context }: Route.ActionArgs) {
  try {
    await deleteQuotation(+params.number, context.cloudflare.env.TELL_API_KEY)
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      return { error: error.message }
    }

    return {
      error: 'Error deleting quotation',
    }
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  cache.delete(QUOTATIONS_KEY)
  const serverData = await serverAction()
  return serverData
}
