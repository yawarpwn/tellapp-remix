// import stylesheet from  'filepond/dist/filepond.min.css'
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { useFetcher, useNavigate } from 'react-router'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { BackTo } from '@/components/back-to'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function CreateWatermark() {
  const [files, setFiles] = React.useState<File[]>([])

  const fetcher = useFetcher()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()

    for (const file of files) {
      formData.append('files[]', file)
    }

    fetcher.submit(formData, {
      method: 'POST',
      encType: 'multipart/form-data',
    })
  }

  const pending = fetcher.state !== 'idle'

  return (
    <>
      <BackTo to="/watermarks" />
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
