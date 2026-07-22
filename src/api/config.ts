// ⚠️ POZOR (pro backend kolegu): Token je zde JEN pro fázi testování a přes VITE_ se
// zapéká do klientského bundle (je veřejně čitelný). V PRODUKCI:
//   1) odstranit VITE_API_TOKEN a řešit hlavičku X-AUTH-TOKEN až na serveru/proxy,
//   2) VITE_API_BASE_URL přepnout na vlastní proxy cestu (např. "/api").
// Frontend se pak nemění – token vkládáme na jediném místě: authHeaders().
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.epoukazonline.cz'

export function authHeaders(): Record<string, string> {
  const token = import.meta.env.VITE_API_TOKEN
  return token ? { 'X-AUTH-TOKEN': token } : {}
}
