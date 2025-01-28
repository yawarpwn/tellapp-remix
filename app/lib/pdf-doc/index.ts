import "pdfmake/build/vfs_fonts";
import type { QuotationClient } from "@/lib/types";
import pdfmake from "pdfmake/build/pdfmake";
import { generateQuotationPdf } from "./generate-quotation-pdf";

const formatDate = (date: string | Date) => {
  return Intl.DateTimeFormat("es-PE")
    .format(new Date(date))
    .replace(/\//g, "-");
};

const getCustomerName = (name?: string) => {
  if (!name) return "";
  return name.toUpperCase().replace(/\./g, "").replace(/ /, "-");
};

const getPdfFilename = (quotation: QuotationClient) => {
  const date = formatDate(quotation.updatedAt);
  const ruc = getCustomerName(quotation?.customer?.name) || `-${date}-SIN-RUC`;
  const isUpdate = Number(quotation.updatedAt) > Number(quotation.createdAt);
  const updatePrefix = isUpdate ? "-ACTUALIZADO" : "";
  return `${quotation.number}-COT${ruc}${updatePrefix}.pdf`;
};

const downloadPdf = (quotation: QuotationClient) => {
  const documentDefinitions = generateQuotationPdf(quotation);
  const pdfDoc = pdfmake.createPdf(documentDefinitions);
  const pdfFileName = getPdfFilename(quotation);
  return pdfDoc.download(pdfFileName);
};

const getBlob = (quotation: QuotationClient) => {
  const documentDefinitions = generateQuotationPdf(quotation);
  const pdfDoc = pdfmake.createPdf(documentDefinitions);

  return new Promise((resolve) => {
    pdfDoc.getBlob((blob) => {
      resolve(blob);
    });
  });
};

export { downloadPdf, getBlob, getPdfFilename };
