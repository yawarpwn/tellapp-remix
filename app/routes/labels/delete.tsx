import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteProductAction } from '@/lib/actions'
import { redirect } from 'react-router'

export async function action({ params }: Route.ActionArgs) {
  try {
    await deleteProductAction(params.id)
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}
