import { Box, Button, Stack, Typography } from '@mui/material'
import { darken } from '@mui/material/styles'

// Tarif = vizuální varianta karty. Barvy a ikony přesně dle XD a dodaných SVG (Ship_*, Check_*).
export type Tier = 'start' | 'pro' | 'premium'

// Data jednoho tarifu (podmnožina PRICING z content.ts)
export type PricingItem = {
  name: string
  price: string
  note: string
  features: readonly string[]
  cta: string
}

// Per-tier konfigurace: barva názvu/ceny, pozadí tlačítka, fajfka, lodička a plná barva „jazyku“ za boatem
const TIERS: Record<Tier, { color: string; button: string; check: string; ship: string; tab: string }> = {
  start: {
    color: '#000000', button: '#939393',
    check: '/icons/pricing-check-start.svg', ship: '/icons/pricing-ship-start.svg',
    tab: '#EAEAEF',
  },
  pro: {
    color: '#4200D8', button: '#4200D8',
    check: '/icons/pricing-check-pro.svg', ship: '/icons/pricing-ship-pro.svg',
    tab: '#E1D6F7',
  },
  premium: {
    color: '#00C7BF', button: '#00C7BF',
    check: '/icons/pricing-check-premium.svg', ship: '/icons/pricing-ship-premium.svg',
    tab: '#D2F3F0',
  },
}

// „Jazyk“ u horní hrany karty, ve kterém sedí lodička. Tvar: plochý horní okraj
// (nejširší část), z něj dva rovné boky sbíhající se dolů do zaobleného cípu.
// Jednotná barva (bez přechodu).
function BoatTab({ color, ship }: { color: string; ship: string }) {
  return (
    <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 175, height: 68 }}>
      <Box sx={{ backgroundColor: color, width: '150px', height: '150px', transform: 'rotate(45deg)', margin: '-76px auto 0 auto', borderRadius: '20px 20px 60px 20px' }} />
      {/* Lodička – dekorativní ikona tarifu, vycentrovaná v horní části jazyku */}
      <Box
        component="img" src={ship} alt="" aria-hidden
        sx={{ position: 'absolute', top: 35, left: '50%', transform: 'translateX(-50%)', width: 26, height: 26 }}
      />
    </Box>
  )
}

// Jedna tarifní karta. Všechny karty mají stejný stín; na hover se jen nadzvednou.
export default function PricingCard({
  item, tier,
}: { item: PricingItem; tier: Tier }) {
  const t = TIERS[tier]

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#fff',
        borderRadius: '100px',
        height: '583px', // všechny karty stejně vysoké dle XD
        maxWidth: '370px', // max šířka karty dle XD
        width: '100%',
        overflow: 'hidden', // ořízne obsah do zaoblených rohů
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        px: 4,
        pt: '104px', // místo pro „jazýček“ s lodičkou nahoře – stejné u všech karet (obsah zarovnaný dle XD)
        pb: '65px',
        boxShadow: '0 24px 50px rgba(0,0,0,0.10)', // stejný stín u všech karet
        transition: 'transform .25s ease',
        '&:hover': { transform: 'translateY(-12px)' }, // na hover jen nadzvednutí
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
      }}
    >
      <BoatTab color={t.tab} ship={t.ship} />

      {/* Název + cena + poznámka – vždy vycentrované přes celou šířku karty */}
      <Typography sx={{ alignSelf: 'stretch', textAlign: 'center', fontWeight: 700, fontSize: 20, color: t.color, mb: 1 }}>{item.name}</Typography>
      <Typography
        sx={{ alignSelf: 'stretch', textAlign: 'center', fontWeight: 500, fontSize: 60, lineHeight: 1.05, color: t.color, letterSpacing: '-5.12px' }}
      >
        {item.price}
      </Typography>
      <Typography sx={{ alignSelf: 'stretch', textAlign: 'center', fontSize: 11, color: '#939393', letterSpacing: '0.5px', mt: 1, mb: 4 }}>
        {item.note}
      </Typography>

      {/* Seznam vlastností – blok vycentrovaný (jako cena), řádky uvnitř zarovnané vlevo */}
      <Stack spacing={1.5} sx={{ alignSelf: 'center', alignItems: 'flex-start', mb: 5 }}>
        {item.features.map((f) => (
          <Stack key={f} direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            <Box component="img" src={t.check} alt="" aria-hidden sx={{ width: 18, height: 18, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 16, color: '#000' }}>{f}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* CTA – pill tlačítko v barvě tarifu, přišpendlené dolů */}
      <Button
        variant="contained"
        sx={{
          mt: 'auto', alignSelf: 'center', px: '17px', py: '20px', fontSize: 18, lineHeight: 1,
          bgcolor: t.button, color: '#fff', width: '188px',
          '&:hover': { bgcolor: darken(t.button, 0.12) },
        }}
      >
        {item.cta}
      </Button>
    </Box>
  )
}
