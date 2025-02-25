import { useFetcher } from 'react-router'

import React from 'react'
import type { Route } from './+types/create'
import { fetchCustomers, fetchProducts } from '@/lib/data'
import { toast } from 'sonner'
import { useQuotation } from '@/hooks/use-quotation'
import { CreateUpdateQuotation } from '@/quotations/create-update-quotation'
import type { CreateQuotationClient } from '@/types'
import { Dialog, DialogDescription, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAutoSave } from '@/hooks/use-auto-save'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'

export async function loader({ context }: Route.LoaderArgs) {
  return {
    products: fetchProducts(context.cloudflare.env.TELL_API_KEY),
    customers: fetchCustomers(context.cloudflare.env.TELL_API_KEY, { onlyRegular: true }),
  }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  return serverLoader()
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  return <UpdateCreateQuotationSkeleton />
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
  const { products, customers } = loaderData
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

  const {
    showRecuperationModal,
    closeRecuperationModal,
    clearSavedQuotation,
    removeStoredQuotation,
  } = useAutoSave({
    quotation,
    updateQuotation,
    initialQuotation: INITIAL_QUOTATION,
  })

  const fetcher = useFetcher()
  const pending = fetcher.state !== 'idle'

  const handleCreateQuotationSubmit = () => {
    const formData = new FormData()
    formData.append('quotation', JSON.stringify(quotation))
    fetcher.submit(formData, {
      method: 'post',
      action: '/action/create-quotation',
    })
    removeStoredQuotation()
  }

  React.useEffect(() => {
    if (fetcher.data) {
      toast.error(fetcher.data.error)
    }
  }, [fetcher.data])

  return (
    <>
      <Dialog open={showRecuperationModal} onOpenChange={closeRecuperationModal}>
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
        products={products}
        customers={customers}
        handleSubmit={handleCreateQuotationSubmit}
        pending={pending}
      />
    </>
  )
}
