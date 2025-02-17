import { fetchCustomerById, updateCustomer } from '@/lib/data'
import type { Route } from './+types/toggle-regular-customer'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const customer = await fetchCustomerById(params.id, token)
  const formData = await request.formData()
  const status = formData.get('status') as string

  const updatedCustomer = await updateCustomer(
    params.id,
    {
      ...customer,
      isRegular: status !== 'is-regular',
    },
    token
  )

  return { updatedCustomer }
}

export default function () {
  return <div>Toggle</div>
}
