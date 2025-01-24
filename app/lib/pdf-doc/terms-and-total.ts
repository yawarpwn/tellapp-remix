import { type QuotationClient } from "@/lib/types";

import { getIgv } from "@/lib/utils";
import type { Content, Table } from "pdfmake/interfaces";
import { COLORS } from "./constants";

export function getTermAndTotal(quotation: QuotationClient) {
  const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(
    quotation.items
  );

  const deadlineText =
    quotation.deadline === 1
      ? `${quotation.deadline} día útil`
      : `${quotation.deadline} días útiles`;

  const content: Content = {
    columns: [
      {
        table: {
          widths: [70, "auto", "*"],
          body: [
            [
              {
                text: "Términos y condiciones:",
                color: COLORS.PRIMARY,
                fontSize: 10,
                bold: true,
                colSpan: 3,
              },
              {},
              {},
            ],
            [
              "Tiempo de entrega",
              {
                text: ":",
                margin: [2, 0],
              },
              {
                text: [
                  {
                    text: deadlineText,
                    bold: true,
                    italics: true,
                  },
                  { text: ", una vez recepcionada la OC", italics: true },
                ],
              },
            ],
            [
              "Forma de pago",
              { text: ":", margin: [2, 0] },
              {
                text: quotation.credit
                  ? `Crédito ${quotation.credit} días `
                  : "50% adelanto , 50% contraentrega",
                italics: true,
              },
            ],
            [
              "Validez ",
              { text: ":", margin: [2, 0] },
              {
                text: "30 días",
                italics: true,
              },
            ],
          ],
        },
        layout: {
          defaultBorder: false,
          paddingLeft: () => 0,
          paddingRight: () => 0,
        },
      },
      {
        table: {
          widths: ["*", 80],
          body: [
            [
              {
                text: "Descuentos",
                alignment: "right",
              },
              {
                text: "- S/ 0.00",
                alignment: "right",
              },
            ],

            [
              {
                text: "Sub Total Ventas Gravadas",
                alignment: "right",
              },
              {
                text: quotation.includeIgv ? formatedSubTotal : "S/ 0.00",
                alignment: "right",
              },
            ],

            [
              {
                text: "IGV (18%)",
                alignment: "right",
              },
              {
                text: quotation.includeIgv ? formatedIgv : "S/ 0.00",
                alignment: "right",
              },
            ],
            [
              {
                text: [
                  {
                    text: quotation.includeIgv ? "IMPORTE TOTAL" : "TOTAL",
                    bold: true,
                    color: COLORS.PRIMARY,
                  },
                  {
                    text: quotation.includeIgv ? "" : " (No Incluye IGV)",
                    fontSize: 8,
                    color: COLORS.PRIMARY,
                    bold: true,
                  },
                ],
                alignment: "right",
                fontSize: 10,
              },
              {
                text: formatedTotal,
                alignment: "right",
                bold: true,
                fontSize: 10,
                color: COLORS.PRIMARY,
              },
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
      },
    ],
  };

  return content;
}
