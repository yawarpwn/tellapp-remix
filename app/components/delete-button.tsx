import { Button } from './ui/button'
import { TrashIcon } from 'lucide-react'
import { Form } from 'react-router'

export function DeleteButton({ id }: { quotationNumber: number; id: string }) {
  return (
    <Form method="post">
      <input name="id" type="hidden" value={id} />
      <Button variant="outline" size="sm">
        <TrashIcon /> <span className="hidden lg:block">Eliminar</span>
      </Button>
    </Form>
  )
}
