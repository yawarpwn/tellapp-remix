import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type Props = {
  pageSize: number
  pageIndex: number
  query?: string
  totalPages: number
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

export function PaginationQuotation({ pageSize, pageIndex, totalPages, query = '' }: Props) {
  const pages = generatePagination(pageIndex, totalPages)
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={`/quotations?q=${query}&page=${pageIndex - 1}`} />
        </PaginationItem>
        {pages.map((page) => {
          if (page === '...') return <PaginationEllipsis key={page} />
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === pageIndex}
                to={`/quotations?q=${query}&page=${page}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext to={`/quotations?q=${query}&page=${pageIndex + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
