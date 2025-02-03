import type { Route } from './+types/toggle-regular-customer'

export async function action({ params }: Route.ActionArgs) {
  params.number
  console.log(params.number)
}
