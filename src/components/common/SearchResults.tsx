import { Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import type { Company } from '../../api/types'
import { formatAddress, orderUrl } from '../../api/companyFill'
import { SEARCH } from '../../data/content'
import { CARD_R } from '../../theme/layout'
import { fluid } from '../../theme/fluid'

type Props = { loading: boolean; error: Error | null; companies: Company[] }

// Bílý panel pod vyhledávacím polem – spinner / chyba / řádky výsledků / „nic nenašli".
export default function SearchResults({ loading, error, companies }: Props) {
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: CARD_R, px: fluid(28, 138), py: fluid(40, 88), width: '100%' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress aria-label="Načítání" />
        </Box>
      ) : error ? (
        <Typography sx={{ textAlign: 'center', fontSize: fluid(16, 20) }}>
          Vyhledávání se nepodařilo. Zkuste to prosím znovu.
        </Typography>
      ) : companies.length === 0 ? (
        <Stack spacing={fluid(24, 40)} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ fontSize: fluid(18, 26), letterSpacing: '0.52px' }}>{SEARCH.emptyTitle}</Typography>
          <Divider sx={{ borderColor: '#00000029', width: '100%' }} />
          <Typography sx={{ fontWeight: 700, fontSize: fluid(16, 20) }}>{SEARCH.notFoundTitle}</Typography>
          <Typography sx={{ fontSize: fluid(14, 20), maxWidth: 812 }}>{SEARCH.notFoundText}</Typography>
        </Stack>
      ) : (
        <Stack divider={<Divider sx={{ borderColor: '#00000029' }} />} spacing={0}>
          {companies.map((c) => (
            <Stack
              key={c.publicHash}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', py: fluid(16, 20) }}
            >
              <Typography sx={{ fontSize: fluid(16, 20) }}>
                <Box component="span" sx={{ fontWeight: 700 }}>{c.name}</Box>
                {formatAddress(c.address) && <Box component="span">{`, ${formatAddress(c.address)}`}</Box>}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                href={orderUrl(c.publicHash)}
                sx={{ color: '#F5F5F5', flexShrink: 0, px: fluid(20, 28), whiteSpace: 'nowrap' }}
              >
                {SEARCH.selectLabel}
              </Button>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  )
}
