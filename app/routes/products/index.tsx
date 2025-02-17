import { fetchProducts } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTable } from '@/components/data-table'
import { columns } from '@/products/columns'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const products = await fetchProducts(token)
  return { products }
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData
  return (
    <DataTable
      columns={columns}
      data={products}
      createPath="/products/create"
    />
  )
}
