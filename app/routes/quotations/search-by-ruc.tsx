import { searchCustomerByDniOrRuc } from '@/lib/data'
import type { Route } from './+types/search-by-ruc'
import { handleError } from '@/lib/utils'

export async function action({ request, context }: Route.ActionArgs) {
  try {
    const formData = await request.formData()
    const ruc = formData.get('ruc') as string
    const customer = await searchCustomerByDniOrRuc(ruc, context.cloudflare.env.TELL_API_KEY)
    return {
      success: true,
      customer,
    }
  } catch (error) {
    return handleError(error)
  }
}
