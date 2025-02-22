import { redirect, useFetcher } from 'react-router'

import React from 'react'
import type { Route } from './+types/create'
import { fetchCustomers, fetchProducts, createQuotation } from '@/lib/data'
import { toast } from 'sonner'
import { HTTPRequestError } from '@/lib/errors'
import { useQuotation } from '@/hooks/use-quotation'
import { CreateUpdateQuotation } from '@/quotations/create-update-quotation'
import type { CreateQuotationClient } from '@/types'
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAutoSave } from '@/hooks/use-autos-save'

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const quotation = JSON.parse(formData.get('quotation') as string)
  // const quotation = JSON.parse(formData.get('quotation') as string)
  try {
    await createQuotation(quotation, context.cloudflare.env.TELL_API_KEY)
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

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  console.log('client action')
  localStorage.removeItem('__QUOS__')
  const serverData = await serverAction()
  return serverData
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    productsPromise: fetchProducts(context.cloudflare.env.TELL_API_KEY),
    customersPromise: fetchCustomers(context.cloudflare.env.TELL_API_KEY, {
      onlyRegular: true,
    }),
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

  const { showRecuperationModal, closeRecuperationModal, clearSavedQuotation } =
    useAutoSave({
      quotation,
      updateQuotation,
      initialQuotation: INITIAL_QUOTATION,
    })

  return (
    <>
      <Dialog
        open={showRecuperationModal}
        onOpenChange={closeRecuperationModal}
      >
        <DialogContent className="max-w-xs">
          <DialogTitle className="text-center">Recupea Cotización!</DialogTitle>
          <DialogDescription className="text-center">
            Hemos recuperado una cotización, ¿Deseas restaurarla?
          </DialogDescription>
          <div className="flex items-center justify-between">
            <Button variant="secondary" onClick={clearSavedQuotation}>
              Cancelar
            </Button>
            <Button onClick={closeRecuperationModal}>Aceptar</Button>
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
