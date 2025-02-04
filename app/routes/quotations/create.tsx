import { redirect, useFetcher } from 'react-router'

const isBrowser = () => typeof window !== 'undefined'

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

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const savedQuotation = JSON.parse(localStorage.get('SAVE_QUOTATION') || '{}')
  console.log('clientLoader', savedQuotation)
  return { savedQuotation, ...serverLoader() }
}

export default function CreateQuotation({ loaderData }: Route.ComponentProps) {
  const { productsPromise, customersPromise } = loaderData
  const data = useLoaderData()

  const fetcher = useFetcher()
  const pending = fetcher.state !== 'idle'

  const handleCreateQuotationSubmit = () => {
    const formData = new FormData()
    formData.append('quotation', JSON.stringify(quotation))
    fetcher.submit(formData, {
      method: 'post',
    })
  }

  const [showModal, setShowModal] = React.useState(false)

  React.useEffect(() => {
    if (fetcher.data) {
      toast.error(fetcher.data.error)
    }
  }, [fetcher.data])

  React.useEffect(() => {
    if (isBrowser()) {
      const savedQuotation = localStorage.getItem('SAVE_QUOTATION')
      if (!savedQuotation) return
      setShowModal(true)
    }
  }, [])

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

  // Guarda la cotizacion en Local Storage por cada cambio en { quotation}
  React.useEffect(() => {
    if (isBrowser() && !showModal) {
      console.log('saveed quotation')
      localStorage.setItem('SAVE_QUOTATION', JSON.stringify(quotation))
    }
  }, [quotation])

  return (
    <>
      {showModal && (
        <div>
          <button
            onClick={() => {
              setShowModal(false)
              const savedQuotation = localStorage.getItem('SAVE_QUOTATION')

              if (!savedQuotation) return

              console.log({ savedQuotation })
              const parsedQuotation = JSON.parse(
                savedQuotation
              ) as CreateQuotationClient

              updateQuotation({
                ...parsedQuotation,
                customer: {
                  ...parsedQuotation.customer,
                },
                items: [...parsedQuotation.items],
              })
            }}
          >
            Aceptar
          </button>
          <button onClick={() => setShowModal(false)}>Cancelar</button>
        </div>
      )}
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
