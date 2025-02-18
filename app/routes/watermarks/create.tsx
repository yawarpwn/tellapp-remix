import type { Route } from './+types/create'
import { type FileUpload, parseFormData } from '@mjackson/form-data-parser'
import { Button } from '@/components/ui/button'
import React, { useState, useTransition } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
// import stylesheet from  'filepond/dist/filepond.min.css'
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { resizeImageFile } from '@/lib/utils'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { toast } from 'sonner'
import { useFetcher } from 'react-router'
import { createWatermark, fetchCloudinarySignature } from '@/lib/data'
import { getTokenFromSession } from '@/sessions.server'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://unpkg.com/filepond/dist/filepond.css' },
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css',
  },
]

// export async function action({ request }: Route.ActionArgs) {
//   const formData = await request.formData()
//   const token = await getTokenFromSession(request)
//   await createWatermark(formData, token)
// }

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const signData = await fetchCloudinarySignature(token)
  return { signData }
}
// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const uploadHandler = async (fileUpload: FileUpload) => {
//     if (fileUpload.fieldName === 'files[]') {
//       console.log(fileUpload)
//       // process the upload and return a File
//     }
//   }
//
//   const formData = await parseFormData(request)
//   console.log(formData.get('files[]'))
// }

export default function ({ loaderData }: Route.ComponentProps) {
  const { signData } = loaderData
  const [files, setFiles] = React.useState<File[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const url =
      'https://api.cloudinary.com/v1_1/' + 'tellsenales-cloud' + '/auto/upload'
    for (const file of files) {
      const resizedFile = await resizeImageFile(file, 1000, 1000)
      formData.append('files[]', resizedFile)
      formData.append('file', file)
      formData.append('api_key', signData.api_key)
      formData.append('timestamp', signData.timestamp.toString())
      formData.append('signature', signData.signature)
      // formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260')
      formData.append('folder', 'signed_upload_demo_form')

      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.text()
        })
        .then((data) => {
          console.log(JSON.parse(data))
          var str = JSON.stringify(JSON.parse(data), null, 4)
        })
    }
  }

  const pending = false

  return (
    <>
      <div className="mx-auto w-full max-w-3xl p-8">
        <form onSubmit={handleSubmit}>
          <FilePond
            files={files}
            required
            onupdatefiles={(itemsFiles) => {
              setFiles(itemsFiles.map((itemFile) => itemFile.file as File))
            }}
            allowMultiple
            acceptedFileTypes={['jpeg', 'png', 'jpg', 'webp', 'avif']}
            maxFiles={5}
            // server="/api"
            name="photos"
            labelIdle='Arrastra y suelta tu foto <span class="filepond--label-action">Subir</span>'
          />
          <Button
            disabled={files.length === 0 || pending}
            variant="secondary"
            className="w-full"
            type="submit"
          >
            {pending ? 'agregando logo...' : 'Agregar marca de agua'}
          </Button>
        </form>
      </div>
    </>
  )
}
