import { apiFetch } from './client'
import type { Company, Tariff, PageSummary, PageDetail } from './types'

export const getCompanies = (signal?: AbortSignal) =>
  apiFetch<Company[]>('/api/web/companies', signal)

export const getTariffs = (signal?: AbortSignal) =>
  apiFetch<Tariff[]>('/api/web/tariffs', signal)

export const getPages = (signal?: AbortSignal) =>
  apiFetch<PageSummary[]>('/api/web/pages', signal)

export const getPage = (slug: string, signal?: AbortSignal) =>
  apiFetch<PageDetail>(`/api/web/pages/${encodeURIComponent(slug)}`, signal)
