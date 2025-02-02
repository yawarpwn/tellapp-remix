const isDev = import.meta.env.MODE === 'development'
// export const BASE_URL = 'https://api.tellsignals.workers.dev'
export const BASE_URL = isDev
  ? 'http://localhost:8787'
  : 'https://api.tellsignals.workers.dev'

export const PRODUCT_CATEGORIES = {
  1: 'cintas seguridad',
  2: 'obras',
  3: 'proteccion vial',
  4: 'fotoluminiscente',
  5: 'seguridad',
  6: 'viales',
  7: 'viniles',
  8: 'lucha contra incendio',
  9: 'articulos seguridad',
  10: 'epp',
  11: 'servicio',
  12: 'ropa seguridad',
  13: 'convencionales',
  14: 'acrilicos',
} as const
