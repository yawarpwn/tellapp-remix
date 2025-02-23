import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useFetcher } from 'react-router'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'

export function ConfirmActionDialog({
  open,
  closeModal,
  description = 'Esta acción es irreversible',
  action,
}: {
  open: boolean
  closeModal: () => void
  description?: string
  action: string
}) {
  const fetcher = useFetcher()
  const pending = fetcher.state !== 'idle'

  const handleAction = async () => {
    await fetcher.submit(null, {
      method: 'post',
      action: action,
    })
    closeModal()
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-w-xs rounded-md">
        <DialogTitle className="text-center">Confirmar acción</DialogTitle>
        <DialogDescription className="text-center">{description}</DialogDescription>
        <div className="flex justify-between">
          <Button disabled={pending} onClick={closeModal} variant="secondary" type="button">
            Cancel
          </Button>
          <Button onClick={handleAction} disabled={pending} type="submit">
            Aceptar
            {pending && <LoaderIcon className="animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
