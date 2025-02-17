import type { Route } from './+types/update'
import { redirect } from 'react-router'
import { handleError } from '@/lib/utils'
import { fetchAgencies, fetchLabelById, updateLabel } from '@/lib/data'
import { CreateUpdateLabel } from '@/labels/create-update-label'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ params, request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const label = await fetchLabelById(params.id, token)
  const agencies = await fetchAgencies(token)

  return { label, agencies }
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)

  try {
    await updateLabel(params.id, entries, token)
    return redirect('/labels')
  } catch (error) {
    return handleError(error)
  }
}

export default function Createagency({ loaderData }: Route.ComponentProps) {
  const { label, agencies } = loaderData
  return <CreateUpdateLabel label={label} agencies={agencies} />
}
