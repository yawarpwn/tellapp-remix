//utils
import { getIgv, formatNumberToLocal } from '@/lib/utils'
import * as motion from 'motion/react-client'

import {
  Plus,
  CircleOffIcon,
  FilesIcon,
  EditIcon,
  TrashIcon,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import type { Product, QuotationItem } from '@/types'
import { ProductCard } from './product-card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { SingleInputEdit } from './single-input-edit'

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

  const { formatedIgv, formatedTotal, formatedSubTotal, totalItems } = getIgv(items)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircleOffIcon className="mt-16 h-[30vh] w-20" />
        <h2 className="py-8 text-xl">Sin Produtos agregados</h2>
      </div>
    )
  }
  return (
    <div>
      <div className="overflow-x-auto border rounded-md hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ITEM</TableHead>
              <TableHead className="text-center">DESCRIPCION</TableHead>
              <TableHead className="text-center min-w-[50px]">U/M</TableHead>
              <TableHead className="text-center">CANT</TableHead>
              <TableHead className="text-center">PRECIO</TableHead>
              <TableHead className="text-center">IMPORTE</TableHead>
              <TableHead className="text-center">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <motion.tr key={item.id} layout>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="size-3  p-0"
                      onClick={() => onMoveUpItem(index)}
                      disabled={index == 0}
                    >
                      <ChevronUp size={10} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-3  p-0"
                      onClick={() => onMoveDownItem(index)}
                      disabled={index >= items.length - 1}
                    >
                      <ChevronDown />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="min-w-[400px]">
                  <SingleInputEdit
                    as="textarea"
                    value={item.description}
                    onInputChange={(description) => onEditItem({ ...item, description })}
                    type="text"
                    name="description"
                  />
                </TableCell>
                <TableCell className="p-2">
                  <SingleInputEdit
                    value={item.unitSize}
                    onInputChange={(unitSize) => onEditItem({ ...item, unitSize: unitSize })}
                    type="text"
                    name="name"
                  />
                </TableCell>
                <TableCell className="p-2">
                  <SingleInputEdit
                    value={item.qty}
                    onInputChange={(qty) => onEditItem({ ...item, qty: Number(qty) })}
                    name="qty"
                    type="number"
                  />
                </TableCell>
                <TableCell className="p-2">
                  <SingleInputEdit
                    value={item.price}
                    onInputChange={(price) => onEditItem({ ...item, price: Number(price) })}
                    name="price"
                    type="number"
                  />
                </TableCell>
                <TableCell>{formatNumberToLocal(item.price * item.qty)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="p-2 size-6"
                      onClick={() => onDuplicateItem(item)}
                    >
                      <FilesIcon />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="p-2 size-6"
                      onClick={() => onSelectEditItem(item.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="p-2 size-6"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell className="uppercase font-bold text-right" colSpan={3}>
                Total :
              </TableCell>
              <TableCell className="text-left font-bold">{formatedTotal}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell className="uppercase font-bold text-right" colSpan={2}>
                Items :
              </TableCell>
              <TableCell className="text-left font-bold">{totalItems}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="md:hidden">
        <ul className="flex flex-col gap-4">
          {items.map((item, index) => (
            <motion.li key={item.id} layout>
              <ProductCard
                onDuplicateItem={onDuplicateItem}
                item={item}
                onEditItem={onEditItem}
                index={index}
                onOpenCreateEditItemModal={onSelectEditItem}
                moveUpItem={onMoveUpItem}
                moveDownItem={onMoveDownItem}
                onDeleteItem={onDeleteItem}
                itemsLength={items.length}
              />
            </motion.li>
          ))}
        </ul>
        <div className="mt-2 flex justify-end bg-muted ">
          <dl className="flex p-4 border gap-4 bg-muted">
            <dt className="uppercase font-bold">ITEMS :</dt>
            <dd className="">{totalItems}</dd>
          </dl>
          <dl className="flex p-4 border gap-4 bg-muted">
            <dt className="uppercase font-bold">Total :</dt>
            <dd className="">{formatedTotal}</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}
