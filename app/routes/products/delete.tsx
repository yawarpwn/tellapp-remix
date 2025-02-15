import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteProduct } from '@/lib/data'
import { redirect } from 'react-router'

export async function action({ params }: Route.ActionArgs) {
  try {
    await deleteProduct(params.id)
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}
