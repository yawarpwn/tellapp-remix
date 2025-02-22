import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteAgency } from '@/lib/data'
import { redirect } from 'react-router'

export async function action({ params, context }: Route.ActionArgs) {
  try {
    await deleteAgency(params.id, context.cloudflare.env.TELL_API_KEY)
    return redirect('/agencies')
  } catch (error) {
    return handleError(error)
  }
}
