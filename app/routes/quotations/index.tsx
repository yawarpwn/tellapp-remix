import { fetchQuotations } from '@/lib/data'
import type { Route } from './+types/index'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { Form, Link, useNavigation } from 'react-router'
import { QuotationTable } from '@/quotations/quotation-table'
import { Input } from '@/components/ui/input'
import { Loader2Icon, PlusIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PaginationQuotation } from '@/quotations/pagination-quotation'
import { Skeleton } from '@/components/ui/skeleton'

const ROW_PER_PAGES = 15
export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const pageIndex = Number(url.searchParams.get('page')) || 1
  const pageSize = Number(url.searchParams.get('limit')) || ROW_PER_PAGES
  try {
    const data = await fetchQuotations(context.cloudflare.env.TELL_API_KEY, {
      query: q,
      page: pageIndex,
      limit: pageSize,
    })
    return {
      quotations: data.items,
      totalPages: Math.ceil(data.meta.totalItems / ROW_PER_PAGES),
      q,
      pageSize,
      pageIndex,
    }
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
  return (
    <div>
      <div className="flex flex-col gap-4 md:hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-[160px] " />
        ))}
      </div>
      <div className="hidden md:block">
        <DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />
      </div>
    </div>
  )
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Cotizaciones' }]
}

let timeoutId: number | null = null
export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { quotations, q, pageSize, pageIndex, totalPages } = loaderData
  const navigation = useNavigation()
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      ev.target.form?.submit()
    }, 500) as unknown as number
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between ">
        <Form id="search-form" role="search">
          <div className="flex items-center gap-2 relative">
            <input type="hidden" name="page" value={1} />
            <Input
              name="q"
              disabled={searching}
              onChange={handleChange}
              defaultValue={q || ''}
              placeholder="Buscar Cotización"
              type="search"
              className="w-[250px] lg:w-[350px]"
            />
            <button className="absolute right-2 " disabled={searching}>
              {searching ? <Loader2Icon className="animate-spin" /> : <SearchIcon />}
            </button>
          </div>
        </Form>
        <Button asChild>
          <Link to={'/quotations/create'}>
            <PlusIcon />
            Crear
          </Link>
        </Button>
      </div>
      <QuotationTable quotations={quotations} />
      <PaginationQuotation
        totalPages={totalPages}
        pageSize={pageSize}
        pageIndex={pageIndex}
        query={q}
      />
    </div>
    // <QuotationDataTable
    //   searching={searching}
    //   pageIndex={pageIndex}
    //   pageSize={pageSize}
    //   q={q}
    //   columns={columns}
    //   data={quotations}
    //   createPath="/quotations/create"
    // />
  )
}
