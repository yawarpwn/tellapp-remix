//ui
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFuse } from '@/hooks/use-fuse'
import React, { useState } from 'react'

//utils
import { cn, formatNumberToLocal } from '@/lib/utils'

//types
import { type Product } from '@/types'
import { type QuotationItem } from '@/types'

//icons
import { CircleOffIcon, SearchIcon } from 'lucide-react'

function EmpetyHits() {
  return (
    <div className="flex h-full items-center justify-center ">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-muted-foreground">Sin Resultados</h2>
        <span className="text-muted">
          <CircleOffIcon size={86} />
        </span>
      </div>
    </div>
  )
}

type Props = {
  open: boolean
  products: Product[]
  onClose: () => void
  item?: QuotationItem
  onAddItem: (item: QuotationItem) => void
  onEditItem: (itemToEdit: QuotationItem) => void
}

const initialQuoItem = {
  price: 0,
  qty: 0,
  unitSize: '',
  description: '',
  code: '',
  cost: 0,
  link: '',
}

export function CreateEditItemModal(props: Props) {
  const { open, onClose, item, onAddItem, onEditItem } = props
  const { products } = props
  const qtyInputRef = React.useRef<HTMLInputElement>(null)

  const [quoItem, setQuoItem] = useState<Omit<QuotationItem, 'id'> | QuotationItem>(
    item ?? initialQuoItem,
  )

  const { hits, onSearch } = useFuse<Product>(products, {
    keys: [
      {
        name: 'code',
        weight: 2,
      },
      {
        name: 'description',
        weight: 1,
      },
    ],
  })

  const handleChangeItem = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget

    const updateValue =
      name === 'price' || name === 'qty' || name === 'cost' ? Number(value) : value

    setQuoItem({
      ...quoItem,
      [name]: updateValue,
    })
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    onSearch(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //edit
    if (item) {
      console.log('edit Item')
      onEditItem(quoItem as QuotationItem)
    } else {
      console.log('create Item')
      onAddItem({
        ...quoItem,
        id: crypto.randomUUID(),
      })
    }
    onClose()
  }

  const removeLink = () => {
    setQuoItem({
      ...quoItem,
      link: undefined,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>Crear Item</DialogTitle>
      <DialogContent
        className={cn(
          'flex  max-w-md md:max-w-3xl flex-col border p-2 py-4 md:p-6',
          hits.length === 0 ? 'h-auto' : 'h-[95svh] md:h-[90svh]',
        )}
      >
        {/* Search Product */}
        <header className="">
          <div className="flex h-9 w-full items-center rounded-md border pl-2">
            <SearchIcon className="text-muted" size={20} />
            <Input
              onChange={handleChangeSearch}
              className="border-none focus-visible:ring-0  "
              type="search"
              placeholder="Buscar producto"
            />
          </div>
        </header>
        {/* Items List */}
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {hits.length > 0 ? (
            hits.map((hit) => (
              <button
                key={hit.item.id}
                className="flex flex-col gap-2 rounded-sm border bg-background p-2 hover:bg-muted"
                onClick={() => {
                  setQuoItem({
                    ...quoItem,
                    description: hit.item.description,
                    cost: hit.item.cost,
                    price: hit.item.price,
                    unitSize: hit.item.unitSize,
                    link: hit.item.link ? hit.item.link : '',
                    qty: 1,
                  })
                  qtyInputRef.current?.focus()
                }}
              >
                <div className="line-clamp-2 text-left text-muted-foreground">
                  {hit.item.description}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="lowercase text-muted-foreground">
                    {hit.item.unitSize}
                  </Badge>
                  <Badge variant="outline" className="border border-primary uppercase text-primary">
                    {hit.item.code}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    {formatNumberToLocal(hit.item.price)}
                  </Badge>
                </div>
              </button>
            ))
          ) : (
            <EmpetyHits />
          )}
        </div>
        <div className="h-px w-full bg-muted"></div>

        {/* Inputs Products */}
        <footer>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Textarea
                name="description"
                id="description"
                className="h-[90px] resize-none  bg-muted p-2"
                value={quoItem.description}
                onChange={handleChangeItem}
              />
              {quoItem.link && (
                <button
                  type="button"
                  onClick={removeLink}
                  className="w-full pt-2 text-center text-xs text-primary underline"
                >
                  Quitar link de producto
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="qty">
                  Cantidad
                </label>
                <Input
                  ref={qtyInputRef}
                  id="qty"
                  name="qty"
                  type="number"
                  onChange={handleChangeItem}
                  value={quoItem.qty}
                />
              </div>
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="unitSize">
                  Unidad/Medida
                </label>
                <Input
                  id="unitSize"
                  type="text"
                  name="unitSize"
                  onChange={handleChangeItem}
                  defaultValue={quoItem.unitSize}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="price">
                  Precio
                </label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  onChange={handleChangeItem}
                  value={quoItem.price}
                />
              </div>
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="cost">
                  Costo
                </label>
                <Input
                  id="cost"
                  disabled
                  name="cost"
                  onChange={handleChangeItem}
                  value={quoItem.cost ?? ''}
                />
              </div>
            </div>
            <footer className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="w-full">
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="w-full" type="submit">
                Aceptar
              </Button>
            </footer>
          </form>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
