import type { Customer } from '@/types'
import { Check, SearchIcon } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'

interface Props {
  customersPromise: Promise<Customer[]>
  customerId?: string | null
  onCustomerPick: (customer: Customer) => void
}

export function CustomerPickerDialog({
  customersPromise,
  customerId,
  onCustomerPick,
}: Props) {
  const customers = React.use(customersPromise)
  if (customers.length === 0) return null
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        type="button"
        onClick={() => setOpen(true)}
      >
        Clientes
        <SearchIcon />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">
          Buscar Clientes frecuentes
        </DialogTitle>
        <CommandInput placeholder="buscar agencia..." />
        <CommandList className="max-h-[700px]">
          <CommandEmpty>Cliente no encontrada</CommandEmpty>
          <CommandGroup heading="Clientes">
            {customers.map((customer) => (
              <CommandItem
                className="cursor-pointer"
                key={customer.id}
                value={customer.name}
                onSelect={() => {
                  onCustomerPick(customer)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 size-2',
                    customer.id === customerId ? 'opacity-100' : 'opacity-30'
                  )}
                />
                {customer.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
