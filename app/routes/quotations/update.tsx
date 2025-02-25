import React from 'react'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'
import type { Route } from './+types/update'
import { fetchCustomers, fetchProducts, fetchQuotaitonByNumber } from '@/lib/data'
import { UpdateQuotation } from '@/quotations/update-quotation'

export async function loader({ params, context }: Route.LoaderArgs) {
  return {
    productsPromise: fetchProducts(context.cloudflare.env.TELL_API_KEY),
    customersPromise: fetchCustomers(context.cloudflare.env.TELL_API_KEY, {
      onlyRegular: true,
    }),
    quotationPromise: fetchQuotaitonByNumber(+params.number, context.cloudflare.env.TELL_API_KEY),
  }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  return serverLoader()
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return <UpdateCreateQuotationSkeleton />
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { quotationPromise, customersPromise, productsPromise } = loaderData
  return (
    <React.Suspense fallback={<HydrateFallback />}>
      <UpdateQuotation
        quotationPromise={quotationPromise}
        productsPromise={productsPromise}
        customersPromise={customersPromise}
      />
    </React.Suspense>
  )
}
