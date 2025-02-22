import type { Route } from './+types/create'
import { createWatermark } from '@/lib/data'
import CreateWatermark from '@/watermarks/create-watermark'
import { data, redirect } from 'react-router'

// import filpondCss from 'filepond/dist/filepond.min.css?url'
// import imagePreviewCss from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css?url'

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://unpkg.com/filepond/dist/filepond.css' },
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css',
  },
  // { rel: 'stylesheet', href: filpondCss },
  // {
  //   rel: 'stylesheet',
  //   href: imagePreviewCss,
  // },
]

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData()

  try {
    await createWatermark(formData, context.cloudflare.env.TELL_API_KEY)
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
