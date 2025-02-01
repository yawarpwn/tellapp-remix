import { HTTPRequestError } from '@/lib/errors'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { type QuotationItem } from '@/types'

export const formatDateToLocal = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  const formatter = new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  })
  return formatter.format(new Date(date))
}

export function formatNumberToLocal(price: number) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(price)
}

export const getFormatedDate = (date: string | Date) => {
  const currentDate = date ? new Date(date) : new Date()
  const year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let day = currentDate.getDate()

  const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(
    day
  ).padStart(2, '0')}`
  return formatedDate
}

export function getIgv(items: QuotationItem[]) {
  if (!items) {
    return { total: 0, subTotal: 0, igv: 0 }
  }

  const calcTotal = items.reduce((acc, curr) => {
    const result = (acc += curr.price * curr.qty)
    return result
  }, 0)

  const totalItems = items.reduce((acc, curr) => {
    const items = (acc += curr.qty)
    return items
  }, 0)

  const total = calcTotal
  const subTotal = total / 1.18
  const igv = subTotal * 0.18

  return {
    total: total.toFixed(2),
    subTotal: subTotal.toFixed(2),
    igv: igv.toFixed(2),
    formatedTotal: formatNumberToLocal(total),
    formatedIgv: formatNumberToLocal(igv),
    formatedSubTotal: formatNumberToLocal(subTotal),
    totalItems,
  }
}

export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options)
  console.log(`OK:${response.ok} - ${response.url} - ${response.statusText}`)
  if (!response.ok) {
    throw new HTTPRequestError(
      `Error en la peticion: ${url} - ${response.statusText}`
    )
  }
  return response.json() as T
}

export async function fakePromise(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function handleError(error: unknown) {
  console.log(error)
  if (error instanceof HTTPRequestError) {
    return {
      success: false,
      error: error.message,
    }
  }
  return {
    success: false,
    error: 'Error Desconocido',
  }
}
