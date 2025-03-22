import { BackTo } from '@/components/back-to'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const CREDIT_OPTION = {
  Contado: null,
  '1 Semana': 7,
  '2 Semanas': 15,
  '1 Mes': 30,
}
import { StarIcon, Loader2, Plus, LoaderPinwheelIcon } from 'lucide-react'
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
      <article className="mt-4 flex flex-col gap-6 ">
        <div className="grid grid-cols-6 gap-6 md:gap-4">
          {/* Ruc  */}
          <SearchRucButton quotation={quotation} updateQuotation={updateQuotation} />
          {/* Deadline  */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label className="text-muted-foreground" htmlFor="deadline">
              Tiempo de Entrega (Días)
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
              Razóm Social / Nombre Cliente
            </Label>
            {quotation.customer?.name ? (
              <p className="text-green-200">{quotation?.customer?.name}</p>
            ) : (
              <Input
                required
                placeholder="Ejemplo Sociedad Anónima Cerrada"
                type="text"
                id="company"
                value={quotation.customer?.name}
                disabled={pending}
                onChange={(e) =>
                  updateQuotation({
                    ...quotation,
                    customer: {
                      ...quotation.customer,
                      name: e.target.value,
                    },
                  })
                }
              />
            )}
          </div>
          {/* Address */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label className="text-muted-foreground" htmlFor="company">
              Dirección de Cliente
            </Label>

            {quotation.customer?.address ? (
              <p className="text-green-200">{quotation?.customer?.address}</p>
            ) : (
              <Input
                required
                placeholder="Maquinarias 325 Urb. Villa Nueva"
                type="text"
                id="address"
                value={quotation.customer?.address}
                disabled={pending}
                onChange={(e) =>
                  updateQuotation({
                    ...quotation,
                    customer: {
                      ...quotation.customer,
                      address: e.target.value,
                    },
                  })
                }
              />
            )}
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
                <StarIcon
                  size={20}
                  className={
                    quotation.customer?.isRegular
                      ? 'text-primary fill-primary'
                      : 'text-muted-foreground fill-muted-foreground'
                  }
                />
                <span className="text-sm">
                  {quotation.customer?.isRegular ? 'Cliente Frecuente' : 'Cliente Atendido'}
                </span>
              </div>
            )}
          </div>

          {/*Credit */}
          <div className="col-span-6 grid gap-2 ">
            <div className="text-muted-foreground">Forma de Pago</div>
            <div className="flex gap-2 overflow-x-auto">
              {Object.entries(CREDIT_OPTION).map(([key, value]) => (
                <div className="flex items-center gap-2" key={key}>
                  <input
                    type="radio"
                    className="sr-only"
                    value={value}
                    checked={quotation.credit === value}
                    id={key}
                    onChange={(ev) => {
                      updateQuotation({ ...quotation, credit: value })
                    }}
                  />
                  <label
                    htmlFor={key}
                    className="bg-secondary min-w-[120px] text-center px-3 py-2 rounded-md text-secondary-foreground data-[active=true]:bg-primary"
                    data-active={value === quotation.credit ? 'true' : 'false'}
                  >
                    {key}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section>
          <header className="flex items-center justify-between py-4">
            <h2 className="text-xl font-bold ">Items</h2>
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
                <span className="">Agregar </span>
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
