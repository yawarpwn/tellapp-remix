import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import { useFetcher } from 'react-router'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'
import { useEffect } from 'react'

export function ConfirmActionDialog({
  open,
  closeModal,
  action,
}: {
  open: boolean
  closeModal: () => void
  action: string
}) {
  const fetcher = useFetcher()
  const pending = fetcher.state !== 'idle'

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-w-xs rounded-md">
        <DialogDescription className="text-center">
          ¿Estás seguro?
        </DialogDescription>
        <fetcher.Form method="post" action={action}>
          <div className="flex justify-between">
            <Button
              disabled={pending}
              onClick={closeModal}
              variant="secondary"
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={pending} type="submit">
              Aceptar
              {pending && <LoaderIcon className="animate-spin" />}
            </Button>
          </div>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}
