import { fetchQuotaitonByNumber } from '@/lib/data'
import type { Route } from './+types/number'
import ViewQuotation from '@/quotations/view-quotation'
import { QuotationSkeleton } from '@/components/skeletons/quotations'

import React from 'react'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ params, request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  return {
    quotationPromise: fetchQuotaitonByNumber(+params.number, token),
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
