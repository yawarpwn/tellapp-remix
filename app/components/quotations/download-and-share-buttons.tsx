import { Button } from "@/components/ui/button";
import { ShareIcon, DownloadIcon } from "lucide-react";
import { generateQuotationPdf } from "@/lib/pdf-doc/generate-quotation-pdf";
import type { QuotationClient } from "@/lib/types";
import * as pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

export function DownloadAndShareButtons({
  quotation,
}: {
  quotation: QuotationClient;
}) {
  //WARN: Mejorar legibilidad
  //
  const date = Intl.DateTimeFormat("es-PE")
    .format(new Date(quotation.updatedAt))
    .replace(/\//g, "-");
  const ruc = quotation.customer.name
    ? `-${quotation.customer.name.replace(/\./g, "").split(" ").join("-")}`
    : `-${date}-SIN-RUC`;
  const diferenceTime =
    Number(quotation.updatedAt) - Number(quotation.createdAt);
  const isUpdate = diferenceTime > 0;

  const pdfFileName = `${quotation.number}-COT${ruc}${
    isUpdate ? "-ACTUALIZADO" : ""
  }.pdf`;

  const documentQuotationPdf = () => {
    const documentDefinition = generateQuotationPdf(quotation);
    return pdfMake.createPdf(documentDefinition);
  };

  const handleShare = async () => {
    // 		// Comprobar si el navegador admite la API navigator.share
    if (!navigator.share) {
      console.log("Share api no supported");
      return;
    }

    documentQuotationPdf().getBlob(
      async (pdfBlob) => {
        // Usar la API navigator.share para compartir el Blob del PDF
        try {
          await navigator.share({
            files: [
              new File([pdfBlob], pdfFileName, {
                type: "application/pdf",
              }),
            ],
            title: `Cotización ${quotation.number}`,
            text: "¡Echa un vistazo a esta cotización!",
          });
        } catch (error) {
          console.log("Error al interntar compartir", error);
        }
      },
      {
        progressCallback: (progress) => {
          console.log(progress);
        },
      }
    );
  };

  const downloadPdf = () => {
    // dd.open()
    documentQuotationPdf().download(pdfFileName);
  };

  return (
    <>
      <Button variant="outline" onClick={downloadPdf} size={"sm"}>
        <DownloadIcon size={20} />
        <span className="hidden lg:block">Descargar</span>
      </Button>

      <Button variant="outline" onClick={handleShare} size={"sm"}>
        <ShareIcon size={20} />
        <span className=" hidden lg:block">Compartir</span>
      </Button>
    </>
  );
}
