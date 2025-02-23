import { Skeleton } from '@/components/ui/skeleton'
import { TableSkeleton } from './table-skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function UpdateCreateQuotationSkeleton() {
  return (
    <div>
      <div className="flex justify-end">
        <Skeleton className="h-8 w-36" />
      </div>
      <div className="mt-8 grid gap-4">
        <div className="grid gap-2 lg:grid-cols-2">
          <div className="grid gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="grid gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6" />
          </div>
        </div>
        <div className="grid gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6" />
        </div>
        <div className="grid gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-10" />
        </div>
        <Skeleton className="h-6 w-20" />
        <div className="flex justify-between">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-40 w-full"></Skeleton>
        <Skeleton className="h-40 w-full"></Skeleton>
        <Skeleton className="h-40 w-full"></Skeleton>
        <Skeleton className="h-40 w-full"></Skeleton>
      </div>
    </div>
  )
}
export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-800 py-4">
      <div className="flex items-center">
        <div className="bg-base-200 mr-2 h-8 w-8 rounded-full" />
        <div className="min-w-0">
          <div className="bg-base-200 h-5 w-40 rounded-md" />
          <div className="bg-base-200 mt-2 h-4 w-12 rounded-md" />
        </div>
      </div>
      <div className="bg-base-200 mt-2 h-4 w-12 rounded-md" />
    </div>
  )
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="card card-compact bg-base-200">
      <div className="card-body">
        <div className=" border-base-content/30 flex flex-col gap-2 border-b pb-4 pt-2">
          <div className="flex items-center justify-between">
            <Skeleton className="skeleton h-4 w-16"></Skeleton>
            <Skeleton className="skeleton h-4 w-16"></Skeleton>
          </div>
          <div className="skeleton mx-auto h-4 w-60"></div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Skeleton className="skeleton h-4 w-16"></Skeleton>
          <Skeleton className="skeleton h-4 w-16"></Skeleton>
          <div className="flex gap-2">
            <Skeleton className="skeleton h-4 w-6"></Skeleton>
            <Skeleton className="skeleton h-4 w-6"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="card card-compact">
      <div className="card-body bg-base-200">
        <div className="border-base-content/10 flex w-full flex-col items-center justify-between border-b pb-4">
          <div className="mb-2 flex w-full items-center justify-between">
            <Skeleton className="skeleton h-6 w-14"></Skeleton>
            <Skeleton className="skeleton h-6 w-14"></Skeleton>
          </div>
          <Skeleton className="skeleton h-6 w-72"></Skeleton>
        </div>
        <div className="flex w-full items-center justify-between">
          <Skeleton className="skeleton h-6 w-16"></Skeleton>
          <Skeleton className="skeleton h-6 w-16"></Skeleton>
          <div className="flex justify-end gap-2">
            <Skeleton className="skeleton h-6 w-6"></Skeleton>
            <Skeleton className="skeleton h-6 w-6"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuotationsTableSkeleton() {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 lg:hidden">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="hidden lg:block">
        <TableSkeleton />
      </div>
    </div>
  )
}

function Row() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-20 min-w-[250px]"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className=" h-20" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className=" h-20" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className=" h-20" />
      </TableCell>
      <TableCell>
        <Skeleton className=" h-20" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className=" h-20" />
      </TableCell>
    </TableRow>
  )
}

export function QuotationSkeleton() {
  return (
    <div>
      <header className="flex justify-end gap-x-2">
        <div className="flex gap-2">
          <Skeleton className="h-11 w-12 rounded-md" />
          <Skeleton className="h-11 w-12 rounded-md" />
          <Skeleton className="h-11 w-12 rounded-md" />
          <Skeleton className="h-11 w-12 rounded-md" />
          <Skeleton className="h-11 w-12 rounded-md" />
          <Skeleton className="h-11 w-12 rounded-md" />
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg shadow">
          <div className="flex justify-end">
            <div className="text-right">
              <h2 className="text-2xl font-semibold md:text-3xl">Cotización</h2>
              <div className="mt-1 flex justify-end gap-1 text-xl text-yellow-500">
                # <Skeleton className="h-8 w-10" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-6 w-40" />
            </div>
            {/* Right */}
            <div className="space-y-2 sm:text-right">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                <dl className="grid items-center gap-x-3 sm:grid-cols-6">
                  <dt className="col-span-3 font-semibold ">Fecha:</dt>
                  <dd className="col-span-3 ">
                    <Skeleton className="h-10 w-full" />
                  </dd>
                </dl>
                <dl className="grid items-center gap-x-3 sm:grid-cols-6">
                  <dt className="col-span-3 font-semibold ">Actualizado:</dt>
                  <dd className="col-span-3 ">
                    <Skeleton className="h-10 w-full" />
                  </dd>
                </dl>

                <dl className="grid items-center gap-x-3 sm:grid-cols-6">
                  <dt className="col-span-3 font-semibold ">
                    Tiempo de entrega:
                  </dt>
                  <dd className="col-span-3 ">
                    <Skeleton className="h-10 w-full" />
                  </dd>
                </dl>
                <dl className="grid items-center gap-x-3 sm:grid-cols-6">
                  <dt className="col-span-3 font-semibold ">
                    Codición de Pago
                  </dt>
                  <dd className="col-span-3 ">
                    <Skeleton className="h-10 w-full" />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DESCRIPCION</TableHead>
                  <TableHead>U/M</TableHead>
                  <TableHead>CANT</TableHead>
                  <TableHead>P.BASE</TableHead>
                  <TableHead>P.UNIT</TableHead>
                  <TableHead>MONTO</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
