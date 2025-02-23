import { fetchProducts } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTable } from '@/components/data-table'
import { columns } from '@/products/columns'
import { cache } from '@/lib/utils'
import { PRODUCTS_KEY } from '@/lib/constants'
import { DataTableSkeleton } from '@/components/skeletons/data-table'

let isFirstRequest = true
export async function loader({ context }: Route.LoaderArgs) {
  const products = await fetchProducts(context.cloudflare.env.TELL_API_KEY)
  return { products }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  if (isFirstRequest) {
    isFirstRequest = false
    const serverData = await serverLoader()
    cache.set(PRODUCTS_KEY, serverData)
    return serverData
  }

  const cacheData = cache.get(PRODUCTS_KEY)
  if (cacheData) {
    console.log('products from cache')
    return cacheData
  }

  const serverData = await serverLoader()
  cache.set(PRODUCTS_KEY, serverData)
  return serverData
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return <DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Productos' }]
}

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData
  return <DataTable columns={columns} data={products} createPath="/products/create" />
}
