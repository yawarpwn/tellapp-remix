import { fetchCustomerByRuc } from '@/lib/data'
import { data } from 'react-router'
import type { Route } from './+types/search-by-ruc'
import { handleError } from '@/lib/utils'

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData()
    const ruc = formData.get('ruc') as string
    const customer = await fetchCustomerByRuc(ruc)
    return {
      success: true,
      customer,
    }
  } catch (error) {
    return handleError(error)
  }
}
