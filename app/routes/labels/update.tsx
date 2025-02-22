import type { Route } from './+types/update'
import { redirect } from 'react-router'
import { handleError } from '@/lib/utils'
import { fetchAgencies, fetchLabelById, updateLabel } from '@/lib/data'
import { CreateUpdateLabel } from '@/labels/create-update-label'

export async function loader({ params, context }: Route.LoaderArgs) {
  const label = await fetchLabelById(
    params.id,
    context.cloudflare.env.TELL_API_KEY
  )
  const agencies = await fetchAgencies(context.cloudflare.env.TELL_API_KEY)

  return { label, agencies }
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)

  try {
    await updateLabel(params.id, entries, context.cloudflare.env.TELL_API_KEY)
    return redirect('/labels')
  } catch (error) {
    return handleError(error)
  }
}

export default function Createagency({ loaderData }: Route.ComponentProps) {
  const { label, agencies } = loaderData
  return <CreateUpdateLabel label={label} agencies={agencies} />
}
