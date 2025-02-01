import { redirect, useFetcher } from 'react-router'

import React, { useState } from 'react'
import type { Route } from './+types/create-quotation'
import { fetchCustomers, fetchProducts } from '@/lib/data'
import { createQuotationAction } from '@/lib/actions'
import { toast } from 'sonner'
import { HTTPRequestError } from '@/lib/errors'
import { useQuotation } from '@/hooks/use-quotation'
import { CreateUpdateQuotation } from '@/quotations/create-update-quotation'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const quotation = JSON.parse(formData.get('quotation') as string)
  // const quotation = JSON.parse(formData.get('quotation') as string)
  try {
    await createQuotationAction(quotation)
    return redirect('/quotations')
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      return {
        error: error.message,
        success: false,
      }
    }

    return {
      error: 'Error creating quotation',
      success: false,
    }
  }
}

export async function loader(_: Route.LoaderArgs) {
  return {
    productsPromise: fetchProducts(),
    customersPromise: fetchCustomers({ onlyRegular: true }),
  }
}

export default function CreateQuotation({ loaderData }: Route.ComponentProps) {
  const { productsPromise, customersPromise } = loaderData

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
  } = useQuotation()

  const createQuotationFetcher = useFetcher()
  const pending = createQuotationFetcher.state !== 'idle'

  const handleCreateQuotationSubmit = () => {
    const formData = new FormData()
    formData.append('quotation', JSON.stringify(quotation))
    createQuotationFetcher.submit(formData, {
      method: 'post',
    })
  }

  React.useEffect(() => {
    if (createQuotationFetcher.data) {
      toast.error(createQuotationFetcher.data.error)
    }
  }, [createQuotationFetcher.data])

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
      handleSubmit={handleCreateQuotationSubmit}
      pending={pending}
    />
  )
}
