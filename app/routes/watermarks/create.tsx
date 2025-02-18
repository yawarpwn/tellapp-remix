import type { Route } from './+types/create'
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
import { createWatermark } from '@/lib/data'
import { getTokenFromSession } from '@/sessions.server'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://unpkg.com/filepond/dist/filepond.css' },
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css',
  },
]

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const token = await getTokenFromSession(request)
  await createWatermark(formData, token)
}

export default function () {
  const [pending, startTransition] = useTransition()
  const [files, setFiles] = React.useState<File[]>([])

  const fetcher = useFetcher()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    for (const file of files) {
      const resizedFile = await resizeImageFile(file, 1000, 1000)
      formData.append('files[]', resizedFile)
    }

    console.log(formData.get('files[]'))
    fetcher.submit(formData, {
      method: 'post',
    })

    // startTransition(() => {
    //   toast.promise(createWatermarkAction(formData), {
    //     loading: 'Subiendo...',
    //     success: result => {
    //       const { data, error } = result
    //       if (error) {
    //         throw error
    //       }
    //       if (onLayout) {
    //         onLayout()
    //       }
    //       closeModal()
    //       return 'Subido correctamente'
    //     },
    //     error: err => {
    //       console.log(err)
    //       return 'Error eliminando'
    //     },
    //   })
    // })
  }

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
