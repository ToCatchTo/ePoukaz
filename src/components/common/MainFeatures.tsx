import { Box, Stack, Typography } from '@mui/material'
import { MAIN_FEATURES } from '../../data/content'
import { fluid } from '../../theme/fluid'
import { PAGE_PX } from '../../theme/grid'

// Sekce „Hlavní funkce" – nadpis + podtitul + mřížka dlaždic (ikonka + text).
// Nahrazuje původní formulář (TryForFreeForm) na stránkách Ceník a Pro výdejny.
// Není dělaná podle gridu, jen centrovaná; boční margin ≥ 1 sloupec přes PAGE_PX
// (stejně jako měl formulář, včetně spodní mezery mb: fluid(120, 230)).
//
// Rozměry dle XD (desktop, viewport 1920):
//   nadpis 90px (variant h1) · podtitul 26px · titulek dlaždice Bold 26px
//   ikonka ~52×60px · rozteč sloupců 414px (gap ≈ 116) · rozteč řádků 140px (gap ≈ 80)
//   mezera ikonka↔text ≈ 31px · šířka titulku dlaždice do 215px
export default function MainFeatures() {
  return (
    <Box sx={{ px: PAGE_PX }}>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', mb: fluid(120, 230) }}>
        <Typography variant="h1" sx={{ color: '#fff', maxWidth: 905 }}>{MAIN_FEATURES.title}</Typography>
        <Typography
          sx={{ color: '#fff', maxWidth: 796, fontSize: fluid(16, 26), lineHeight: 1.5, mt: fluid(50, 130) }}
          dangerouslySetInnerHTML={{ __html: MAIN_FEATURES.subtitle }}
        />

        {/* Mřížka: desktop 3 sloupce, tablet 2, mobil 1 – vždy vycentrovaná.
            Dlaždice mají šířku podle obsahu (max-content), takže mezery sedí na XD rozteče. */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'max-content',
              sm: 'repeat(2, max-content)',
              lg: 'repeat(3, max-content)',
            },
            columnGap: fluid(40, 116),
            rowGap: fluid(40, 80),
            justifyContent: 'center',
            mt: fluid(48, 76),
          }}
        >
          {MAIN_FEATURES.items.map((it, i) => (
            <Stack key={i} direction="row" sx={{ alignItems: 'center', gap: fluid(16, 31), textAlign: 'left' }}>
              <Box
                component="img"
                src={it.icon}
                alt=""
                aria-hidden
                sx={{ width: fluid(36, 52), height: fluid(42, 60), flexShrink: 0 }}
              />
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: fluid(18, 26), lineHeight: 1.15, maxWidth: 240 }}>
                {it.title}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  )
}
