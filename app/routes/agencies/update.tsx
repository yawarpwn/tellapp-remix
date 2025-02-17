import type { Route } from './+types/update'
import { redirect } from 'react-router'
import { handleError } from '@/lib/utils'
import { fetchAgencyById, updateAgency } from '@/lib/data'
import { CreateUpdateAgency } from '@/agencies/create-update-agency'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ params, request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const agency = await fetchAgencyById(params.id, token)

  return { agency }
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    await updateAgency(params.id, entries, token)
    return redirect('/agencies')
  } catch (error) {
    return handleError(error)
  }
}

export default function Createagency({ loaderData }: Route.ComponentProps) {
  const { agency } = loaderData
  return <CreateUpdateAgency agency={agency} />
}
