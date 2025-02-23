import Fuse from 'fuse.js'
import type { IFuseOptions } from 'fuse.js'
import { useDebounce } from 'use-debounce'
import { useMemo, useState } from 'react'

interface Options<T> extends IFuseOptions<T> {
  matchAllOnEmptyQuery?: boolean
}

export function useFuse<T>(list: T[], options: Options<T>) {
  const [query, setQuery] = useState('')

  // Debounce del valor de búsqueda
  const [debouncedQuery] = useDebounce(query, 300)

  const { matchAllOnEmptyQuery, ...fuseOptions } = options

  // Memoriza la instancia de Fuse para evitar recalcularla innecesariamente
  const fuse = useMemo(
    () => new Fuse(list, { ...fuseOptions, includeMatches: true }),
    [list, fuseOptions],
  )

  // Memoriza los resultados cada vez que cambian la consulta debounced o las opciones
  const hits = useMemo(() => {
    if (!debouncedQuery && matchAllOnEmptyQuery) {
      return fuse.search('', { limit: 10 }) // Retorna todos los elementos si la búsqueda está vacía y se requiere
    }

    if (!debouncedQuery) {
      return []
    }

    return fuse.search(debouncedQuery, { limit: 10 })
  }, [debouncedQuery, fuse, matchAllOnEmptyQuery])

  const onSearch = (value: string) => {
    setQuery(value)
  }

  return {
    onSearch,
    hits,
  }
}
