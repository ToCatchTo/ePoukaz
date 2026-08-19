// SEO texty jednotlivých rout: title bez brandu, description cca 150 znaků.
export type SeoMeta = { title?: string; description: string }

export const SEO: Record<string, SeoMeta> = {
  '/': { description: 'ePoukaz online – najděte výdejnu a vyřiďte elektronický poukaz snadno a rychle.' },
  '/pro-vydejny': { title: 'Pro výdejny', description: 'Digitalizujte výdej poukazů. ePoukaz online šetří čas výdejnám i zákazníkům.' },
  '/cenik': { title: 'Ceník', description: 'Tarify Start, Pro a Premium. 30 dní zdarma, bez závazků. Vyberte si plán pro svou výdejnu.' },
  '/kontakt': { title: 'Kontakt', description: 'Ozvěte se nám – rádi vám s nasazením ePoukaz online pomůžeme.' },
  '/faq': { title: 'Časté dotazy', description: 'Odpovědi na nejčastější dotazy k ePoukaz online.' },
  '/obchodni-podminky': { title: 'Obchodní podmínky', description: 'Obchodní podmínky služby ePoukaz online.' },
  '/jak-to-funguje': { title: 'Jak to funguje', description: 'Jak ePoukaz online funguje krok za krokem.' },
  '/vse-o-epoukazu': { title: 'Vše o ePoukazu', description: 'Vše, co potřebujete vědět o elektronických poukazech.' },
}
