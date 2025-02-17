import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteLabel } from '@/lib/data'
import { redirect } from 'react-router'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  await deleteLabel(params.id, token)
  return redirect('/labels')
}
