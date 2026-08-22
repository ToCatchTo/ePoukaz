import { Box, Stack, Typography } from '@mui/material'
import { MAIN_FEATURES } from '../../data/content'
import { fluid } from '../../theme/fluid'
import { PAGE_PX } from '../../theme/grid'

// Sekce „Hlavní funkce" – nadpis + podtitul + mřížka dlaždic (ikonka + text).
// Není podle gridu, jen centrovaná; boční margin ≥ 1 sloupec přes PAGE_PX.
export default function MainFeatures() {
  return (
    <Box sx={{ px: PAGE_PX }}>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', mb: fluid(120, 230) }}>
        <Typography variant="h1" sx={{ color: '#fff', maxWidth: 905 }}>{MAIN_FEATURES.title}</Typography>
        <Typography
          sx={{ color: '#fff', maxWidth: 796, fontSize: fluid(16, 26), lineHeight: 1.5, mt: fluid(50, 130) }}
          dangerouslySetInnerHTML={{ __html: MAIN_FEATURES.subtitle }}
        />

        {/* Mřížka: desktop 3 sloupce, tablet 2, mobil 1 – vycentrovaná.
            Dlaždice mají šířku podle obsahu (max-content). */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'max-content',
              sm: 'repeat(2, max-content)',
              lg: 'repeat(3, max-content)',
            },
            columnGap: fluid(40, 175),
            rowGap: fluid(40, 80),
            justifyContent: 'center',
            mt: fluid(48, 76),
          }}
        >
          {MAIN_FEATURES.items.map((it, i) => (
            <Stack key={i} direction="row" sx={{ alignItems: 'center', gap: '15px', textAlign: 'left' }}>
              <Box
                component="img"
                src={it.icon}
                alt=""
                aria-hidden
                // Ikony jsou různobarevné/duotone SVG; filtr je sjednotí na bílou (zachová i odstín duotone).
                sx={{ width: fluid(36, 80), height: fluid(42, 80), flexShrink: 0, filter: 'brightness(0) invert(1)' }}
              />
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: fluid(18, 26), lineHeight: 1.15, maxWidth: 240 }}
                dangerouslySetInnerHTML={{ __html: it.title }}
              />
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  )
}
