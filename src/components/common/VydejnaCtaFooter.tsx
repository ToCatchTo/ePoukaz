import { Box, Button, Divider, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import DecorLines from './DecorLines'
import { VYDEJNA_CTA, FOOTER } from '../../data/content'
import { CARD_R } from '../../theme/layout'
import { fluid } from '../../theme/fluid'
import GridSection from '../layout/GridSection'

// Zjednodušená patička pro zákaznické stránky (/, /jak-to-funguje, /vse-o-epoukazu).
// CTA karta „Jste výdejna ePoukazů?" s provozovatelem, pod kartou kredit agentury.
export default function VydejnaCtaFooter() {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {/* Vlnité čáry za kartou, vycentrované vůči kartě a prosvítající v okrajích. */}
        <DecorLines sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        <GridSection variant="wide" sx={{ position: 'relative', zIndex: 1, px: { xs: '14px', sm: CARD_R } }}>
          <Box sx={{ bgcolor: '#fff', borderRadius: CARD_R, px: fluid(24, 140), pt: fluid(80, 115), pb: fluid(40, 60) }}>
            <Stack spacing={fluid(24, 44)} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{ color: 'primary.main', textDecoration: 'underline', textUnderlineOffset: '6px', maxWidth: 1088, fontSize: fluid(30, 50), lineHeight: 1.14 }}
              >
                {VYDEJNA_CTA.title}
              </Typography>
              <Typography sx={{ color: 'primary.main', fontSize: fluid(16, 26), maxWidth: 876, lineHeight: 1.4 }}>
                <Box component="span" sx={{ fontWeight: 700 }}>{VYDEJNA_CTA.perexBold}</Box>
                {VYDEJNA_CTA.perexRest}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/pro-vydejny"
                endIcon={<Box component="img" src="/static-icons/arrow-right.svg" alt="" sx={{ width: fluid(30, 43), height: fluid(30, 43) }} />}
                sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: fluid(18, 24), fontWeight: 500, height: fluid(60, 70), mt: `${fluid(20, 40)} !important`, '& .MuiButton-endIcon': { ml: '20px', mr: 0 } }}
              >
                {VYDEJNA_CTA.button}
              </Button>
            </Stack>

            <Divider sx={{ mt: fluid(50, 61), mb: fluid(36, 68), borderWidth: 1 }} />

            <Typography sx={{ textAlign: 'center', fontSize: 16, color: '#000' }}>
              {VYDEJNA_CTA.provider}
            </Typography>
          </Box>
        </GridSection>
      </Box>

      {/* Kredit agentury pod kartou (shodné s hlavní patičkou). */}
      <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', alignItems: 'center', mt: fluid(150, 119) }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>{FOOTER.credit}</Typography>
        <MuiLink href="https://matfix.cz" target="_blank" rel="noopener noreferrer" aria-label="MatFix" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Box component="img" src="/images/logo-matfix.svg" alt="MatFix" sx={{ height: 15, display: 'block', m: '0px 0px 3px 15px !important' }} />
          <Box component="img" src="/images/footer-tvorba.svg" alt="" aria-hidden sx={{ height: 15, display: 'block' }} />
        </MuiLink>
      </Stack>
    </>
  )
}
