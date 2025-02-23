import { Button } from '@/components/ui/button'
import { StarIcon, StarOffIcon } from 'lucide-react'
import { Form, useActionData, useFetcher } from 'react-router'

export function ToggleRegularCustomerButton({
  customerId,
  isRegular,
}: {
  customerId: string
  isRegular: boolean
}) {
  const fetcher = useFetcher()

  const favorite = fetcher.formData ? fetcher.formData.get('favorite') === 'true' : isRegular

  return (
    <fetcher.Form method="post" action={`/action/${customerId}/toggle-regular-customer`}>
      <Button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        type="submit"
        variant={'outline'}
        size={'sm'}
      >
        {favorite ? (
          <StarIcon className="text-primary" />
        ) : (
          <StarOffIcon className="text-muted-foreground" />
        )}
        <span className="hidden lg:block"> Favorito</span>
      </Button>
    </fetcher.Form>
  )
}
