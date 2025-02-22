import type { Route } from './+types/create'
import { redirect, data } from 'react-router'
import { handleError } from '@/lib/utils'
import { CreateUpdateLabel } from '@/labels/create-update-label'
import { createLabel, fetchAgencies } from '@/lib/data'

export async function loader({ context }: Route.LoaderArgs) {
  const agencies = await fetchAgencies(context.cloudflare.env.TELL_API_KEY)
  return { agencies }
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    await createLabel(entries, context.cloudflare.env.TELL_API_KEY)
    return redirect('/labels')
  } catch (error) {
    handleError(error)
  }
}

export default function CreateLabelRoute({ loaderData }: Route.ComponentProps) {
  const { agencies } = loaderData
  return <CreateUpdateLabel label={undefined} agencies={agencies} />
}
