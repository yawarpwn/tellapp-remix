import { Button } from '@/components/ui/button'
import { Share2Icon, DownloadIcon } from 'lucide-react'
import { generateQuotationPdf } from '@/lib/pdf-doc/generate-quotation-pdf'
import type { QuotationClient } from '@/types'
import * as pdfMake from 'pdfmake/build/pdfmake'
import 'pdfmake/build/vfs_fonts'

const formatDate = (date: string | Date) => {
  return Intl.DateTimeFormat('es-PE').format(new Date(date)).replace(/\//g, '-')
}

const getCustomerName = (name?: string) => {
  if (!name) return ''
  return name.toUpperCase().replace(/\./g, '').replace(/ /, '-')
}

const getQuotationPdfName = (quotation: QuotationClient) => {
  const date = formatDate(quotation.updatedAt)
  const customerName = getCustomerName(quotation?.customer?.name) || `-${date}-SIN-RUC`
  const isUpdate = Number(quotation.updatedAt) > Number(quotation.createdAt)
  const updatePrefix = isUpdate ? '-ACTUALIZADO' : ''
  return `${quotation.number}-COT-${customerName}${updatePrefix}.pdf`
}

export function DownloadAndShareButtons({ quotation }: { quotation: QuotationClient }) {
  const pdfFileName = getQuotationPdfName(quotation)

  const handleSharePdf = async () => {
    // Comprobar si el navegador admite la API navigator.share
    if (!navigator.share) {
      console.log('Share api no supported')
      return
    }

    const documentDefinition = generateQuotationPdf(quotation)
    const pdfDoc = pdfMake.createPdf(documentDefinition)

    const blob = await new Promise<Blob>((resolve) => {
      pdfDoc.getBlob((blob) => resolve(blob))
    })

    // Usar la API navigator.share para compartir el Blob del PDF
    try {
      await navigator.share({
        files: [
          new File([blob], pdfFileName, {
            type: 'application/pdf',
          }),
        ],
        title: `Cotización ${quotation.number}`,
        text: '¡Echa un vistazo a esta cotización!',
      })
    } catch (error) {
      console.log('Error al interntar compartir', error)
    }
  }

  const downloadPdf = () => {
    const documentDefinition = generateQuotationPdf(quotation)
    const pdfDoc = pdfMake.createPdf(documentDefinition)
    pdfDoc.download(pdfFileName)
  }

  return (
    <>
      <Button variant="outline" onClick={downloadPdf} size={'sm'}>
        <DownloadIcon size={20} />
        <span className="hidden lg:block">Descargar</span>
      </Button>

      <Button variant="outline" onClick={handleSharePdf} size={'sm'}>
        <Share2Icon size={20} />
        <span className=" hidden lg:block">Compartir</span>
      </Button>
    </>
  )
}
