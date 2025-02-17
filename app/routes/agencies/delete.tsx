import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteAgency } from '@/lib/data'
import { redirect } from 'react-router'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  try {
    await deleteAgency(params.id, token)
    return redirect('/agencies')
  } catch (error) {
    return handleError(error)
  }
}
