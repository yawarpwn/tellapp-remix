import { fetchQuotaitonByNumber } from '@/lib/data'
import type { Route } from './+types/number'
import ViewQuotation from '@/quotations/view-quotation'
import { QuotationSkeleton } from '@/components/skeletons/quotations'
import { BackTo } from '@/components/back-to'
import { handleError } from '@/lib/utils'

export async function loader({ params, context }: Route.LoaderArgs) {
  try {
    const quotation = await fetchQuotaitonByNumber(
      +params.number,
      context.cloudflare.env.TELL_API_KEY
    )
    return {
      quotation,
    }
  } catch (error) {
    throw new Response('Not Found', { status: 404 })
  }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  return await serverLoader()
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return (
    <div>
      <div className="mb-2">
        <BackTo to="/quotations" />
      </div>
      <QuotationSkeleton />
    </div>
  )
}

export default function QuotationByNumber({ loaderData }: Route.ComponentProps) {
  const { quotation } = loaderData
  return (
    <div>
      <div className="mb-2">
        <BackTo to="/quotations" />
      </div>
      <ViewQuotation quotation={quotation} />
    </div>
  )
}
