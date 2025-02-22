import { fetchQuotaitonByNumber } from '@/lib/data'
import type { Route } from './+types/number'
import ViewQuotation from '@/quotations/view-quotation'
import { QuotationSkeleton } from '@/components/skeletons/quotations'

import React from 'react'

export async function loader({ params, context }: Route.LoaderArgs) {
  return {
    quotationPromise: fetchQuotaitonByNumber(
      +params.number,
      context.cloudflare.env.TELL_API_KEY
    ),
  }
}

export default function QuotationByNumber({
  loaderData,
}: Route.ComponentProps) {
  const { quotationPromise } = loaderData
  return (
    <React.Suspense fallback={<QuotationSkeleton />}>
      <ViewQuotation quotationPromise={quotationPromise} />
    </React.Suspense>
  )
}
