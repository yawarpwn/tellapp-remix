import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp, TrashIcon, EditIcon, FilesIcon, GripIcon } from 'lucide-react'
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
  itemsLength: number
  onDeleteItem: (id: string) => void
  index: number
}

export function ProductCard(props: Props) {
  const {
    item,
    moveUpItem,
    onEditItem,
    moveDownItem,
    index,
    onDuplicateItem,
    itemsLength,
    onOpenCreateEditItemModal,
    onDeleteItem,
  } = props

  return (
    <div>
      <Card className="border-border">
        <CardContent className="grid gap-2 p-4">
          <div className="flex items-center justify-between [&_button]:size-7 [&_button]:shrink-0 [&_button_svg]:size-4 ">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => moveUpItem(index)}
                disabled={index == 0}
              >
                <ChevronUp />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => moveDownItem(index)}
                disabled={index >= itemsLength - 1}
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
          <SingleInputEdit
            key={`description-id-${item.id}`}
            as="textarea"
            value={item.description}
            onInputChange={(description) => onEditItem({ ...item, description })}
            type="text"
            name="description"
          />
          <Separator className="" />
          <div>
            <div className="grid grid-cols-4 text-[10px] text-muted-foreground/50 [&_span]:text-center">
              <span>Unit/Medid</span>
              <span>Cantidad</span>
              <span>Precio</span>
              <span>Importe</span>
            </div>
            <div className="grid grid-cols-4 items-center text-sm ">
              <SingleInputEdit
                key={`qty-id-${item.id}`}
                value={item.unitSize}
                onInputChange={(unitSize) => onEditItem({ ...item, unitSize: unitSize })}
                type="text"
                name="name"
              />
              <SingleInputEdit
                key={`qlo-id-${item.id}`}
                value={item.qty}
                onInputChange={(qty) => onEditItem({ ...item, qty: Number(qty) })}
                name="qty"
                type="number"
              />
              <SingleInputEdit
                key={`opot-id-${item.id}`}
                value={item.price}
                onInputChange={(price) => onEditItem({ ...item, price: Number(price) })}
                name="price"
                type="number"
              />
              <div className="text-success flex justify-center  rounded px-2 md:px-8 ">
                S/ {item.price * item.qty}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
