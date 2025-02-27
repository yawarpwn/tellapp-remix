import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { WatermarkCard } from './watermark-card'
import { toast } from 'sonner'
import type { Watermark } from '@/types'
import { Loader2, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'
interface Props {
  items: Watermark[]
}
export function MasonryLayout({ items }: Props) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [shareLoading, setShareLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)

  const reset = () => {
    setSelectedPhotos([])
    setShareLoading(false)
    setDownloadLoading(false)
  }

  function divideArray(inputArray: Watermark[], size: number) {
    const result = []
    const totalLength = inputArray.length
    const baseSize = Math.floor(totalLength / size)
    let remainder = totalLength % size

    let startIndex = 0
    for (let i = 0; i < size; i++) {
      let portionSize = baseSize + (remainder > 0 ? 1 : 0) // Añade una posición extra si hay residuo.
      result.push(inputArray.slice(startIndex, startIndex + portionSize))
      startIndex += portionSize
      remainder--
    }

    return result
  }

  const handleShareSelectedImages = async () => {
    const photosToShare = selectedPhotos.map(
      (id) => items.find((item) => item.id === id)?.url || ''
    )

    if (navigator.share) {
      setShareLoading(true)
      const blobs = await Promise.all(
        photosToShare.map((url) =>
          fetch(url.replace(/v\d+/, 'fl_layer_apply,l_watermark-tellsenales')).then((res) =>
            res.blob()
          )
        )
      )
      try {
        await navigator.share({
          title: 'Imagen para compartir',
          text: 'Mira esta imagen interesante!',
          files: [
            ...blobs.map(
              (blob, index) =>
                new File([blob], `Tellsenales-foto-${index}.jpg`, {
                  type: blob.type,
                })
            ),
          ],
        })
        toast.success('Imagen compartida exitosamente')
      } catch (error) {
        console.error('Error al compartir la imagen:', error)
        setShareLoading(false)
      } finally {
        reset()
      }
    } else {
      toast.error('La funcionalidad de compartir no está disponible en este dispositivo.')
    }

    console.log(photosToShare)
  }

  const toggleSelectedPhoto = (id: string) => {
    if (selectedPhotos.includes(id)) {
      setSelectedPhotos(selectedPhotos.filter((item) => item !== id))
    } else {
      setSelectedPhotos([...selectedPhotos, id])
    }
  }

  const handleDownloadSelectedImages = () => {
    setDownloadLoading(true)
    const photosToDownload = selectedPhotos.map(
      (id) => items.find((item) => item.id === id)?.url || ''
    )
    photosToDownload.forEach(async (url) => {
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
    })
    reset()
  }

  const mobileArray = divideArray(items, 2)
  const desktopArray = divideArray(items, 4)
  return (
    <div className="flex flex-col items-center">
      <header className="mb-8 flex w-full justify-end gap-3">
        <Button variant="secondary" onClick={() => reset()}>
          Limpiar
        </Button>
        <Button
          variant="secondary"
          disabled={selectedPhotos.length === 0 || downloadLoading}
          onClick={handleDownloadSelectedImages}
        >
          {shareLoading && <Loader2 className="mr-2 animate-spin" size={20} />}
          Descargar
        </Button>
        <Button
          variant="secondary"
          disabled={selectedPhotos.length === 0 || shareLoading}
          onClick={handleShareSelectedImages}
        >
          {shareLoading && <Loader2 className="mr-2 animate-spin" size={20} />}
          Compartir
        </Button>
        <Button asChild>
          <Link to="/watermarks/create">
            <PlusIcon /> Crear
          </Link>
        </Button>
        {/* <CreateWatermark /> */}
      </header>
      {/* Mobile */}
      <div className="relative flex gap-3 md:hidden">
        {mobileArray.map((photos, index) => {
          return (
            <div className="flex flex-col gap-3" key={index}>
              {photos.map((photo, index) => {
                return (
                  <WatermarkCard
                    publicId={photo.publicId}
                    isSelected={selectedPhotos.includes(photo.id)}
                    width={photo.width}
                    toggleSelectedPhoto={toggleSelectedPhoto}
                    height={photo.height}
                    id={photo.id}
                    key={photo.id}
                    url={photo.url}
                    thumbUrl={photo.thumbUrl}
                  />
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Desktop */}
      <div className="hidden gap-3 md:flex">
        {desktopArray.map((photos, index) => {
          return (
            <div className="flex flex-col gap-3 " key={index}>
              {photos.map((photo, index) => {
                return (
                  <WatermarkCard
                    publicId={photo.publicId}
                    isSelected={selectedPhotos.includes(photo.id)}
                    toggleSelectedPhoto={toggleSelectedPhoto}
                    width={photo.width}
                    height={photo.height}
                    id={photo.id}
                    key={photo.id}
                    url={photo.url}
                    thumbUrl={photo.thumbUrl}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
