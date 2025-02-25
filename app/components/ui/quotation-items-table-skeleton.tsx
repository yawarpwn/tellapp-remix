import { ProductCard } from '@/quotations/product-card'
import { CircleOffIcon, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function QuotationItemsTableSkeleton() {
  return (
    <section>
      <header className="flex items-center justify-between py-4">
        <h2 className="text-xl font-bold ">Productos</h2>
        <div>
          <span className="text-muted-foreground">Items: </span>
          <span className="font-bold text-primary">0</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant={'secondary'} disabled={true}>
            <Plus size={20} />
            <span className="ml-2 hidden md:block">Agregar Item</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-col items-center gap-4">
        <CircleOffIcon className="mt-16 h-[30vh] w-20" />
        <h2 className="py-8 text-xl">Sin Produtos agregados</h2>
      </div>
    </section>
  )
}
