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
  const fetcher = useFetcher()
  let pending = fetcher.state !== 'idle'

  React.useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        toast('Cliente encontrado', {
          description: <pre>{JSON.stringify(fetcher.data.customer, null, 2)}</pre>,
        })

        updateQuotation({
          ...quotation,
          customer: fetcher.data.customer,
          customerId: fetcher.data.customer.id,
        })
      } else {
        toast.error(fetcher.data.error)
      }
    }
  }, [fetcher.data])
  return (
    <div className="col-span-4 grid flex-grow  md:col-span-3">
      <Label className="text-muted-foreground" htmlFor="ruc">
        Ruc
      </Label>
      <div className="relative">
        <fetcher.Form method="post" action="/quotations/search-by-ruc">
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
            className="absolute right-1.5 top-1/2 -translate-y-1/2 size-7"
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
        </fetcher.Form>
      </div>
    </div>
  )
}
