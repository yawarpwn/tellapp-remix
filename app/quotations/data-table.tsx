import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Input } from "@/components/ui/input";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlugIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter number"
          value={(table.getColumn("number")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("number")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link className={buttonVariants()} to="/quotations/create">
          <PlusIcon />
          Crear
        </Link>
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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      {/* <div className="flex items-center justify-end space-x-2 py-4"> */}
      {/*   <div className="flex-1 text-sm text-muted-foreground"> */}
      {/*     {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
      {/*     {table.getFilteredRowModel().rows.length} row(s) selected. */}
      {/*   </div> */}
      {/*   <Button */}
      {/*     variant="outline" */}
      {/*     size="sm" */}
      {/*     onClick={() => table.previousPage()} */}
      {/*     disabled={!table.getCanPreviousPage()} */}
      {/*   > */}
      {/*     Previous */}
      {/*   </Button> */}
      {/*   <Button */}
      {/*     variant="outline" */}
      {/*     size="sm" */}
      {/*     onClick={() => table.nextPage()} */}
      {/*     disabled={!table.getCanNextPage()} */}
      {/*   > */}
      {/*     Next */}
      {/*   </Button> */}
      {/* </div> */}
    </div>
  );
}
