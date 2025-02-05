import { redirect, useFetcher } from 'react-router'
import compare from 'just-compare'

import React from 'react'
import type { Route } from './+types/create'
import { fetchCustomers, fetchProducts } from '@/lib/data'
import { createQuotationAction } from '@/lib/actions'
import { toast } from 'sonner'
import { HTTPRequestError } from '@/lib/errors'
import { useQuotation } from '@/hooks/use-quotation'
import { CreateUpdateQuotation } from '@/quotations/create-update-quotation'
import { useLoaderData } from 'react-router'
import type { CreateQuotationClient } from '@/types'
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

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

const INITIAL_QUOTATION: CreateQuotationClient = {
  deadline: 1,
  includeIgv: true,
  credit: null,
  customerId: null,
  isPaymentPending: false,
  items: [],
  customer: {
    id: '',
    name: '',
    ruc: '',
    phone: undefined,
    address: '',
    email: undefined,
    isRegular: false,
  },
}
export default function CreateQuotation({ loaderData }: Route.ComponentProps) {
  const { productsPromise, customersPromise } = loaderData

  const fetcher = useFetcher()
  const pending = fetcher.state !== 'idle'

  const handleCreateQuotationSubmit = () => {
    const formData = new FormData()
    formData.append('quotation', JSON.stringify(quotation))
    fetcher.submit(formData, {
      method: 'post',
    })
  }

  const [savedQuotation, setSavedQuotation] =
    React.useState<CreateQuotationClient | null>(null)
  const [showModal, setShowModal] = React.useState(false)

  React.useEffect(() => {
    if (fetcher.data) {
      toast.error(fetcher.data.error)
    }
  }, [fetcher.data])

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
  } = useQuotation(INITIAL_QUOTATION)

  const SAVED_QUOTATION_KEY = 'SAVED_QUOTATION'

  React.useEffect(() => {
    if (compare(INITIAL_QUOTATION, quotation)) return
    console.log('saved quotation')
    localStorage.setItem(SAVED_QUOTATION_KEY, JSON.stringify(quotation))
  }, [quotation])

  React.useLayoutEffect(() => {
    const saveQuotation = getSavedQuotation()
    if (!saveQuotation) return
    updateQuotation(saveQuotation)
    setShowModal(true)
  }, [])

  const getSavedQuotation = () => {
    const savedQuotation = localStorage.getItem(SAVED_QUOTATION_KEY)
    if (!savedQuotation) return null
    return JSON.parse(savedQuotation)
  }

  const clearSavedQuotation = () => {
    localStorage.removeItem(SAVED_QUOTATION_KEY)
  }

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-xs">
          <DialogTitle className="text-center">Recupea Cotización!</DialogTitle>
          <DialogDescription className="text-center">
            Hemos recuperado una cotización, ¿Deseas restaurarla?
          </DialogDescription>
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => {
                clearSavedQuotation()
                updateQuotation(INITIAL_QUOTATION)
                setShowModal(false)
              }}
            >
              Cancelar
            </Button>
            <Button onClick={() => setShowModal(false)}>Aceptar</Button>
          </div>
        </DialogContent>
      </Dialog>
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
    </>
  )
}
