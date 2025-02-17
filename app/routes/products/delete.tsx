import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteProduct } from '@/lib/data'
import { redirect } from 'react-router'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  try {
    await deleteProduct(params.id, token)
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}
