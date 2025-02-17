import { fetchQuotations } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTable } from '@/components/data-table'
import { columns } from '@/quotations/columns'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const quotations = await fetchQuotations(token)
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
