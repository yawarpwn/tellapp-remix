import { SAVED_QUOTATION_KEY } from '@/lib/constants'
import type { CreateQuotationClient, QuotationClient } from '@/types'
import compare from 'just-compare'
import React from 'react'

type Props = {
  updateQuotation: (quotation: QuotationClient | CreateQuotationClient) => void
  quotation: QuotationClient | CreateQuotationClient
  initialQuotation: CreateQuotationClient
}

export function useAutoSave({ quotation, updateQuotation, initialQuotation }: Props) {
  const [showRecuperationModal, setShowRecuperationModal] = React.useState(false)

  React.useEffect(() => {
    if (compare(initialQuotation, quotation)) return
    localStorage.setItem(SAVED_QUOTATION_KEY, JSON.stringify(quotation))
  }, [quotation])

  React.useLayoutEffect(() => {
    const saveQuotation = getSavedQuotation()
    if (!saveQuotation) return
    updateQuotation(saveQuotation)
    setShowRecuperationModal(true)
  }, [])

  const getSavedQuotation = () => {
    const savedQuotation = localStorage.getItem(SAVED_QUOTATION_KEY)
    if (!savedQuotation) return null
    return JSON.parse(savedQuotation)
  }

  const removeStoredQuotation = () => {
    localStorage.removeItem(SAVED_QUOTATION_KEY)
  }

  const clearSavedQuotation = () => {
    removeStoredQuotation()
    updateQuotation(initialQuotation)
    closeRecuperationModal()
  }

  const closeRecuperationModal = () => {
    setShowRecuperationModal(false)
  }

  return {
    removeStoredQuotation,
    clearSavedQuotation,
    showRecuperationModal,
    closeRecuperationModal,
  }
}
