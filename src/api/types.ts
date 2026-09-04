export type Company = {
  name: string
  billingIco: string
  address: { street: string | null; city: string | null; zip: string | null }
  logo: string | null
  photos: { exterior: string | null; interior: string | null }
  publicHash: string
}

// Jedna rozvozová oblast v rámci doručení provozovny.
export type DeliveryRadius = { id: string; name: string; price: string; note: string }

// Nastavení doručení provozovny (může chybět, pokud provozovna rozvoz nenabízí).
export type CompanyDelivery = {
  enabled: boolean
  fee: string
  radiuses: DeliveryRadius[]
  note: string
}

// Detail provozovny z GET /api/web/companies/{hash} – stejný tvar jako položka
// výpisu, navíc kontakty a doručení. Pole jsou volitelná/nullable, protože je
// provozovna nemusí mít vyplněná. Zatím se nikde nevykreslují (jen připraveno).
export type CompanyDetail = Company & {
  publicPhone: string | null
  publicPhones: string[]
  publicEmail: string | null
  website: string | null
  delivery: CompanyDelivery | null
}

export type Tariff = {
  code: string
  label: string
  monthlyPriceCzk: string | null
  annualPriceCzk: string | null
  features: string[]
}

export type PageSummary = { title: string; slug: string }

export type PageDetail = { title: string; slug: string; content: string; gallery: string[] }
