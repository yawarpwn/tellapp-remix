import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteLabel } from '@/lib/data'
import { redirect } from 'react-router'

export async function action({ params, context }: Route.ActionArgs) {
  await deleteLabel(params.id, context.cloudflare.env.TELL_API_KEY)
  return redirect('/labels')
}
