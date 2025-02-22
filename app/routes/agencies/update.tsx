import type { Route } from './+types/update'
import { redirect } from 'react-router'
import { handleError } from '@/lib/utils'
import { fetchAgencyById, updateAgency } from '@/lib/data'
import { CreateUpdateAgency } from '@/agencies/create-update-agency'

export async function loader({ params, context }: Route.LoaderArgs) {
  const agency = await fetchAgencyById(
    params.id,
    context.cloudflare.env.TELL_API_KEY
  )

  return { agency }
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    await updateAgency(params.id, entries, context.cloudflare.env.TELL_API_KEY)
    return redirect('/agencies')
  } catch (error) {
    return handleError(error)
  }
}

export default function Createagency({ loaderData }: Route.ComponentProps) {
  const { agency } = loaderData
  return <CreateUpdateAgency agency={agency} />
}
