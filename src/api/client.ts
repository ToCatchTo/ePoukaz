import { API_BASE_URL, authHeaders } from './config'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { ...authHeaders() },
    signal,
  })
  if (!res.ok) {
    throw new ApiError(res.status, `API ${res.status} na ${path}`)
  }
  return (await res.json()) as T
}
