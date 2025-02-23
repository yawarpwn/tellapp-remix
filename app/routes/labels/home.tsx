import { fetchLabels } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/labels/columns'

export async function loader({ context }: Route.LoaderArgs) {
  const labels = await fetchLabels(context.cloudflare.env.TELL_API_KEY)
  return { labels }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Etiquetas' }]
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { labels } = loaderData
  return (
    <DataTable columns={columns} data={labels} createPath="/labels/create" />
  )
}
