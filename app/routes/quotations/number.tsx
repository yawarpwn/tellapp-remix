import { fetchQuotaitonByNumber } from '@/lib/data'
import type { Route } from './+types/number'
import ViewQuotation from '@/quotations/view-quotation'
import { QuotationSkeleton } from '@/components/skeletons/quotations'
import { BackTo } from '@/components/back-to'

export async function loader({ params, context }: Route.LoaderArgs) {
  return {
    quotation: await fetchQuotaitonByNumber(
      +params.number,
      context.cloudflare.env.TELL_API_KEY
    ),
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

export default function QuotationByNumber({
  loaderData,
}: Route.ComponentProps) {
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
