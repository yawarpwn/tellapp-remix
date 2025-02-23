import * as React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTablePagination } from '@/components/data-table-pagination'
import { Input } from '@/components/ui/input'
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PlugIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  createPath: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  createPath,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  })
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      pagination: pagination,
      rowSelection,
      globalFilter: globalFilter,
    },
  })

  return (
    <div className="flex flex-col justify-between gap-6 pb-7 ">
      <div className="flex items-center justify-between ">
        <Input
          placeholder="buscar..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-[200px]"
        />
        <Button asChild>
          <Link to={createPath}>
            <PlusIcon />
            Crear
          </Link>
        </Button>
        {/* <DropdownMenu> */}
        {/*   <DropdownMenuTrigger asChild> */}
        {/*     <Button variant="outline" className="ml-auto"> */}
        {/*       Columns */}
        {/*     </Button> */}
        {/*   </DropdownMenuTrigger> */}
        {/*   <DropdownMenuContent align="end"> */}
        {/*     {table */}
        {/*       .getAllColumns() */}
        {/*       .filter((column) => column.getCanHide()) */}
        {/*       .map((column) => { */}
        {/*         return ( */}
        {/*           <DropdownMenuCheckboxItem */}
        {/*             key={column.id} */}
        {/*             className="capitalize" */}
        {/*             checked={column.getIsVisible()} */}
        {/*             onCheckedChange={(value) => */}
        {/*               column.toggleVisibility(!!value) */}
        {/*             } */}
        {/*           > */}
        {/*             {column.id} */}
        {/*           </DropdownMenuCheckboxItem> */}
        {/*         ); */}
        {/*       })} */}
        {/*   </DropdownMenuContent> */}
        {/* </DropdownMenu> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-[75vh] text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
