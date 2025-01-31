import { type ColumnDef } from "@tanstack/react-table";
import type { QuotationClient } from "@/types";
import { getIgv, formatDateToLocal } from "@/lib/utils";
import { Form } from "react-router";
import { MoreHorizontal, StarIcon } from "lucide-react";
import { Link } from "react-router";
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
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<QuotationClient>[] = [
  {
    id: "select",
    cell: ({ row }) => <StarIcon className="size-4" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    enableGlobalFilter: true,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="#Nro" />;
    },
  },
  {
    accessorKey: "customer.name",
    header: "Cliente",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <div>
        <p className="min-w-[230px]">
          {row.original.customer?.name || "SIN RUC"}
        </p>
        <p>{row.original.customer?.ruc}</p>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="">Monto</div>,
    cell: ({ row }) => {
      const formated = getIgv(row.original.items).formatedTotal;
      return <div className="font-medium">{formated}</div>;
    },
  },
  {
    accessorKey: "created_at",
    enableGlobalFilter: false,
    header: "Fecha",
    cell: ({ row }) => {
      const date = formatDateToLocal(new Date(row.original.createdAt), {
        month: "short",
      });
      return <div>{date}</div>;
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
            <DropdownMenuItem asChild>
              <Form
                action={`/quotations/${quotation.number}/delete`}
                method="post"
                onSubmit={(ev) => {
                  let response = confirm("¿Deseas Eliminar la cotización?");
                  if (!response) {
                    ev.preventDefault();
                  }
                }}
              >
                <button>Eliminar</button>
              </Form>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Form
                action={`/quotations/${quotation.number}/duplicate`}
                method="post"
                onSubmit={(ev) => {
                  let response = confirm("¿Deseas duplicar la cotización?");
                  if (!response) {
                    ev.preventDefault();
                  }
                }}
              >
                <button>Duplicar</button>
              </Form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
