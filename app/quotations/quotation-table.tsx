import { formatDateToLocal, getIgv } from '@/lib/utils'
import type { QuotationClient } from '@/types'
import { EditIcon, EyeIcon, StarIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import React from 'react'
import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table'

type Props = {
  quotations: QuotationClient[]
}
export function QuotationTable({ quotations }: Props) {
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null)

  return (
    <div className="overflow-x-auto">
      <Table className="hidden md:table">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Nro</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.length > 0 ? (
            quotations.map(({ id, number, customerId, customer, items, createdAt }) => {
              const { formatedTotal } = getIgv(items)
              return (
                <TableRow
                  key={id}
                  data-active={id === selectedRowId ? 'true' : 'false'}
                  className="hover:bg-base-200 data-[active=true]:bg-base-200"
                  onClick={() => setSelectedRowId(id)}
                >
                  <TableCell>
                    {customerId && (
                      <StarIcon
                        size={16}
                        stroke={undefined}
                        fill={customer.isRegular ? 'orangered' : 'gray'}
                      />
                    )}
                  </TableCell>
                  <TableCell>#{number}</TableCell>
                  <TableCell className="min-w-[250px]">
                    <p>{customer?.name || ''}</p>
                    <p>{customer?.ruc || 'SIN RUC'}</p>
                  </TableCell>
                  <TableCell>{formatedTotal}</TableCell>
                  <TableCell>
                    <span className="inline-block min-w-[80px]">
                      {formatDateToLocal(createdAt, {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/quotations/${number}`}>
                          <EyeIcon className="size-4" />
                        </Link>
                      </Button>

                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/quotations/${number}/update`}>
                          <EditIcon className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-[500px]">
                No hay cotizaciones
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="md:hidden flex flex-col gap-4">
        {quotations.length > 0 ? (
          quotations.map(({ number, createdAt, customer, items, customerId, id }) => {
            const { formatedTotal } = getIgv(items)
            return (
              <Card key={id} className="card bg-base-200 shadow">
                <CardContent className="card-body flex flex-col gap-4 p-4">
                  <div className="flex justify-between gap-8">
                    <div>
                      <p className="text-sm">{customer?.name || 'SIN RUC'}</p>
                      <span className="text-muted-foreground">{customer?.ruc}</span>
                    </div>
                    <span className="text-[orangered] text-lg">#{number}</span>
                  </div>
                  <div className="bg-muted h-px"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">{formatedTotal}</div>
                      <div className="text-muted-foreground">{formatDateToLocal(createdAt)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {customerId && (
                        <StarIcon
                          size={18}
                          stroke={customer.isRegular ? 'orangered' : 'gray'}
                          fill={customer.isRegular ? 'orangered' : undefined}
                        />
                      )}
                      <Button variant="secondary" size="icon" asChild>
                        <Link to={`/quotations/${number}`}>
                          <EyeIcon className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="secondary" size="icon" asChild>
                        <Link to={`/quotations/${number}/update`}>
                          <EditIcon className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="text-center h-[500px]  flex items-center justify-center">
            Sin Resultados
          </div>
        )}
      </div>
    </div>
  )
}
