import { fetchQuotations } from '@/lib/data'
import type { Route } from './+types/index'
import { columns } from '@/quotations/columns'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { QuotationDataTable } from '@/quotations/quotation-data-table'

export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  try {
    const quotations = await fetchQuotations(context.cloudflare.env.TELL_API_KEY, {
      query: q,
    })
    return { quotations, q }
  } catch (error) {
    throw new Response('Not Found', { status: 404 })
  }
}

// let isInitialRequest = true
export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // const QUOTATIONS_KEY = '__QUOS__'
  //
  // if (isInitialRequest) {
  //   isInitialRequest = false
  //   const serverData = await serverLoader()
  //   localStorage.setItem(QUOTATIONS_KEY, JSON.stringify(serverData))
  //   return serverData
  // }
  //
  // const cacheData = localStorage.getItem(QUOTATIONS_KEY)
  // if (cacheData) {
  //   console.log('used cached quotations ')
  //   return JSON.parse(cacheData)
  // }
  const serverData = await serverLoader()
  // localStorage.setItem(QUOTATIONS_KEY, JSON.stringify(serverData))
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
  const { quotations, q } = loaderData
  // console.log('data', data)

  return (
    <QuotationDataTable q={q} columns={columns} data={quotations} createPath="/quotations/create" />
  )
}
