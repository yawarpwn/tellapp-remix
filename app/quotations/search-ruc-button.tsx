import React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Loader2Icon, SearchIcon } from 'lucide-react'
import { useFetcher } from 'react-router'
import type { CreateQuotationClient } from '@/types'

export function SearchRucButton({
  quotation,
  updateQuotation,
}: {
  quotation: CreateQuotationClient | CreateQuotationClient
  updateQuotation: (quotation: CreateQuotationClient) => void
}) {
  const searchRucFetcher = useFetcher()
  let pending = searchRucFetcher.state !== 'idle'

  React.useEffect(() => {
    if (searchRucFetcher.data) {
      if (searchRucFetcher.data.success) {
        toast('Cliente encontrado', {
          description: (
            <pre>{JSON.stringify(searchRucFetcher.data.customer, null, 2)}</pre>
          ),
        })

        updateQuotation({
          ...quotation,
          customer: {
            ...quotation.customer,
            ruc: searchRucFetcher.data.customer.ruc,
            name: searchRucFetcher.data.customer.name,
            address: searchRucFetcher.data.customer.address,
          },
          customerId: searchRucFetcher.data.customer.id,
        })
      } else {
        toast.error(searchRucFetcher.data.error)
      }
    }
  }, [searchRucFetcher.data])
  return (
    <div className="col-span-4 grid flex-grow gap-2 md:col-span-3">
      <Label className="text-muted-foreground" htmlFor="ruc">
        Ruc
      </Label>
      <div className="relative">
        <searchRucFetcher.Form method="post" action="/quotations/search-by-ruc">
          <Input
            required
            id="ruc"
            autoComplete=""
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
          <Button
            size="icon"
            type="submit"
            disabled={pending}
            className="absolute right-1.5 top-1 size-7"
            variant="outline"
          >
            {pending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <span>
                <SearchIcon className="size-4 " />
              </span>
            )}
          </Button>
        </searchRucFetcher.Form>
      </div>
    </div>
  )
}
