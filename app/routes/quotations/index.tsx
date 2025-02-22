import { fetchQuotations } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTable } from '@/components/data-table'
import { columns } from '@/quotations/columns'
import { DataTableSkeleton } from '@/components/skeletons/data-table'

export async function loader({ context }: Route.LoaderArgs) {
  const quotations = await fetchQuotations(context.cloudflare.env.TELL_API_KEY)
  return { quotations }
}

let isInitialRequest = true
export async function clientLoader({
  request,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const QUOTATIONS_KEY = '__QUOS__'

  if (isInitialRequest) {
    console.log('is Initial request')
    isInitialRequest = false
    const serverData = await serverLoader()
    localStorage.setItem(QUOTATIONS_KEY, JSON.stringify(serverData))
    return serverData
  }

  const cacheData = localStorage.getItem(QUOTATIONS_KEY)
  console.log({ cacheData })
  if (cacheData) {
    return JSON.parse(cacheData)
  }
  const serverData = await serverLoader()
  localStorage.setItem(QUOTATIONS_KEY, JSON.stringify(serverData))
  return serverData
}

clientLoader.hydrate = true as const // (2)

export function HydrateFallback() {
  return (
    <DataTableSkeleton
      columnCount={5}
      rowCount={20}
      searchableColumnCount={1}
    />
  ) // (2)
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData
  // console.log('data', data)

  return (
    <DataTable
      columns={columns}
      data={quotations}
      createPath="/quotations/create"
    />
  )
}
