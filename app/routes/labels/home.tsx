import { fetchLabels } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/labels/columns'

export async function loader() {
  const labels = await fetchLabels()
  console.log({ labels })
  return { labels }
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { labels } = loaderData
  return (
    <DataTable columns={columns} data={labels} createPath="/labels/create" />
  )
}
