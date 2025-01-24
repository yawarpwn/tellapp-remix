import { Label } from '@/types'
import { Column, Table } from 'pdfmake/interfaces'
import { getFragileSvg, getLogo } from './constants'

export const gelLabelColumn = (label: Label) => {
  const column: Column = {
    table: {
      widths: '*',
      // heights: ['auto', 'auto', 'auto', 'auto', 40, 80, 'auto'],
      body: [
        [
          {
            stack: [
              {
                svg: getLogo({ width: 230, height: 30, fill: '#000' }),
              },
              {
                text: 'Señalizaciones y Dispositivos Se seguridad',
                margin: [0, 3],
              },
              {
                text: 'tellsenales.com',
                italics: true,
              },
            ],
            margin: [0, 10],
            alignment: 'center',
            border: [false, false, false, true],
          },
        ],
        [
          {
            stack: [
              {
                text: 'DESTINATARIO',
                style: 'sectionTitle',
              },
              {
                text: label.recipient,
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],

        [
          {
            stack: [
              {
                text: 'DESTINO',
                style: 'sectionTitle',
              },
              {
                text: label.destination.toUpperCase(),
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],
        [
          {
            stack: [
              {
                text: 'DNI/RUC',
                style: 'sectionTitle',
              },
              {
                text: label.dniRuc,
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],
        [
          {
            stack: [
              {
                text: 'TELEFONO',
                style: 'sectionTitle',
              },
              {
                text: label.phone || '',
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],

        [
          {
            stack: [
              {
                text: 'OBSERVACIONES',
                style: 'sectionTitle',
              },
              {
                text: label.observations || '\n\n',
                style: 'sectionContent',
                fontSize: 10,
              },
            ],
            style: 'section',
          },
        ],

        [
          {
            stack: [
              {
                text: 'AGENCIA SUGERIDA',
                style: 'sectionTitle',
              },
              {
                text: label.agency?.name || '',
                fontSize: 12,
                bold: true,
              },
              {
                text: label.agency?.address || '',
                fontSize: 10,
                italics: true,
              },
              {
                text: label.agency?.phone || '',
                fontSize: 10,
                italics: true,
              },
            ],
            style: 'section',
          },
        ],
        [
          {
            columns: [
              {
                qr: 'https://tellsenales.com',
                fit: 100,
                padding: 1,
                alignment: 'center',
              },
              {
                svg: getFragileSvg(),
                alignment: 'center',
              },
            ],
            columnGap: 5,
            margin: [0, 5],
          },
        ],
      ],
    },
    layout: 'labelLayout',
  }

  return column
}
