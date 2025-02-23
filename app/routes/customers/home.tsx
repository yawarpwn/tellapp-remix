import { fetchCustomers, fetchProducts } from '@/lib/data'
import type { Route } from './+types/home'
import { DataTable } from '@/components/data-table'
import { columns } from '@/customers/columns'
import { CUSTOMERS_KEY } from '@/lib/constants'
import { cache } from '@/lib/utils'
import { DataTableSkeleton } from '@/components/skeletons/data-table'

let isFirstRequest = true
export async function loader({ context }: Route.LoaderArgs) {
  try {
    const customers = await fetchCustomers(context.cloudflare.env.TELL_API_KEY, {
      onlyRegular: false,
    })
    return { customers }
  } catch (error) {
    throw new Response('Not Found', { status: 404 })
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Clientes' }]
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  if (isFirstRequest) {
    isFirstRequest = false
    const serverData = await serverLoader()
    cache.set(CUSTOMERS_KEY, serverData)
    return serverData
  }

  const cacheData = cache.get(CUSTOMERS_KEY)
  if (cacheData) {
    console.log('customers from cache')
    return cacheData
  }

  const serverData = await serverLoader()
  cache.set(CUSTOMERS_KEY, serverData)
  return serverData
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return <DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { customers } = loaderData
  return <DataTable columns={columns} data={customers} createPath="#" />
}
