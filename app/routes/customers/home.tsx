import { fetchCustomers, fetchProducts } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/customers/columns'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const customers = await fetchCustomers(token, {
    onlyRegular: false,
  })
  return { customers }
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { customers } = loaderData
  return <DataTable columns={columns} data={customers} createPath="#" />
}
