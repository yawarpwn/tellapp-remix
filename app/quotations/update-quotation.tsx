import { useQuotation } from '@/hooks/use-quotation'
import React from 'react'
import { useFetcher } from 'react-router'
import { toast } from 'sonner'
import { CreateUpdateQuotation } from './create-update-quotation'
import type { Customer, Product, QuotationClient } from '@/types'

export function UpdateQuotation({
  quotationPromise,
  productsPromise,
  customersPromise,
}: {
  quotationPromise: Promise<QuotationClient>
  productsPromise: Promise<Product[]>
  customersPromise: Promise<Customer[]>
}) {
  const quotationFromDb = React.use(quotationPromise)

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
  } = useQuotation(quotationFromDb)

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
      products={productsPromise}
      customers={customersPromise}
      handleSubmit={handleUpdateQuotation}
      pending={pending}
    />
  )
}
