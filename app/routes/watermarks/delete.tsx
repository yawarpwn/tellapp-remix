import { handleError } from '@/lib/utils'
import type { Route } from './+types/delete'
import { deleteWatermark, fetchCloudinarySignature } from '@/lib/data'
import { data, redirect } from 'react-router'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  try {
    const token = await getTokenFromSession(request)
    await deleteWatermark(params.id, token)
  } catch (error) {
    return handleError(error)
  }
}
