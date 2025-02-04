import { fetchCustomerById, updateCustomer } from '@/lib/data'
import type { Route } from './+types/toggle-regular-customer'

export async function action({ params, request }: Route.ActionArgs) {
  const customer = await fetchCustomerById(params.id)
  const formData = await request.formData()
  const status = formData.get('status') as string

  const updatedCustomer = await updateCustomer(params.id, {
    ...customer,
    isRegular: status !== 'is-regular',
  })

  return { updatedCustomer }
}

export default function () {
  return <div>Toggle</div>
}
