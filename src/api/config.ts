// Token je dočasně v klientu (přes VITE_ se zapéká do bundle, je veřejně čitelný) –
// jen pro fázi testování. V produkci řešit X-AUTH-TOKEN na proxy/serveru a
// VITE_API_BASE_URL přepnout na proxy cestu. Frontend vkládá token na jediném místě: authHeaders().
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.epoukazonline.cz'

export function authHeaders(): Record<string, string> {
  const token = import.meta.env.VITE_API_TOKEN
  return token ? { 'X-AUTH-TOKEN': token } : {}
}
