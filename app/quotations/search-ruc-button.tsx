import React from 'react'
import { toast } from 'sonner'
import { Label } from '@radix-ui/react-label'
import { Loader2Icon, SearchIcon, XIcon } from 'lucide-react'
import { useFetcher } from 'react-router'
import type { CreateQuotationClient } from '@/types'

export function SearchRucButton({
  quotation,
  updateQuotation,
}: {
  quotation: CreateQuotationClient | CreateQuotationClient
  updateQuotation: (quotation: CreateQuotationClient) => void
}) {
  const fetcher = useFetcher()
  let pending = fetcher.state !== 'idle'

  React.useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        toast.success(quotation.customer.ruc, {
          description: fetcher.data.customer.name,
        })

        updateQuotation({
          ...quotation,
          customer: fetcher.data.customer,
          customerId: fetcher.data.customer.id,
        })
      } else {
        toast.error(quotation.customer.ruc, {
          description: fetcher.data.error,
        })
      }
    }
  }, [fetcher.data])

  const resetCustomer = () => {
    updateQuotation({
      ...quotation,
      customerId: undefined,
      customer: {
        name: '',
        ruc: '',
        address: '',
        isRegular: false,
      },
    })
  }
  return (
    <div className="col-span-6 grid flex-grow  md:col-span-3">
      <Label className="text-muted-foreground" htmlFor="ruc">
        Ruc
      </Label>
      <div className="relative">
        <fetcher.Form method="post" action="/quotations/search-by-ruc">
          <div className="flex h-9 items-center gap-2 w-full rounded-md border border-input bg-transparent px-1 py-1 text-base shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <SearchIcon className="h-[1em] opacity-50" />
            <input
              required
              className="bg-transparent outline-none border-none placeholder:text-muted-foreground/50"
              placeholder="20610555555"
              id="ruc"
              autoComplete="true"
              value={quotation?.customer?.ruc ?? ''}
              type="number"
              name="ruc"
              disabled={pending}
              onChange={(e) =>
                updateQuotation({
                  ...quotation,
                  customer: { ...quotation?.customer, ruc: e.target.value },
                })
              }
            />
          </div>
          <button
            type="button"
            disabled={pending}
            onClick={resetCustomer}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 size-5 bg-muted text-muted-foreground hover:text-foreground  rounded-full flex items-center justify-center"
          >
            {pending ? (
              <Loader2Icon className="size-3 animate-spin" />
            ) : (
              <span>
                <XIcon className="size-3 " />
              </span>
            )}
          </button>
        </fetcher.Form>
      </div>
    </div>
  )
}
