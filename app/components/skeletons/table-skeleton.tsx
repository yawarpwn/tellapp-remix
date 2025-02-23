import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
function TableSkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="skeleton h-8 w-8" />
      </TableCell>
      {/* Company */}
      <TableCell>
        <Skeleton className="skeleton h-6 min-w-[250px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="skeleton h-6 min-w-14" />
      </TableCell>
      {/* Fecha */}
      <TableCell>
        <Skeleton className="skeleton h-6 min-w-14" />
      </TableCell>
      {/* Total */}
      <TableCell>
        <Skeleton className="skeleton h-6 min-w-14" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-x-2">
          <div className="flex gap-4">
            <Skeleton className="skeleton h-6 w-8" />
            <Skeleton className="skeleton h-6 w-8" />
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}

export function TableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <Table className="table">
        {/* head */}
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="skeleton h-4 w-10" />
            </TableHead>
            <TableHead>
              <Skeleton className="skeleton h-4 min-w-[250px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="skeleton h-4 min-w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="skeleton h-4 min-w-12" />
            </TableHead>
            <TableHead>
              <Skeleton className="skeleton h-4 min-w-12" />
            </TableHead>
            <TableHead>
              <Skeleton className="skeleton h-4 min-w-12" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
          <TableSkeletonRow />
        </tbody>
      </Table>
    </div>
  )
}
