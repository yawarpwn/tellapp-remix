const isDev = import.meta.env.MODE === 'development'
// export const BASE_URL = 'https://api.tellsignals.workers.dev'
export const BASE_URL = isDev
  ? 'http://localhost:8787'
  : 'https://api.tellsignals.workers.dev'

export const PRODUCT_CATEGORIES = {
  CINTAS_SEGURIDAD: 'cintas seguridad',
  OBRAS: 'obras',
  PROTECCION_VIAL: 'proteccion vial',
  FOTOLUMINISCENTE: 'fotoluminiscente',
  SEGURIDAD: 'seguridad',
  VIALES: 'viales',
  VINILES: 'viniles',
  LUCHA_CONTRA_INCENDIO: 'lucha contra incendio',
  ARTICULOS_SEGURIDAD: 'articulos seguridad',
  EPP: 'epp',
  SERVICIO: 'servicio',
  ROPA_SEGURIDAD: 'ropa seguridad',
  CONVENCIONALES: 'convencionales',
  ACRILICOs: 'acrilicos',
} as const
