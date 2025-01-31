import { fetchCustomerByRuc } from '@/lib/data'
import type { Route } from './+types/search-by-ruc'
import { HTTPRequestError } from '@/lib/errors'

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData()
    const ruc = formData.get('ruc') as string
    // throw new Error("queefuee");
    const customer = await fetchCustomerByRuc(ruc)
    return {
      success: true,
      customer,
    }
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      return {
        success: false,
        error: error.message,
      }
    }

    console.error('ERROR: ', error)
    return {
      success: false,
      error: 'Error Desconocido',
    }
  }
}

export type SearchAction = typeof action
