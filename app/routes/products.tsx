import { fetchProducts, fetchQuotations } from '@/lib/data'
import type { Route } from './+types/products'
import { DataTable } from '@/components/data-table'
import { columns } from '@/products/columns'

export async function loader() {
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
