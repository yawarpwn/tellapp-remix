import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import React from 'react'

export function ActionButton({
  action,
  text = 'sin texto',
  icon,
}: {
  action: string
  text: string
  icon: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {open && (
        <ConfirmActionDialog
          open={open}
          closeModal={() => setOpen(false)}
          action={action}
        />
      )}
      <Button onClick={() => setOpen(true)} variant={'outline'} size={'sm'}>
        {icon} <span className="hidden lg:block">{text}</span>
      </Button>
    </>
  )
}
