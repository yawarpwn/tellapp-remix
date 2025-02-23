import { type ColumnDef } from '@tanstack/react-table'
import type { Agency } from '@/types'
import { Form } from 'react-router'
import { ExternalLink, MoreHorizontal, StarIcon } from 'lucide-react'
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
import React from 'react'
import { ConfirmActionDialog } from '@/components/confirm-action-dialog'

export const columns: ColumnDef<Agency>[] = [
  {
    accessorKey: 'name',
    header: 'Cliente',
    enableGlobalFilter: true,
    cell: (props) => (
      <div className="min-w-[250px]">
        <p>{props.row.original.name}</p>
        <p className="text-sm text-muted-foreground">{props.row.original.address}</p>
      </div>
    ),
  },
  {
    enableGlobalFilter: false,
    accessorKey: 'ruc',
    header: 'Ruc',
  },

  {
    enableGlobalFilter: false,
    accessorKey: 'phone',
    header: 'Télefono',
  },
  {
    id: 'actions',
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const [showDestroyConfirmDialog, setShowDestroyConfirmDialog] = React.useState(false)
      const agency = row.original
      return (
        <>
          {showDestroyConfirmDialog && (
            <ConfirmActionDialog
              open={showDestroyConfirmDialog}
              closeModal={() => setShowDestroyConfirmDialog(false)}
              action={`/agencies/${agency.id}/delete`}
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
              <DropdownMenuItem>
                <Link to={`/agencies/${agency.id}/update`}>Editar</Link>
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
