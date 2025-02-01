import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { StarIcon, Loader2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { CustomerPickerDialog } from './customer-pick-dialog'
import { ItemsQuotationTable } from './items-quotation-table'
import { SearchRucButton } from './search-ruc-button'
import type {
  CreateQuotationClient,
  Customer,
  Product,
  QuotationClient,
  QuotationItem,
} from '@/types'

type Props = {
  quotation: QuotationClient | CreateQuotationClient
  pending: boolean
  customersPromise: Promise<Customer[]>
  pickCustomer: (customer: Customer) => void
  updateQuotation: (quotation: QuotationClient | CreateQuotationClient) => void
  showCreditOption: boolean
  productsPromise: Promise<Product[]>
  hasItems: boolean
  addItem: (item: QuotationItem) => void
  editItem: (itemToEdit: QuotationItem) => void
  duplicateItem: (item: QuotationItem) => void
  deleteItem: (id: string) => void
  moveUpItem: (index: number) => void
  moveDownItem: (index: number) => void
  toggleCreditOption: (checked: boolean) => void
  handleSubmit: () => void
}
export function CreateUpdateQuotation({
  quotation,
  pending,
  pickCustomer,
  updateQuotation,
  customersPromise,
  showCreditOption,
  productsPromise,
  hasItems,
  addItem,
  moveDownItem,
  moveUpItem,
  deleteItem,
  editItem,
  duplicateItem,
  toggleCreditOption,
  handleSubmit,
}: Props) {
  return (
    <div className="pb-8">
      <header className="flex justify-between">
        <BackTo to="/quotations" compact />
        <div className="">
          <React.Suspense fallback="cargando...">
            <CustomerPickerDialog
              customersPromise={customersPromise}
              onCustomerPick={pickCustomer}
              customerId={quotation.customerId}
            />
          </React.Suspense>
        </div>
      </header>
      <article className="mt-4 flex flex-col gap-4 ">
        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {/* Ruc  */}
          <SearchRucButton
            quotation={quotation}
            updateQuotation={updateQuotation}
          />
          {/* Deadline  */}
          <div className="col-span-2 grid gap-2 md:col-span-3">
            <Label className="text-muted-foreground" htmlFor="deadline">
              Entrega
            </Label>
            <Input
              className={
                quotation?.deadline === 0 ? 'border border-destructive' : ''
              }
              required
              type="number"
              id="deadline"
              value={quotation.deadline}
              disabled={pending}
              onChange={(e) =>
                updateQuotation({
                  ...quotation,
                  deadline: Number(e.target.value),
                })
              }
            />
          </div>
          {/* Customer */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label className="text-muted-foreground" htmlFor="company">
              Cliente
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              value={quotation?.customer?.name ?? ''}
              disabled={true}
              onChange={(e) => {
                updateQuotation({
                  ...quotation,
                  customer: { ...quotation?.customer, name: e.target.value },
                })
              }}
            />
          </div>
          {/* Address */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label className="text-muted-foreground" htmlFor="company">
              Dirección
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={quotation?.customer?.address ?? ''}
              disabled={true}
              onChange={(e) => {
                updateQuotation({
                  ...quotation,
                  customer: { ...quotation.customer, address: e.target.value },
                })
              }}
            />
          </div>
          {/* Include IGV */}
          <div className="col-span-3 flex items-center gap-2 ">
            <Checkbox
              id="includeIgv"
              onCheckedChange={(e) =>
                updateQuotation({ ...quotation, includeIgv: Boolean(e) })
              }
              checked={quotation.includeIgv}
            />
            <Label htmlFor="includeIgv">Incluir IGV</Label>
          </div>

          {/* is Regular Customer */}
          <div className="col-span-3 flex w-full items-center justify-between">
            {quotation.customerId && (
              <div
                className="flex 
                  items-center gap-2"
              >
                <StarIcon className="size-5 text-primary" />
                <span className="text-sm">Cliente Atendido</span>
              </div>
            )}
          </div>

          {/*Credit */}
          <div className="col-span-3 flex h-9 items-center gap-2">
            <Switch
              checked={showCreditOption}
              onCheckedChange={(checked) => toggleCreditOption(checked)}
            />
            <Label htmlFor="credit">Pago a Credito?</Label>
          </div>
          {showCreditOption && (
            <div className="flex items-center gap-2">
              <Input
                id="credit"
                name="credit"
                type="number"
                className="w-32 grow"
                value={quotation.credit ?? ''}
                placeholder="30"
                onChange={(e) => {
                  const { value } = e.target
                  const credit = value ? Number(value) : null
                  updateQuotation({ ...quotation, credit })
                }}
              />
              <span>Días</span>
            </div>
          )}
        </div>

        <React.Suspense fallback="...cargando">
          <ItemsQuotationTable
            productsPromise={productsPromise}
            onAddItem={addItem}
            items={quotation.items}
            onEditItem={editItem}
            onDeleteItem={deleteItem}
            onDuplicateItem={duplicateItem}
            onMoveDownItem={moveDownItem}
            onMoveUpItem={moveUpItem}
          />
        </React.Suspense>
        <footer className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={false}
            type="button"
            className="px-12"
            asChild
          >
            <Link to="/quotations">Cancelar</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-12"
            disabled={pending || !hasItems || quotation.deadline === 0}
            type="submit"
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {'id' in (quotation as QuotationClient) ? 'Actualizar' : 'Crear'}
          </Button>
        </footer>
      </article>
    </div>
  )
}
