import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteLabel } from '@/lib/data'
import { redirect } from 'react-router'

export async function action({ params }: Route.ActionArgs) {
  try {
    await deleteLabel(params.id)
    return redirect('labels')
  } catch (error) {
    return handleError(error)
  }
}
