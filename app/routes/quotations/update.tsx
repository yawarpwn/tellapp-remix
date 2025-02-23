import { useFetcher } from 'react-router'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'

import React from 'react'
import type { Route } from './+types/update'
import { fetchCustomers, fetchProducts, fetchQuotaitonByNumber } from '@/lib/data'
import { CUSTOMERS_KEY, PRODUCTS_KEY } from '@/lib/constants'
import { useQuotation } from '@/hooks/use-quotation'
import { CreateUpdateQuotation } from '@/quotations/create-update-quotation'
import { toast } from 'sonner'

let isFirstRequest = true
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
  if (isFirstRequest) {
    isFirstRequest = false
    const { productsPromise, customersPromise, quotationPromise } = await serverLoader()
    const [customers, products, quotation] = await Promise.all([
      customersPromise,
      productsPromise,
      quotationPromise,
    ])
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers))
    return {
      products,
      customers,
      quotation,
    }
  }
  const cachedProducts = localStorage.getItem(PRODUCTS_KEY)
  const cachedCustomers = localStorage.getItem(CUSTOMERS_KEY)

  if (cachedCustomers && cachedProducts) {
    console.log('used cached customers && products')
    const { quotationPromise } = await serverLoader()
    return {
      customers: JSON.parse(cachedCustomers),
      products: JSON.parse(cachedProducts),
      quotation: await quotationPromise,
    }
  }

  const { productsPromise, customersPromise, quotationPromise } = await serverLoader()
  const [customers, products, quotation] = await Promise.all([
    customersPromise,
    productsPromise,
    quotationPromise,
  ])
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers))
  return {
    products,
    customers,
    quotation,
  }
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return <UpdateCreateQuotationSkeleton />
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { quotation: quotatoinFromDb, customers, products } = loaderData
  const {
    quotation,
    updateQuotation,
    addItem,
    deleteItem,
    editItem,
    duplicateItem,
    pickCustomer,
    moveUpItem,
    moveDownItem,
    hasItems,
    showCreditOption,
    toggleCreditOption,
  } = useQuotation(quotatoinFromDb)

  const fetcher = useFetcher()
  const pending = fetcher.state !== 'idle'

  const handleUpdateQuotation = () => {
    const formData = new FormData()
    formData.append('quotation', JSON.stringify(quotation))
    fetcher.submit(formData, {
      method: 'post',
      action: '/action/update-quotation',
    })
  }

  React.useEffect(() => {
    if (fetcher.data) {
      toast.error(fetcher.data.error)
    }
  }, [fetcher.data])

  return (
    <CreateUpdateQuotation
      quotation={quotation}
      updateQuotation={updateQuotation}
      addItem={addItem}
      deleteItem={deleteItem}
      editItem={editItem}
      duplicateItem={duplicateItem}
      pickCustomer={pickCustomer}
      moveUpItem={moveUpItem}
      moveDownItem={moveDownItem}
      hasItems={hasItems}
      showCreditOption={showCreditOption}
      toggleCreditOption={toggleCreditOption}
      products={products}
      customers={customers}
      handleSubmit={handleUpdateQuotation}
      pending={pending}
    />
  )
}
