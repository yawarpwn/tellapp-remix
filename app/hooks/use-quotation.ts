import type { CreateQuotationClient, Customer, QuotationClient, QuotationItem } from '@/types'
import React from 'react'

export function useQuotation(initialState: QuotationClient | CreateQuotationClient) {
  const [quotation, setQuotation] = React.useState<QuotationClient | CreateQuotationClient>(
    initialState,
  )

  const [showCreditOption, setShowCreditOption] = React.useState(false)

  const addItem = (item: QuotationItem) => {
    setQuotation({
      ...quotation,
      items: [...quotation.items, item],
    })
  }

  const deleteItem = (id: string) => {
    setQuotation({
      ...quotation,
      items: quotation.items.filter((item) => item.id !== id),
    })
  }

  const editItem = (itemToEdit: QuotationItem) => {
    setQuotation({
      ...quotation,
      items: quotation.items.map((item) => {
        if (item.id === itemToEdit.id) {
          return itemToEdit
        }
        return item
      }),
    })
  }

  const duplicateItem = (item: QuotationItem) => {
    setQuotation({
      ...quotation,
      items: [...quotation.items, { ...item, id: crypto.randomUUID() }],
    })
  }

  const pickCustomer = (customer: Customer) => {
    setQuotation({
      ...quotation,
      customerId: customer.id,
      customer,
    })
  }

  const move = (currentIndex: number, nextIndex: number) => {
    const newItems = [...quotation.items]
    newItems[currentIndex] = quotation.items[nextIndex]
    newItems[nextIndex] = quotation.items[currentIndex]
    setQuotation({
      ...quotation,
      items: newItems,
    })
  }

  const moveUpItem = (index: number) => {
    if (index > 0) {
      move(index, index - 1)
    }
  }

  const moveDownItem = (index: number) => {
    if (index < quotation.items.length - 1) {
      move(index, index + 1)
    }
  }

  const updateQuotation = (quotation: QuotationClient | CreateQuotationClient) => {
    setQuotation(quotation)
  }

  const toggleCreditOption = (checked: boolean) => {
    setShowCreditOption(checked)
  }

  const hasItems = quotation.items.length !== 0

  return {
    quotation,
    updateQuotation,
    addItem,
    deleteItem,
    editItem,
    duplicateItem,
    moveUpItem,
    moveDownItem,
    pickCustomer,
    hasItems,
    toggleCreditOption,
    showCreditOption,
  }
}
