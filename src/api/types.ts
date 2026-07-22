export type Company = {
  name: string
  billingIco: string
  address: { street: string | null; city: string | null; zip: string | null }
  logo: string | null
  photos: { exterior: string | null; interior: string | null }
  publicHash: string
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
