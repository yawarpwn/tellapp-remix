//utils
import { getIgv } from '@/lib/utils'

//ui
import { Button } from '@/components/ui/button'

//icons
import { Plus, CircleOffIcon } from 'lucide-react'

//types
import type { Product, QuotationItem } from '@/types'

//react
import React, { useState } from 'react'

//components
import { CreateEditItemModal } from './create-edit-item-modal'
import { ProductCard } from './product-card'

interface Props {
  items: QuotationItem[]
  productsPromise: Promise<Product[]>
  onDuplicateItem: (item: QuotationItem) => void
  onEditItem: (itemToEdit: QuotationItem) => void
  onDeleteItem: (id: string) => void
  onAddItem: (item: QuotationItem) => void
  onMoveUpItem: (index: number) => void
  onMoveDownItem: (index: number) => void
}

export function ItemsQuotationTable(props: Props) {
  const {
    productsPromise,
    items,
    onDuplicateItem,
    onEditItem,
    onDeleteItem,
    onAddItem,
    onMoveDownItem,
    onMoveUpItem,
  } = props

  const products = React.use(productsPromise)
  //States
  const [seletedProductId, setSelectedProductId] = useState<string | null>(null)
  const productItem = items.find((item) => item.id == seletedProductId)
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false)

  console.log('render quotation tables')

  //functions
  const closeItemModal = () => setOpenCreateEditModal(false)

  const onOpenCreateEditItemModal = (id: string) => {
    setOpenCreateEditModal(true)
    setSelectedProductId(id)
  }

  const { formatedIgv, formatedTotal, formatedSubTotal, totalItems } =
    getIgv(items)

  return (
    <section>
      {openCreateEditModal && (
        <CreateEditItemModal
          open={openCreateEditModal}
          onClose={closeItemModal}
          products={products}
          onAddItem={onAddItem}
          onEditItem={onEditItem}
          item={productItem}
        />
      )}

      <header className="flex items-center justify-between py-4">
        <h2 className="text-xl font-bold ">Productos</h2>
        <div>
          <span className="text-muted-foreground">Items: </span>
          <span className="font-bold text-primary">{totalItems}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => {
              setOpenCreateEditModal(true)
              setSelectedProductId(null)
            }}
            variant={'secondary'}
          >
            <Plus size={20} />
            <span className="ml-2 hidden md:block">Agregar Item</span>
          </Button>
        </div>
      </header>
      {items.length > 0 ? (
        <div>
          <ul className="flex flex-col gap-4">
            {items.map((item, index) => (
              <ProductCard
                onDuplicateItem={onDuplicateItem}
                item={item}
                key={item.id}
                onEditItem={onEditItem}
                index={index}
                onOpenCreateEditItemModal={onOpenCreateEditItemModal}
                moveUpItem={onMoveUpItem}
                moveDownItem={onMoveDownItem}
                onDeleteItem={onDeleteItem}
              />
            ))}
          </ul>

          <div className="mt-2 flex justify-start sm:flex sm:justify-end">
            <div className="w-full space-y-2 sm:w-auto sm:text-right">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-2">
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Subtotal:</dt>
                  <dd className="col-span-2 ">{formatedSubTotal}</dd>
                </dl>
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Igv:</dt>
                  <dd className="col-span-2 ">{formatedIgv}</dd>
                </dl>
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Total:</dt>
                  <dd className="col-span-2 ">{formatedTotal}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CircleOffIcon className="mt-16 h-20 w-20" />
          <h2 className="py-8 text-xl">Sin Produtos agregados</h2>
        </div>
      )}
    </section>
  )
}
