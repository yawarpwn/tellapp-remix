import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteWatermark } from '@/lib/data'

export async function action({ params, context }: Route.ActionArgs) {
  try {
    await deleteWatermark(params.id, context.cloudflare.env.TELL_API_KEY)
  } catch (error) {
    return handleError(error)
  }
}
