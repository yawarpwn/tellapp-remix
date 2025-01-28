import type { Customer } from "@/types";
import { Check, SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  customers: Customer[];
  customerId?: string | null;
  onCustomerPick: (customer: Customer) => void;
}
export function CustomerPickerDialog({
  customers,
  customerId,
  onCustomerPick,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="secondary"
        type="button"
        className="w-full"
        onClick={() => setOpen(true)}
      >
        Clientes
        <SearchIcon className="ml-2 size-4" />
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
                  onCustomerPick(customer);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 size-2",
                    customer.id === customerId ? "opacity-100" : "opacity-30"
                  )}
                />
                {customer.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
