import { fetchAgencies } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/agencies/columns'

export async function loader() {
  const agencies = await fetchAgencies()
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
