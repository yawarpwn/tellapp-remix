import { fetchQuotations } from '@/lib/data'
import type { Route } from './+types/index'
import { columns } from '@/quotations/columns'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { QuotationDataTable } from '@/quotations/quotation-data-table'
import { useNavigation } from 'react-router'

export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const pageIndex = Number(url.searchParams.get('page')) || 0
  const pageSize = Number(url.searchParams.get('limit')) || 15
  try {
    const quotations = await fetchQuotations(context.cloudflare.env.TELL_API_KEY, {
      query: q,
      page: pageIndex,
      limit: pageSize,
    })
    return { quotations, q, pageSize, pageIndex }
  } catch (error) {
    throw new Response('Not Found', { status: 404 })
  }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader()
  return serverData
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return <DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Cotizaciones' }]
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { quotations, q, pageSize, pageIndex } = loaderData
  const navigation = useNavigation()
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  return (
    <QuotationDataTable
      searching={searching}
      pageIndex={pageIndex}
      pageSize={pageSize}
      q={q}
      columns={columns}
      data={quotations}
      createPath="/quotations/create"
    />
  )
}
