import { fetchCustomers, fetchProducts } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/customers/columns'

export async function loader({ context }: Route.LoaderArgs) {
  const customers = await fetchCustomers(context.cloudflare.env.TELL_API_KEY, {
    onlyRegular: false,
  })
  return { customers }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Clientes' }]
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { customers } = loaderData
  return <DataTable columns={columns} data={customers} createPath="#" />
}
