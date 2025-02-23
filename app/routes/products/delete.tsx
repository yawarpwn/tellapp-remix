import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteProduct } from '@/lib/data'
import { redirect } from 'react-router'
import { cache } from '@/lib/utils'
import { PRODUCTS_KEY } from '@/lib/constants'

export async function action({ params, context }: Route.ActionArgs) {
  try {
    await deleteProduct(params.id, context.cloudflare.env.TELL_API_KEY)
  } catch (error) {
    return handleError(error)
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  cache.delete(PRODUCTS_KEY)
  return await serverAction()
}
