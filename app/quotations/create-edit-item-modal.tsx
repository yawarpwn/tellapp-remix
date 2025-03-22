//ui
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import React, { useState } from 'react'

//utils
import { cn, formatNumberToLocal } from '@/lib/utils'

//icons
import { Skeleton } from '@/components/ui/skeleton'
import type { Product, QuotationItem } from '@/types'
import { Button } from '@/components/ui/button'
import { ProductList } from './product-list'

type NewType = QuotationItem

type Props = {
  open: boolean
  productsPromise: Promise<Product[]>
  onClose: () => void
  item?: QuotationItem | null
  onAddItem: (item: NewType) => void
  onEditItem: (itemToEdit: QuotationItem) => void
}
export function CreateEditItemModal(props: Props) {
  const { open, onClose, item, onAddItem, onEditItem } = props

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>Crear Item</DialogTitle>
      <DialogContent
        className={cn(
          'flex  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex-col border p-2 py-4 md:p-6',
          'h-[95svh] md:h-[90svh]'
        )}
      >
        <React.Suspense
          fallback={
            <React.Fragment>
              <Skeleton className="h-12" />
              <Skeleton className=" h-auto flex-1 border-orange-500" />
              <Skeleton className="h-[90px]" />
              <div className="flex grid-cols-2 gap-4 ">
                <Skeleton className="w-full h-12"></Skeleton>
                <Skeleton className="w-full h-12"></Skeleton>
              </div>
              <div className="flex grid-cols-2 gap-4 ">
                <Skeleton className="w-full h-12"></Skeleton>
                <Skeleton className="w-full h-12"></Skeleton>
              </div>

              <div className="flex grid-cols-2 gap-4 mt-3 ">
                <Skeleton className="w-full h-12"></Skeleton>
                <Skeleton className="w-full h-12"></Skeleton>
              </div>
            </React.Fragment>
          }
        >
          <ProductList {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  )
}
