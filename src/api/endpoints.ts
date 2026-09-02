import { apiFetch } from './client'
import type { Company, CompanyDetail, Tariff, PageSummary, PageDetail } from './types'

export const getCompanies = (search?: string, signal?: AbortSignal) => {
  const qs = search && search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''
  return apiFetch<Company[]>(`/api/web/companies${qs}`, signal)
}

// Detail jedné provozovny podle publicHash; 404 → ApiError(404) z apiFetch.
export const getCompany = (hash: string, signal?: AbortSignal) =>
  apiFetch<CompanyDetail>(`/api/web/companies/${encodeURIComponent(hash)}`, signal)

export const getTariffs = (signal?: AbortSignal) =>
  apiFetch<Tariff[]>('/api/web/tariffs', signal)

export const getPages = (signal?: AbortSignal) =>
  apiFetch<PageSummary[]>('/api/web/pages', signal)

export const getPage = (slug: string, signal?: AbortSignal) =>
  apiFetch<PageDetail>(`/api/web/pages/${encodeURIComponent(slug)}`, signal)
