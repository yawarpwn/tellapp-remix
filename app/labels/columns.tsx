import { type ColumnDef } from '@tanstack/react-table'
import type { LabelType } from '@/types'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { generateLabelPdf } from '@/lib/pdf-doc/generate-label-pdf'
import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import React from 'react'

export const columns: ColumnDef<LabelType>[] = [
  {
    accessorKey: 'recipient',
    header: 'Destinatario',
    enableGlobalFilter: true,
    cell: (props) => (
      <div className="min-w-[250px]">
        <p>{props.row.original.recipient}</p>
        <p className="text-sm text-muted-foreground">{props.row.original.dniRuc}</p>
      </div>
    ),
  },

  {
    accessorKey: 'destination',
    header: 'Destino',
    enableGlobalFilter: true,
    cell: (props) => (
      <div className="">
        <p>{props.row.original.destination}</p>
        {props.row.original.address && (
          <p className="text-sm text-muted-foreground">{props.row.original.address}</p>
        )}
      </div>
    ),
  },
  {
    enableGlobalFilter: false,
    accessorKey: 'observations',
    header: 'Observaciones',
    cell: ({ row }) => <div>{row.original.observations ?? ''}</div>,
  },
  {
    enableGlobalFilter: false,
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ row }) => <div>{row.original.phone ?? ''}</div>,
  },
  {
    id: 'actions',
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const label = row.original
      const [showDestroyConfirmDialog, setShowDestroyConfirmDialog] = React.useState(false)
      return (
        <>
          {showDestroyConfirmDialog && (
            <ConfirmActionDialog
              open={showDestroyConfirmDialog}
              closeModal={() => setShowDestroyConfirmDialog(false)}
              action={`/labels/${label.id}/delete`}
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

              <DropdownMenuItem
                onSelect={() => {
                  generateLabelPdf(label).print()
                }}
              >
                Imprimir
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/labels/${label.id}/update`}>Editar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button className="w-full" onClick={() => setShowDestroyConfirmDialog(true)}>
                  Eliminar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
