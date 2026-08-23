// Serverless proxy pro /api/* na Vercelu – náhrada dev Vite proxy v produkci.
// Přepošle požadavek na reálné API a doplní tajný X-AUTH-TOKEN (Vercel env
// API_TOKEN), takže token nikdy neopustí server a odpadá CORS (server-to-server).
//
// Rewrite v vercel.json přepisuje /api/<cesta> → /api/proxy?__p=<cesta> a Vercel
// k tomu připojí původní query. Původní cestu tu skládáme zpět.
const BACKEND = 'https://api.epoukazonline.cz'

export default async function handler(req, res) {
  const token = process.env.API_TOKEN
  const u = new URL(req.url, 'http://internal')
  const path = u.searchParams.get('__p') || ''
  u.searchParams.delete('__p')
  const rest = u.searchParams.toString()
  const target = `${BACKEND}/api/${path}${rest ? '?' + rest : ''}`

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
