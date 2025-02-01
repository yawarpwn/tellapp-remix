import { redirect, useFetcher } from 'react-router'
import { handleError } from '@/lib/utils'

import React from 'react'
import type { Route } from './+types/update-quotation'
import {
  fetchCustomers,
  fetchProducts,
  fetchQuotaitonByNumber,
} from '@/lib/data'
import { updateQuotationAction } from '@/lib/actions'
import { toast } from 'sonner'
import { HTTPRequestError } from '@/lib/errors'
import { useQuotation } from '@/hooks/use-quotation'
import { CreateUpdateQuotation } from '@/quotations/create-update-quotation'
import type { Customer, Product, QuotationClient } from '@/types'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const quotation = JSON.parse(formData.get('quotation') as string)
  console.log({ quotation })
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

export function UpdateQuotation({
  productsPromise,
  customersPromise,
  quotationPromise,
}: {
  productsPromise: Promise<Product[]>
  customersPromise: Promise<Customer[]>
  quotationPromise: Promise<QuotationClient>
}) {
  const quotatoinFromDb = React.use(quotationPromise)
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
      productsPromise={productsPromise}
      customersPromise={customersPromise}
      handleSubmit={handleUpdateQuotation}
      pending={pending}
    />
  )
}

export default function WrapperUpdateQuotation({
  loaderData,
}: Route.ComponentProps) {
  return (
    <React.Suspense fallback="loading...">
      <UpdateQuotation {...loaderData} />
    </React.Suspense>
  )
}
