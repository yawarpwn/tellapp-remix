'use client'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { generatePdfDoc } from './pdf-doc'

// const customTable: CustomTableLayout = {
//   hLineWidth: function (i, node) {
//     if (i === 0 || i === node.table.body.length) {
//       return 0
//     }
//     return i === node.table.headerRows ? 2 : 1
//   },
//   vLineWidth: function (i) {
//     return 0
//   },
//   hLineColor: function (i) {
//     return i === 1 ? 'black' : '#aaa'
//   },
//   paddingLeft: function (i) {
//     return i === 0 ? 0 : 8
//   },
//   paddingRight: function (i, node) {
//     return i === node.table.widths.length - 1 ? 0 : 8
//   },
// }

export default function Page() {
  const dd = pdfMake.createPdf(generatePdfDoc(), undefined, undefined, pdfFonts.pdfMake.vfs)
  return (
    <div>
      <button className="bg-orange-500 px-4 py-2" onClick={() => dd.open()}>
        Descargar PDF
      </button>
      <button>Imprimir Pdf</button>
    </div>
  )
}
