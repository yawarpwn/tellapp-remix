//utils
import { getIgv } from '@/lib/utils'
import { createSwapy, utils, type Swapy, type SlotItemMapArray } from 'swapy'
import { Plus, CircleOffIcon } from 'lucide-react'
import type { Product, QuotationItem } from '@/types'
import React, { useState } from 'react'
import { ProductCard } from './product-card'

interface Props {
  items: QuotationItem[]
  onDuplicateItem: (item: QuotationItem) => void
  onEditItem: (itemToEdit: QuotationItem) => void
  onDeleteItem: (id: string) => void
  onAddItem: (item: QuotationItem) => void
  onMoveUpItem: (index: number) => void
  onMoveDownItem: (index: number) => void
  onSelectEditItem: (id: string) => void
}

export function ItemsQuotationTable(props: Props) {
  const {
    items,
    onDuplicateItem,
    onEditItem,
    onDeleteItem,
    onAddItem,
    onMoveDownItem,
    onSelectEditItem,
    onMoveUpItem,
  } = props

  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    utils.initSlotItemMap(items, 'id')
  )
  const slottedItems = React.useMemo(
    () => utils.toSlottedItems(items, 'id', slotItemMap),
    [items, slotItemMap]
  )
  const swapyRef = React.useRef<Swapy | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { formatedIgv, formatedTotal, formatedSubTotal, totalItems } = getIgv(items)

  React.useEffect(
    () => utils.dynamicSwapy(swapyRef.current, items, 'id', slotItemMap, setSlotItemMap),
    [items]
  )

  React.useEffect(() => {
    if (!containerRef.current) return
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      // animation: 'dynamic'
      // autoScrollOnDrag: true,
      // swapMode: 'drop',
      // enabled: true,
      // dragAxis: 'x',
      // dragOnHold: true
    })

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray)
    })

    return () => {
      swapyRef.current?.destroy()
    }
  }, [])

  if (slottedItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircleOffIcon className="mt-16 h-[30vh] w-20" />
        <h2 className="py-8 text-xl">Sin Produtos agregados</h2>
      </div>
    )
  }
  return (
    <div>
      <div className="items" ref={containerRef}>
        <div className="flex flex-col gap-4">
          {slottedItems.map(({ slotId, itemId, item }, index) => (
            <div className="slot" key={slotId} data-swapy-slot={slotId}>
              {item && (
                <div className="item" data-swapy-item={itemId} key={itemId}>
                  <ProductCard
                    onDuplicateItem={onDuplicateItem}
                    item={item}
                    key={slotId}
                    onEditItem={onEditItem}
                    index={index}
                    onOpenCreateEditItemModal={onSelectEditItem}
                    moveUpItem={onMoveUpItem}
                    moveDownItem={onMoveDownItem}
                    onDeleteItem={onDeleteItem}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-start sm:flex sm:justify-end">
        <div className="w-full sm:w-auto sm:text-right mt-4">
          <div className="grid grid-cols-[1fr_2fr_2fr_2fr] gap-2 sm:grid-cols-1 sm:gap-2">
            <dl className="grid gap-x-3 sm:grid-cols-5">
              <dt className="col-span-3 font-semibold text-primary ">Items:</dt>
              <dd className="col-span-2 ">{totalItems}</dd>
            </dl>
            <dl className="grid gap-x-3 sm:grid-cols-5">
              <dt className="col-span-3 font-semibold text-primary ">Subtotal:</dt>
              <dd className="col-span-2 ">{formatedSubTotal}</dd>
            </dl>
            <dl className="grid gap-x-3 sm:grid-cols-5">
              <dt className="col-span-3 font-semibold text-primary ">Igv:</dt>
              <dd className="col-span-2 ">{formatedIgv}</dd>
            </dl>
            <dl className="grid gap-x-3 sm:grid-cols-5">
              <dt className="col-span-3 font-semibold text-primary">Total:</dt>
              <dd className="col-span-2 ">{formatedTotal}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
