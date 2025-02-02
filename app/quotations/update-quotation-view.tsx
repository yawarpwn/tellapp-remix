import { useQuotation } from '@/hooks/use-quotation'
import type { Product, Customer, QuotationClient } from '@/types'
import React from 'react'
import { useFetcher } from 'react-router'
import { toast } from 'sonner'
import { CreateUpdateQuotation } from './create-update-quotation'

export function UpdateQuotationView({
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
