import type { Route } from './+types/update'
import { redirect } from 'react-router'
import { handleError } from '@/lib/utils'
import { fetchAgencies, fetchLabelById, updateLabel } from '@/lib/data'
import { CreateUpdateLabel } from '@/labels/create-update-label'

export async function loader({ params }: Route.LoaderArgs) {
  const label = await fetchLabelById(params.id)
  const agencies = await fetchAgencies()

  return { label, agencies }
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)

  try {
    await updateLabel(params.id, entries)
    return redirect('/labels')
  } catch (error) {
    return handleError(error)
  }
}

export default function Createagency({ loaderData }: Route.ComponentProps) {
  const { label, agencies } = loaderData
  return <CreateUpdateLabel label={label} agencies={agencies} />
}
