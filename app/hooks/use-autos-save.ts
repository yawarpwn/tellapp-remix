import type { CreateQuotationClient, QuotationClient } from '@/types'
import compare from 'just-compare'
import React from 'react'

const SAVED_QUOTATION_KEY = 'SAVED_QUOTATION'
type Props = {
  updateQuotation: (quotation: QuotationClient | CreateQuotationClient) => void
  quotation: QuotationClient | CreateQuotationClient
  initialQuotation: CreateQuotationClient
}
export function useAutoSave({
  quotation,
  updateQuotation,
  initialQuotation,
}: Props) {
  const [showRecuperationModal, setShowRecuperationModal] =
    React.useState(false)
  React.useEffect(() => {
    if (compare(initialQuotation, quotation)) return
    console.log('saved quotation')
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

  const clearSavedQuotation = () => {
    localStorage.removeItem(SAVED_QUOTATION_KEY)
    updateQuotation(initialQuotation)
    closeRecuperationModal()
  }

  const closeRecuperationModal = () => {
    setShowRecuperationModal(false)
  }

  return {
    clearSavedQuotation,
    showRecuperationModal,
    closeRecuperationModal,
  }
}
