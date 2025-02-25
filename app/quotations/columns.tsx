import { type ColumnDef } from '@tanstack/react-table'
import type { QuotationClient } from '@/types'
import { getIgv, formatDateToLocal } from '@/lib/utils'
import { Form } from 'react-router'
import { MoreHorizontal, StarIcon, StarOffIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Checkbox } from '@/components/ui/checkbox'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table-column-header'
import React from 'react'
import { ConfirmActionDialog } from '@/components/confirm-action-dialog'

export const columns: ColumnDef<QuotationClient>[] = [
  {
    id: 'select',
    cell: ({ row }) =>
      row.original?.customer?.isRegular ? (
        <StarIcon fill="hsl(var(--primary))" className="size-4 text-primary" />
      ) : (
        <StarIcon className="text-muted-foreground size-4" />
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'number',
    enableGlobalFilter: true,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nro" />
    },
  },
  {
    accessorKey: 'customer.name',
    header: 'Cliente',
    enableGlobalFilter: true,
    cell: ({ row }) => (
      <div>
        <p className="min-w-[230px]">{row.original.customer?.name || 'SIN RUC'}</p>
        <p className="text-muted-foreground">{row.original.customer?.ruc}</p>
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: () => <div className="">Monto</div>,
    cell: ({ row }) => {
      const formated = getIgv(row.original.items).formatedTotal
      return <div className="font-medium">{formated}</div>
    },
  },
  {
    accessorKey: 'created_at',
    enableGlobalFilter: false,
    header: 'Fecha',
    cell: ({ row }) => {
      const date = formatDateToLocal(new Date(row.original.createdAt), {
        month: 'short',
      })
      return <div>{date}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [showDuplicateConfirmDialog, setShowDuplicateConfirmDialog] = React.useState(false)
      const [showDestroyConfirmDialog, setShowDestroyConfirmDialog] = React.useState(false)

      const quotation = row.original
      return (
        <>
          {showDuplicateConfirmDialog && (
            <ConfirmActionDialog
              open={showDuplicateConfirmDialog}
              description={`Desea duplicar la cotización ${quotation.number}?`}
              closeModal={() => setShowDuplicateConfirmDialog(false)}
              action={`/action/${quotation.number}/duplicate-quotation`}
            />
          )}
          {showDestroyConfirmDialog && (
            <ConfirmActionDialog
              description={`Desea eliminar la cotización ${quotation.number}?`}
              open={showDestroyConfirmDialog}
              closeModal={() => setShowDestroyConfirmDialog(false)}
              action={`/action/${quotation.number}/delete-quotation`}
            />
          )}
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
                <button className="w-full" onClick={() => setShowDestroyConfirmDialog(true)}>
                  Eliminar
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button className="w-full" onClick={() => setShowDuplicateConfirmDialog(true)}>
                  Duplicar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
