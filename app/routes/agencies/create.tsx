import type { Route } from './+types/create'
import { redirect, data } from 'react-router'
import { handleError } from '@/lib/utils'
import { CreateUpdateAgency } from '@/agencies/create-update-agency'
import { createAgency } from '@/lib/data'

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    await createAgency(entries, context.cloudflare.env.TELL_API_KEY)
    return redirect('/agencies')
  } catch (error) {
    handleError(error)
  }
}

export default function CreateAgency({ loaderData }: Route.ComponentProps) {
  return <CreateUpdateAgency agency={undefined} />
}
