import { fetchAgencies } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/agencies/columns'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const agencies = await fetchAgencies(token)
  return { agencies }
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
