import { redirect, useFetcher } from 'react-router'
import { handleError } from '@/lib/utils'
import { QuotationSkeleton } from '@/components/skeletons/quotations'

import React from 'react'
import type { Route } from './+types/update'
import {
  fetchCustomers,
  fetchProducts,
  fetchQuotaitonByNumber,
} from '@/lib/data'
import { updateQuotation } from '@/lib/data'
import { UpdateQuotationView } from '@/quotations/update-quotation-view'

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const quotation = JSON.parse(formData.get('quotation') as string)
  // const quotation = JSON.parse(formData.get('quotation') as string)
  try {
    await updateQuotation(quotation, context.cloudflare.env.TELL_API_KEY)
    return redirect('/quotations')
  } catch (error) {
    return handleError(error)
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  localStorage.removeItem('__QUOS__')
  return await serverAction()
}

export async function loader({ params, context }: Route.LoaderArgs) {
  return {
    productsPromise: fetchProducts(context.cloudflare.env.TELL_API_KEY),
    customersPromise: fetchCustomers(context.cloudflare.env.TELL_API_KEY, {
      onlyRegular: true,
    }),
    quotationPromise: fetchQuotaitonByNumber(
      +params.number,
      context.cloudflare.env.TELL_API_KEY
    ),
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
