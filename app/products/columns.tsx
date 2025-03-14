import { type ColumnDef } from '@tanstack/react-table'
import type { Product } from '@/types'
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
import { formatNumberToLocal } from '@/lib/utils'
import React from 'react'
import { ConfirmActionDialog } from '@/components/confirm-action-dialog'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'description',
    header: 'Descripcion',
    enableGlobalFilter: true,
    cell: (props) => (
      <div className="min-w-[250px]">
        <p>{props.row.original.description}</p>
      </div>
    ),
  },
  {
    enableGlobalFilter: false,
    accessorKey: 'link',
    header: 'Link',
    cell: (props) =>
      props.row.original.link ? (
        <a
          target="_blank"
          className="text-xs text-primary underline"
          href={props.row.original?.link ?? '#'}
        >
          <ExternalLink size={18} />
        </a>
      ) : (
        ''
      ),
  },
  {
    enableGlobalFilter: false,
    accessorKey: 'unitSize',
    header: 'U/M',
    cell: (props) => props.row.original.unitSize,
  },
  {
    enableGlobalFilter: false,
    accessorKey: 'cost',
    header: 'Costo',
    cell: (props) => formatNumberToLocal(props.row.original.cost),
  },
  {
    header: 'Precio',
    accessorKey: 'price',
    cell: (props) => formatNumberToLocal(props.row.original.price),
    enableGlobalFilter: false,
  },
  {
    header: 'Código',
    accessorKey: 'code',
    cell: (props) => <div className="min-w-[150px]">{props.row.original.code.toUpperCase()}</div>,
    enableGlobalFilter: true,
  },
  {
    id: 'actions',
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const product = row.original
      const [showDuplicateConfirmDialog, setShowDuplicateConfirmDialog] = React.useState(false)
      const [showDestroyConfirmDialog, setShowDestroyConfirmDialog] = React.useState(false)

      return (
        <>
          {showDuplicateConfirmDialog && (
            <ConfirmActionDialog
              open={showDuplicateConfirmDialog}
              closeModal={() => setShowDuplicateConfirmDialog(false)}
              action={`/products/${product.id}/duplicate`}
            />
          )}
          {showDestroyConfirmDialog && (
            <ConfirmActionDialog
              open={showDestroyConfirmDialog}
              closeModal={() => setShowDestroyConfirmDialog(false)}
              action={`/products/${product.id}/delete`}
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
                <Link to={`/products/${product.id}/update`}>Editar</Link>
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
