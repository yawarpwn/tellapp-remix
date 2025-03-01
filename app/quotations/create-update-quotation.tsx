import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { StarIcon, Loader2, Plus } from 'lucide-react'
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
import { QuotationItemsTableSkeleton } from '@/components/ui/quotation-items-table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateEditItemModal } from './create-edit-item-modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'

type Props = {
  quotation: QuotationClient | CreateQuotationClient
  pending: boolean
  customers: Promise<Customer[]>
  pickCustomer: (customer: Customer) => void
  updateQuotation: (quotation: QuotationClient | CreateQuotationClient) => void
  showCreditOption: boolean
  products: Promise<Product[]>
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
  customers,
  showCreditOption,
  products: productsPromise,
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
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null)
  const [openCreateEditModal, setOpenCreateEditModal] = React.useState(false)
  const selectedItem = React.useMemo(
    () => quotation.items.find((item) => item.id === selectedItemId) ?? null,
    [quotation.items, selectedItemId]
  )

  const closeItemModal = () => setOpenCreateEditModal(false)

  const handleSelectEditItem = (id: string | null) => {
    setSelectedItemId(id)
    setOpenCreateEditModal(true)
  }

  return (
    <div className="pb-8">
      {openCreateEditModal && (
        <CreateEditItemModal
          open={openCreateEditModal}
          onClose={closeItemModal}
          productsPromise={productsPromise}
          onAddItem={addItem}
          onEditItem={editItem}
          item={selectedItem}
        />
      )}
      <header className="flex justify-between">
        <BackTo to="/quotations" />
        <div className="">
          <React.Suspense fallback={<Skeleton className="w-[95px] h-[32px]"></Skeleton>}>
            <CustomerPickerDialog
              customersPromise={customers}
              onCustomerPick={pickCustomer}
              customerId={quotation.customerId}
            />
          </React.Suspense>
        </div>
      </header>
      <article className="mt-4 flex flex-col gap-4 ">
        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {/* Ruc  */}
          <SearchRucButton quotation={quotation} updateQuotation={updateQuotation} />
          {/* Deadline  */}
          <div className="col-span-2 grid gap-2 md:col-span-3">
            <Label className="text-muted-foreground" htmlFor="deadline">
              Entrega
            </Label>
            <Input
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
              name="customer.name"
              type="text"
              value={quotation?.customer?.name ?? ''}
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
              onCheckedChange={(e) => updateQuotation({ ...quotation, includeIgv: Boolean(e) })}
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

        <section>
          <header className="flex items-center justify-between py-4">
            <h2 className="text-xl font-bold ">Productos</h2>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => {
                  setOpenCreateEditModal(true)
                  setSelectedItemId(null)
                }}
                variant={'secondary'}
              >
                <Plus size={20} />
                <span className="ml-2 hidden md:block">Agregar Item</span>
              </Button>
            </div>
          </header>
          <React.Suspense fallback={<QuotationItemsTableSkeleton />}>
            <ItemsQuotationTable
              onSelectEditItem={handleSelectEditItem}
              onAddItem={addItem}
              items={quotation.items}
              onEditItem={editItem}
              onDeleteItem={deleteItem}
              onDuplicateItem={duplicateItem}
              onMoveDownItem={moveDownItem}
              onMoveUpItem={moveUpItem}
            />
          </React.Suspense>
        </section>

        <footer className="flex items-center justify-between">
          <Button variant="outline" disabled={false} type="button" className="px-12" asChild>
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
