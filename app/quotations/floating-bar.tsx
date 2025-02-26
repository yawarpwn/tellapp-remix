import React from 'react'
import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TrashIcon, EditIcon, EyeIcon, FilesIcon, XIcon } from 'lucide-react'
import type { QuotationClient } from '@/types'
import { Link } from 'react-router'
interface Props {
  id: string
  quotation: QuotationClient
  clearSelectedRow: () => void
}
export function FloatingBar({ id, quotation, clearSelectedRow }: Props) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const [showDuplicateModal, setShowDuplicateModal] = React.useState(false)

  const openDuplicateModal = () => setShowDuplicateModal(true)
  const openDeleteModal = () => setShowDeleteModal(true)

  return (
    <>
      <ConfirmActionDialog
        action={`/action/${quotation.number}/delete-quotation`}
        description={`¿Eliminar la cotización #${quotation.number}?`}
        // onSuccess={closeDeleteModal}
        open={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
      />

      <ConfirmActionDialog
        action={`/action/${quotation.number}/duplicate-quotation`}
        description={`¿Duplicar la cotización #${quotation.number}?`}
        open={showDuplicateModal}
        closeModal={() => setShowDuplicateModal(false)}
      />
      <div className="fixed inset-x-0 bottom-10 z-40 w-full  p-4 ">
        <div className="w-full  ">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-md bg-background/60 backdrop-blur-md p-2 shadow-2xl [&>a]:shrink-0 [&>button]:shrink-0">
            <div className="flex h-9 items-center rounded-md border border-dashed pl-2.5 pr-1">
              <span>#{quotation.number}</span>
              <Separator orientation="vertical" className="ml-2 mr-1" />
              <Button onClick={clearSelectedRow} className="size-7" size={'icon'}>
                <XIcon className="size-4" />
              </Button>
            </div>

            <Button variant={'ghost'} className="size-9 " size={'icon'} asChild>
              <Link to={`/quotations/${quotation.number}`}>
                <EyeIcon />
              </Link>
            </Button>
            <Button variant="ghost" className="size-9 " size={'icon'} asChild>
              <Link to={`/quotations/${quotation.number}/update`}>
                <EditIcon />
              </Link>
            </Button>
            <Button onClick={openDeleteModal} className="size-9 " variant="ghost" size={'icon'}>
              <TrashIcon />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={openDuplicateModal}
                    className="size-9 "
                    variant={'ghost'}
                    size="icon"
                  >
                    <FilesIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground">
                  <p>Duplicar Cotización</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  )
}
