import { fetchLabels } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/labels/columns'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const labels = await fetchLabels(token)
  console.log({ labels })
  return { labels }
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { labels } = loaderData
  return (
    <DataTable columns={columns} data={labels} createPath="/labels/create" />
  )
}
