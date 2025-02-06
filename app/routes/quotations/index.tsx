import { fetchQuotations } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTable } from '@/components/data-table'
import { columns } from '@/quotations/columns'

export async function loader({ request }: Route.LoaderArgs) {
  const quotations = await fetchQuotations()
  return { quotations }
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData
  return (
    <DataTable
      columns={columns}
      data={quotations}
      createPath="/quotations/create"
    />
  )
}
