import { type ColumnDef } from "@tanstack/react-table";
import type { QuotationClient } from "@/lib/types";
import { getIgv, formatDateToLocal } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../data-table-column-header";

export const columns: ColumnDef<QuotationClient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Número" />;
      // return (
      //   <Button
      //     variant="ghost"
      //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //   >
      //     Número
      //     <ArrowUpDown className="ml-2 h-4 w-4" />
      //   </Button>
      // );
    },
  },
  {
    accessorKey: "customer.name",
    header: "Cliente",
  },
  {
    accessorKey: "customer.ruc",
    header: "Ruc",
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }) => {
      const date = formatDateToLocal(new Date(row.original.createdAt));
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const formated = getIgv(row.original.items).formatedTotal;
      return <div className="text-right font-medium">{formated}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const quotation = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/quotations/${quotation.number}`}>Ver</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/quotations/${quotation.number}/update`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
