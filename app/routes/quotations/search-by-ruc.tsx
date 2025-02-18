import { searchCustomerByDniOrRuc } from '@/lib/data'
import { data } from 'react-router'
import type { Route } from './+types/search-by-ruc'
import { handleError } from '@/lib/utils'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ request }: Route.ActionArgs) {
  try {
    const token = await getTokenFromSession(request)
    const formData = await request.formData()
    const ruc = formData.get('ruc') as string
    const customer = await searchCustomerByDniOrRuc(ruc, token)
    return {
      success: true,
      customer,
    }
  } catch (error) {
    return handleError(error)
  }
}
