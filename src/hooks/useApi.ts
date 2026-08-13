import { useEffect, useState } from 'react'
import { getCompanies, getTariffs, getPages, getPage } from '../api/endpoints'
import type { Company } from '../api/types'

export type ApiState<T> = { data: T | null; loading: boolean; error: Error | null }

// Generický datový hook: řeší loading/error i rušení zastaralých odpovědí.
export function useApi<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[],
): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })
    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted || (err as Error)?.name === 'AbortError') return
        setState({ data: null, loading: false, error: err as Error })
      })
    return () => controller.abort()
    // deps řídí volající; fetcher se mezi rendery mění, proto není v poli závislostí
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}

export const useCompanies = () => useApi((signal) => getCompanies(undefined, signal), [])
export const useTariffs = () => useApi((signal) => getTariffs(signal), [])
export const usePages = () => useApi((signal) => getPages(signal), [])
export const usePage = (slug: string) => useApi((signal) => getPage(slug, signal), [slug])

export function useCompaniesSearch(query: string): ApiState<Company[]> {
  const q = query.trim()
  return useApi<Company[]>(
    (signal) => (q ? getCompanies(q, signal) : Promise.resolve<Company[]>([])),
    [q],
  )
}
