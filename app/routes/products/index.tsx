import { fetchProducts } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTable } from '@/components/data-table'
import { columns } from '@/products/columns'

export async function loader({ context }: Route.LoaderArgs) {
  const products = await fetchProducts(context.cloudflare.env.TELL_API_KEY)
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
