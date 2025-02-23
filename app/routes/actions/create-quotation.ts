import { createQuotation, fetchCustomers, fetchProducts } from '@/lib/data'
import type { Route } from './+types/create-quotation'
import { redirect } from 'react-router'
import { HTTPRequestError } from '@/lib/errors'

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const quotation = JSON.parse(formData.get('quotation') as string)
  // const quotation = JSON.parse(formData.get('quotation') as string)
  try {
    await createQuotation(quotation, context.cloudflare.env.TELL_API_KEY)
    return redirect('/quotations')
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      return {
        error: error.message,
        success: false,
      }
    }

    return {
      error: 'Error creating quotation',
      success: false,
    }
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  localStorage.removeItem('__QUOS__')
  const serverData = await serverAction()
  return serverData
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    productsPromise: fetchProducts(context.cloudflare.env.TELL_API_KEY),
    customersPromise: fetchCustomers(context.cloudflare.env.TELL_API_KEY, {
      onlyRegular: true,
    }),
  }
}
