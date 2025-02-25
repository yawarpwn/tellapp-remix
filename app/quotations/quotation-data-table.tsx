import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2Icon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'
import { Form, Link, useFetcher, useNavigate, useNavigation } from 'react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BodySkeleton } from '@/components/skeletons/data-table'
import { FloatingBar } from './floating-bar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  createPath: string
  q: string | undefined
  searching: boolean | undefined
  pageIndex: number | undefined
  pageSize: number | undefined
}

export function QuotationDataTable<TData, TValue>({
  columns,
  data,
  q,
  pageIndex = 0,
  pageSize = 15,
  searching,
  createPath,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  // const [pagination, setPagination] = React.useState<PaginationState>({
  //   pageIndex,
  //   pageSize,
  // })
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    // manualPagination: true,
    manualFiltering: true,
    enableMultiRowSelection: false,
    // rowCount: 2000,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    // getFilteredRowModel: getFilteredRowModel(),
    // onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      // pagination: pagination,
      rowSelection,
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().flatRows
  console.log({ selectedRows })
  return (
    <div className="flex flex-col justify-between gap-6 pb-7 ">
      {selectedRows.length > 0 && (
        <FloatingBar
          id={selectedRows[0].id}
          quotation={selectedRows[0].original}
          clearSelectedRow={() => table.toggleAllRowsSelected(false)}
        />
      )}
      <div className="flex items-center justify-between ">
        <Form id="search-form" role="search">
          <div className="flex items-center gap-2">
            <Input
              name="q"
              disabled={searching}
              defaultValue={q || ''}
              placeholder="Buscar Cotización"
              type="search"
              className="w-[200px] lg:w-[350px] border-primary"
            />
            <Button disabled={searching}>
              {searching ? <Loader2Icon className="animate-spin" /> : <SearchIcon />}
            </Button>
          </div>
        </Form>
        <Button asChild>
          <Link to={createPath}>
            <PlusIcon />
            Crear
          </Link>
        </Button>
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
          {searching ? (
            <BodySkeleton columnCount={6} rowCount={25} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => row.toggleSelected(true)}
                  >
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
          )}
        </Table>
      </div>

      {/* <div className="flex items-center justify-end px-2"> */}
      {/*   <div className="flex-1 text-sm text-muted-foreground"> */}
      {/*     {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
      {/*     {table.getFilteredRowModel().rows.length} row(s) selected. */}
      {/*   </div> */}
      {/*   <div className="flex items-center space-x-6 lg:space-x-8"> */}
      {/*     <div className="flex items-center space-x-2"> */}
      {/*       <p className="text-sm font-medium">Rows per page</p> */}
      {/*       <Select */}
      {/*         value={`${table.getState().pagination.pageSize}`} */}
      {/*         onValueChange={(value) => { */}
      {/*           table.setPageSize(Number(value)) */}
      {/*         }} */}
      {/*       > */}
      {/*         <SelectTrigger className="h-8 w-[70px]"> */}
      {/*           <SelectValue placeholder={table.getState().pagination.pageSize} /> */}
      {/*         </SelectTrigger> */}
      {/*         <SelectContent side="top"> */}
      {/*           {[15, 20, 30, 40, 50].map((pageSize) => ( */}
      {/*             <SelectItem key={pageSize} value={`${pageSize}`}> */}
      {/*               {pageSize} */}
      {/*             </SelectItem> */}
      {/*           ))} */}
      {/*         </SelectContent> */}
      {/*       </Select> */}
      {/*     </div> */}
      {/*     <div className="flex w-[100px] items-center justify-center text-sm font-medium"> */}
      {/*       Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} */}
      {/*     </div> */}
      {/*     <div className="flex items-center space-x-2"> */}
      {/*       <Button */}
      {/*         variant="outline" */}
      {/*         className="hidden h-8 w-8 p-0 lg:flex" */}
      {/*         onClick={() => table.setPageIndex(0)} */}
      {/*         disabled={!table.getCanPreviousPage()} */}
      {/*       > */}
      {/*         <span className="sr-only">Go to first page</span> */}
      {/*         <ChevronsLeft /> */}
      {/*       </Button> */}
      {/*       <Form> */}
      {/*         <Button */}
      {/*           variant="outline" */}
      {/*           className="h-8 w-8 p-0" */}
      {/*           name="page" */}
      {/*           disabled={pagination.pageIndex === 0} */}
      {/*           value={pagination.pageIndex - 1} */}
      {/*           onClick={() => */}
      {/*             setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 }) */}
      {/*           } */}
      {/*           // onClick={() => table.previousPage()} */}
      {/*           // disabled={!table.getCanPreviousPage()} */}
      {/*         > */}
      {/*           <span className="sr-only">Go to previous page</span> */}
      {/*           <ChevronLeft /> */}
      {/*         </Button> */}
      {/*       </Form> */}
      {/**/}
      {/*       <Form id="next-page"> */}
      {/*         <input value={10} type="hidden" name="page" /> */}
      {/*         <input value={20} type="hidden" name="pageSize" /> */}
      {/*         <Button */}
      {/*           name="page" */}
      {/*           variant="outline" */}
      {/*           className="h-8 w-8 p-0" */}
      {/*           type="submit" */}
      {/*           // onClick={() => */}
      {/*           //   setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 }) */}
      {/*           // } */}
      {/*           // onClick={() => table.nextPage()} */}
      {/*           // disabled={!table.getCanNextPage()} */}
      {/*         > */}
      {/*           <span className="sr-only">Go to next page</span> */}
      {/*           <ChevronRight /> */}
      {/*         </Button> */}
      {/*       </Form> */}
      {/*       <Button */}
      {/*         variant="outline" */}
      {/*         className="hidden h-8 w-8 p-0 lg:flex" */}
      {/*         onClick={() => table.setPageIndex(table.getPageCount() - 1)} */}
      {/*         disabled={!table.getCanNextPage()} */}
      {/*       > */}
      {/*         <span className="sr-only">Go to last page</span> */}
      {/*         <ChevronsRight /> */}
      {/*       </Button> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  )
}
