import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteWatermark } from '@/lib/data'
import { redirect } from 'react-router'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  try {
    await deleteWatermark(params.id, token)
    return redirect('/watermarks')
  } catch (error) {
    return handleError(error)
  }
}
