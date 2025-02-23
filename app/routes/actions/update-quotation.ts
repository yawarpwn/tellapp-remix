import type { Route } from './+types/update-quotation'
import { updateQuotation } from '@/lib/data'
import { handleError } from '@/lib/utils'
import { redirect } from 'react-router'

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const quotation = JSON.parse(formData.get('quotation') as string)
  // const quotation = JSON.parse(formData.get('quotation') as string)
  try {
    await updateQuotation(quotation, context.cloudflare.env.TELL_API_KEY)
    return redirect('/quotations')
  } catch (error) {
    return handleError(error)
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  localStorage.removeItem('__QUOS__')
  return await serverAction()
}
