import { Button } from '@/components/ui/button'
import { StarIcon } from 'lucide-react'
import { Form } from 'react-router'

export function ToggleRegularCustomerButton({ id }: { id: string }) {
  return (
    <Form method="post" action="toggle-regular-customer">
      <Button variant={'outline'} size={'sm'}>
        <StarIcon /> <span className="hidden lg:block">Favorito</span>
      </Button>
    </Form>
  )
}
