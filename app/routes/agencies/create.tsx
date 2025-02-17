import type { Route } from './+types/create'
import { redirect, data } from 'react-router'
import { handleError } from '@/lib/utils'
import { CreateUpdateAgency } from '@/agencies/create-update-agency'
import { createAgency } from '@/lib/data'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    await createAgency(entries, token)
    return redirect('/agencies')
  } catch (error) {
    handleError(error)
  }
}

export default function CreateAgency({ loaderData }: Route.ComponentProps) {
  return <CreateUpdateAgency agency={undefined} />
}
