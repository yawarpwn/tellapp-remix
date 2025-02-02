import { type ColumnDef } from '@tanstack/react-table'
import type { Product } from '@/types'
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
import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { formatNumberToLocal } from '@/lib/utils'

export const columns: ColumnDef<Product>[] = [
  {
    header: 'Descripcion',
    cell: (props) => (
      <div className="min-w-[250px]">
        <p>{props.row.original.description}</p>
      </div>
    ),
  },
  {
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
    header: 'U/M',
    cell: (props) => props.row.original.unitSize,
  },
  {
    header: 'Costo',
    cell: (props) => formatNumberToLocal(props.row.original.cost),
  },
  {
    header: 'Precio',
    cell: (props) => formatNumberToLocal(props.row.original.price),
  },
  {
    header: 'Código',
    cell: (props) => (
      <div className="min-w-[150px]">
        {props.row.original.code.toUpperCase()}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original
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
            <DropdownMenuItem>
              <Link to={`/quotations/${product.id}/update`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Form
                action={`/quotations/${product.id}/delete`}
                method="post"
                onSubmit={(ev) => {
                  let response = confirm('¿Deseas Eliminar la cotización?')
                  if (!response) {
                    ev.preventDefault()
                  }
                }}
              >
                <button>Eliminar</button>
              </Form>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Form
                action={`/quotations/${product.id}/duplicate`}
                method="post"
                onSubmit={(ev) => {
                  let response = confirm('¿Deseas duplicar la cotización?')
                  if (!response) {
                    ev.preventDefault()
                  }
                }}
              >
                <button>Duplicar</button>
              </Form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
