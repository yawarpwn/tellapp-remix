import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  EyeIcon,
  TrashIcon,
  Share2Icon,
  ShareIcon,
  XIcon,
  DownloadIcon,
  Loader2Icon,
} from 'lucide-react'
import { useState } from 'react'
import { toast, useSonner } from 'sonner'
import { useTransition } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useFetcher } from 'react-router'
import React from 'react'

interface Props {
  url: string
  thumbUrl: string
  id: string
  width: number
  height: number
  publicId: string
  isSelected: boolean
  toggleSelectedPhoto: (id: string) => void
}
export function WatermarkCard({
  url,
  thumbUrl,
  id,
  width,
  height,
  publicId,
  toggleSelectedPhoto,
  isSelected,
}: Props) {
  const [openModal, setOpenModal] = useState(false)

  const handleDownload = async () => {
    const blob = await fetch(url).then((res) => res.blob())
    const blobUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = blobUrl
    const hash = new Date().getTime().toString()
    anchor.download = `tellsenales-photo-${hash}`
    anchor.target = '_blank'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }
  const handleShare = async () => {
    if (navigator.share) {
      const blob = await fetch(url).then((res) => res.blob())
      try {
        await navigator.share({
          title: 'Imagen para compartir',
          text: 'Mira esta imagen interesante!',
          files: [
            new File([blob], 'Tellsenales-foto.jpg', {
              type: blob.type,
            }),
          ],
        })
        console.log('Imagen compartida exitosamente')
      } catch (error) {
        console.error('Error al compartir la imagen:', error)
      }
    } else {
      alert(
        'La funcionalidad de compartir no está disponible en este dispositivo.'
      )
    }
  }

  const deleteFetcher = useFetcher()

  const deleteAction = async (id: string) => {
    deleteFetcher.submit(
      {
        publicId,
      },
      {
        method: 'post',
        action: `/watermarks/${id}/delete`,
      }
    )
  }

  const pending = deleteFetcher.state !== 'idle'

  return (
    <>
      {openModal && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="">
            <DialogTitle className="sr-only">View modal</DialogTitle>
            <div className="border">
              <img src={url} className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-2 p-2">
              <div className="flex gap-4 rounded-md bg-background px-6 py-2">
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size={'icon'}
                  onClick={handleDownload}
                >
                  <DownloadIcon size={20} />
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="h-8 w-8 "
                  size={'icon'}
                >
                  <Share2Icon size={20} />
                </Button>
                <Button
                  onClick={() => deleteAction(id)}
                  className="h-8 w-8 "
                  variant="destructive"
                  size={'icon'}
                  disabled={pending}
                >
                  {pending ? (
                    <Loader2Icon className="animate-spin" size={20} />
                  ) : (
                    <TrashIcon size={20} />
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div
        className="relative max-w-full cursor-pointer overflow-hidden rounded-md"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {/* Buttons */}
        <div className="">
          <Checkbox
            checked={isSelected}
            className="absolute left-1 top-1 z-50 size-6"
            onCheckedChange={() => toggleSelectedPhoto(id)}
          />
          <button
            className="absolute right-1 top-1 z-50 w-8"
            onClick={() => setOpenModal(true)}
          >
            <EyeIcon />
          </button>
          <img className="h-full w-full object-contain" src={thumbUrl} />
        </div>
        <div
          onClick={() => toggleSelectedPhoto(id)}
          className={cn(
            'absolute inset-0  bg-black/80 opacity-0 transition-colors duration-100',
            isSelected && 'opacity-100'
          )}
        ></div>
      </div>
    </>
  )
}
