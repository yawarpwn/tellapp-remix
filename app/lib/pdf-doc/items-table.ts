import { getIgv } from "@/lib/utils";
import type { QuotationClient } from "@/lib/types";
import type { Content } from "pdfmake/interfaces";

export function getItemsTable(quotation: QuotationClient) {
  const { formatedIgv, formatedSubTotal, formatedTotal } = getIgv(
    quotation.items
  );

  const itemsTable: Content = {
    table: {
      widths: ["auto", "*", "auto", 50, "auto", 35, "auto"],
      headerRows: 1,
      body: [
        [
          { text: "No", color: "#fff", alignment: "center" },
          {
            text: "DESCRIPCION",
            alignment: "center",
            color: "#fff",
          },
          {
            text: "LINK",
            alignment: "center",
            color: "#fff",
          },
          {
            text: "U/M",
            alignment: "center",
            color: "#fff",
          },
          { text: "CANT", color: "#fff", alignment: "center" },
          // { text: 'P. BASE', color: '#fff', alignment: 'center' },
          { text: "P. UNT", color: "#fff", alignment: "center" },
          { text: "IMPORTE", color: "#fff", alignment: "center" },
        ],
        ...quotation.items.map((item, index) => {
          const unitPrice = quotation.includeIgv
            ? item.price / 1.18
            : item.price;
          const importe = unitPrice * item.qty;
          return [
            // numero
            {
              text: index + 1,
              alignment: "center",
              margin: [0, 5],
            },

            // description
            {
              text: item.description,
            },

            //Link
            {
              text: item.link ? "Ver" : "",
              fontSize: 6,
              link: item.link ? item.link : "#",
              external: true,
              alignment: "center",
              italic: true,
              color: "#7d2de0",
              margin: [0, 5],
            },

            // unidad medidad
            {
              //@ts-ignore
              text: item.unitSize,
              alignment: "center",
              margin: [0, 5],
            },

            // cantidad
            {
              text: item.qty.toString().padStart(2, "0"),
              alignment: "center",
              margin: [0, 5],
            },

            // Precio Unitario
            {
              text: unitPrice.toFixed(2),
              alignment: "center",
              margin: [0, 5],
            },

            // Importe
            {
              text: importe.toFixed(2),
              alignment: "center",
              margin: [0, 5],
            },
          ];
        }),
      ],
    },
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        if (rowIndex === 0) return "#222";

        return rowIndex % 2 === 0 ? "#ededed" : null;
      },
      hLineColor: (index, node) => (index == 1 ? "#000" : "#aaa"),
      // paddingTop: index => (index === 0 ? 4 : 8),
      // paddingBottom: index => (index === 0 ? 4 : 8),
      hLineWidth: (index) => (index === 0 ? 5 : 10),
      vLineWidth: () => 1,
      vLineColor: "#0d3",
      vLineStyle: (index, node) => null,
      defaultBorder: false,
    },
    // layout: 'lightHorizontalLines',

    marginBottom: 10,
  };

  return itemsTable;
}
