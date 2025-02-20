import type { Route } from './+types/create'
import { createWatermark, fetchCloudinarySignature } from '@/lib/data'
import { getTokenFromSession } from '@/sessions.server'
import CreateWatermark from '@/watermarks/create-watermark'
import { data, redirect } from 'react-router'

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://unpkg.com/filepond/dist/filepond.css' },
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css',
  },
]

export async function action({ request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const formData = await request.formData()

  try {
    await createWatermark(formData, token)
    return redirect('/watermarks')
  } catch (error) {
    return data({
      error: 'Error al crear el watermark',
    })
  }
}

export default function ({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <>
      <CreateWatermark />
    </>
  )
}
