import { fetchCustomers, fetchProducts } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/customers/columns'

export async function loader() {
  const customers = await fetchCustomers()
  return { customers }
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { customers } = loaderData
  return <DataTable columns={columns} data={customers} createPath="#" />
}
