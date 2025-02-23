import { fetchAgencies } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/agencies/columns'

export async function loader({ context }: Route.LoaderArgs) {
  const agencies = await fetchAgencies(context.cloudflare.env.TELL_API_KEY)
  return { agencies }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Agencias' }]
}
export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { agencies } = loaderData
  return (
    <DataTable
      columns={columns}
      data={agencies}
      createPath="/agencies/create"
    />
  )
}
