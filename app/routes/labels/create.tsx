import type { Route } from './+types/create'
import { redirect, data } from 'react-router'
import { handleError } from '@/lib/utils'
import { CreateUpdateLabel } from '@/labels/create-update-label'
import { createLabel, fetchAgencies } from '@/lib/data'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const agencies = await fetchAgencies(token)
  return { agencies }
}

export async function action({ request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    await createLabel(entries, token)
    return redirect('/labels')
  } catch (error) {
    handleError(error)
  }
}

export default function CreateLabelRoute({ loaderData }: Route.ComponentProps) {
  const { agencies } = loaderData
  return <CreateUpdateLabel label={undefined} agencies={agencies} />
}
