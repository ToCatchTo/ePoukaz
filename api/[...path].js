// Serverless proxy pro /api/* na Vercelu – náhrada dev Vite proxy v produkci.
// Přepošle požadavek na reálné API a doplní tajný X-AUTH-TOKEN (Vercel env
// API_TOKEN), takže token nikdy neopustí server a odpadá CORS (server-to-server).
// Frontend volá same-origin /api/web/* (VITE_API_BASE_URL je prázdné).
const BACKEND = 'https://api.epoukazonline.cz'

export default async function handler(req, res) {
  const token = process.env.API_TOKEN
  // req.url je původní cesta včetně query, např. /api/web/tariffs?code=...
  // Backend očekává /api/... (dev proxy cestu nestripovala), takže URL neupravujeme.
  const target = BACKEND + req.url

  try {
    const upstream = await fetch(target, {
      method: req.method,
      headers: token ? { 'X-AUTH-TOKEN': token } : {},
    })
    const body = await upstream.text()
    res.status(upstream.status)
    const ct = upstream.headers.get('content-type')
    if (ct) res.setHeader('content-type', ct)
    res.setHeader('cache-control', 'no-store')
    res.send(body)
  } catch (err) {
    res.status(502)
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify({ error: 'proxy_failed', message: String(err) }))
  }
}
