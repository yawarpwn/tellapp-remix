import { Button } from '@/components/ui/button'
import { StarIcon, StarOffIcon } from 'lucide-react'
import React from 'react'
import { Form, useActionData, useFetcher, useFetchers } from 'react-router'

export function ToggleRegularCustomerButton({
  customerId,
  isRegular,
}: {
  customerId: string
  isRegular: boolean
}) {
  console.log({ isRegular })

  const fetcher = useFetcher()

  let status = isRegular ? 'is-regular' : 'no-regular'
  if (fetcher.formData) {
    status = fetcher.formData.get('status') as string
  }

  return (
    <fetcher.Form
      method="post"
      action={`/customers/${customerId}/toggle-regular-customer`}
    >
      <Button
        name="status"
        value={status}
        type="submit"
        variant={'outline'}
        size={'sm'}
      >
        {status === 'is-regular' ? (
          <StarIcon className="text-primary" />
        ) : (
          <StarOffIcon className="text-muted-foreground" />
        )}
        <span className="hidden lg:block"> Favorito</span>
      </Button>
    </fetcher.Form>
  )
}
