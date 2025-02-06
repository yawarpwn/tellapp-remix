import { fetchProducts, fetchQuotations } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTable } from '@/components/data-table'
import { columns } from '@/products/columns'
import { getSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  console.log('session', session.get('userId'))
  const products = await fetchProducts()
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
