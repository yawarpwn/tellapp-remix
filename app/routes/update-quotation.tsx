import { redirect, useFetcher } from 'react-router'
import { handleError } from '@/lib/utils'
import { QuotationSkeleton } from '@/components/skeletons/quotations'

import React from 'react'
import type { Route } from './+types/update-quotation'
import {
  fetchCustomers,
  fetchProducts,
  fetchQuotaitonByNumber,
} from '@/lib/data'
import { updateQuotationAction } from '@/lib/actions'
import { UpdateQuotationView } from '@/quotations/update-quotation-view'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const quotation = JSON.parse(formData.get('quotation') as string)
  // const quotation = JSON.parse(formData.get('quotation') as string)
  try {
    await updateQuotationAction(quotation)
    return redirect('/quotations')
  } catch (error) {
    return handleError(error)
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  return {
    productsPromise: fetchProducts(),
    customersPromise: fetchCustomers({ onlyRegular: true }),
    quotationPromise: fetchQuotaitonByNumber(+params.number),
  }
}

export default function WrapperUpdateQuotation({
  loaderData,
}: Route.ComponentProps) {
  return (
    <React.Suspense fallback={<QuotationSkeleton />}>
      <UpdateQuotationView {...loaderData} />
    </React.Suspense>
  )
}
