import type { Agency } from '@/types'
import { Check } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  agencies: Agency[]
  agencyId?: string | null
  onPickAgency: (agencyId: string) => void
}
export function PickAgencyDialog({ agencies, agencyId, onPickAgency }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="button" variant="secondary" className="w-full" onClick={() => setOpen(true)}>
        <span className="truncate">
          {agencyId ? agencies.find((a) => a.id === agencyId)?.name : 'Selecionar Agencia'}
        </span>
        <ChevronDown className="ml-2 size-3" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="buscar agencia..." />
        <CommandList className="max-h-[500px]">
          <CommandEmpty>Agencia no encontrada</CommandEmpty>
          <CommandGroup heading="Agenias">
            {agencies.map((agency) => (
              <CommandItem
                key={agency.id}
                value={agency.name}
                onSelect={() => {
                  onPickAgency(agency.id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 size-2',
                    agency.id === agencyId ? 'opacity-100' : 'opacity-30',
                  )}
                />
                {agency.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
