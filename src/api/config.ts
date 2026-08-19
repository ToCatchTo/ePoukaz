// Token se přes VITE_ proměnnou zapéká do bundle, je tedy veřejně čitelný. Pro produkci patří
// X-AUTH-TOKEN na proxy/server a VITE_API_BASE_URL na proxy cestu. Frontend token vkládá na
// jediném místě: authHeaders().
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.epoukazonline.cz'

export function authHeaders(): Record<string, string> {
  const token = import.meta.env.VITE_API_TOKEN
  return token ? { 'X-AUTH-TOKEN': token } : {}
}
