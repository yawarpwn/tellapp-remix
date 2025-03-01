import { useFuse } from '@/hooks/use-fuse'
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
import { cn, formatNumberToLocal } from '@/lib/utils'
import type { Product } from '@/types'
import { CircleOffIcon } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
export function Hits({ productsPromise }: { productsPromise: Promise<Product[]> }) {
  const products = React.use(productsPromise)
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
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
      {hits.length > 0 ? (
        hits.map((hit) => (
          <button
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
  )
}
