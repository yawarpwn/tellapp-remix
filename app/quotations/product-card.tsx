import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  ChevronUp,
  TrashIcon,
  EditIcon,
  FilesIcon,
  SeparatorVerticalIcon,
} from 'lucide-react'
import type { Product, QuotationItem } from '@/types'
import { Separator } from '@/components/ui/separator'
import { SingleInputEdit } from './single-input-edit'

interface Props {
  item: QuotationItem
  moveUpItem: (index: number) => void
  moveDownItem: (index: number) => void
  onDuplicateItem: (item: QuotationItem) => void
  onEditItem: (itemToEdit: QuotationItem) => void
  onOpenCreateEditItemModal: (id: string) => void
  onDeleteItem: (id: string) => void
  index: number
}
export function ProductCard(props: Props) {
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const {
    item,
    moveUpItem,
    onEditItem,
    moveDownItem,
    index,
    onDuplicateItem,
    onOpenCreateEditItemModal,
    onDeleteItem,
  } = props

  return (
    <div>
      <Card className="border-border">
        <CardContent className="grid gap-4 p-4">
          <div className="flex items-center justify-between [&_button]:size-7 [&_button]:shrink-0 [&_button_svg]:size-4 ">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => moveUpItem(index)}
              >
                <ChevronUp />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => moveDownItem(index)}
              >
                <ChevronDown />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onDuplicateItem(item)}
              >
                <FilesIcon />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onOpenCreateEditItemModal(item.id)}
              >
                <EditIcon />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onDeleteItem(item.id)}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex min-h-[100px]  w-full flex-col gap-4">
              <textarea
                className={cn(
                  'absolute inset-0 z-20 resize-none border-none outline-none bg-background',
                  !isEditingDescription && 'hidden'
                )}
                onChange={(event) => {
                  onEditItem({
                    ...item,
                    description: event.target.value,
                  })
                }}
                onBlur={() => {
                  setIsEditingDescription(false)
                }}
                name="description"
                value={item.description}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingDescription(false)
                  }
                }}
              />
              <p
                onClick={() => {
                  setIsEditingDescription(true)
                }}
                className={cn(
                  'absolute inset-0 z-10',
                  isEditingDescription && 'hidden'
                )}
              >
                {item.description}
              </p>
            </div>
          </div>
          <Separator className="mb-1" />
          <div className="flex space-x-4 items-center text-sm h-5">
            <SingleInputEdit
              value={item.unitSize}
              className="flex-1"
              onInputChange={(unitSize) =>
                onEditItem({ ...item, unitSize: unitSize })
              }
              type="text"
              name="name"
            />
            <Separator orientation="vertical" />
            <SingleInputEdit
              className="flex-1"
              value={item.qty}
              onInputChange={(qty) => onEditItem({ ...item, qty: Number(qty) })}
              name="qty"
              type="number"
            />
            <Separator orientation="vertical" />
            <SingleInputEdit
              className="flex-1"
              value={item.price}
              onInputChange={(price) =>
                onEditItem({ ...item, price: Number(price) })
              }
              name="price"
              type="number"
            />
            <Separator orientation="vertical" />
            <div className="text-success flex justify-center  rounded px-2 md:px-8 ">
              S/ {item.price * item.qty}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
