import { Button } from '@/components/ui/button'
import { FilesIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useFetcher } from 'react-router'
import { toast } from 'sonner'

export function DuplicateQuotationButton() {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.data) {
      toast.error(fetcher.data.error)
    }
  }, [fetcher.data])

  return (
    <fetcher.Form
      method="post"
      action="duplicate"
      onSubmit={(event) => {
        let response = confirm('¿Deseas duplicar la cotización?')
        if (!response) event.preventDefault()
      }}
    >
      <Button variant={'outline'} size={'sm'}>
        <FilesIcon /> <span className="hidden lg:block">Duplicar</span>
      </Button>
    </fetcher.Form>
  )
}
