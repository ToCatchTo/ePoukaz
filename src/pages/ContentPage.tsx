import { Fragment } from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import ContactBlock from '../components/common/ContactBlock'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import GridSection from '../components/layout/GridSection'
import { fluid } from '../theme/fluid'
import { UNI } from '../data/content'

// Mezinadpis = řetězec psaný celý VELKÝMI písmeny (vysází se tučně a s odsazením)
const isHeading = (s: string) => s === s.toUpperCase()

// Univerzální šablona podstránky (Desktop_UNI) – nadpis + obchodní podmínky,
// banner „2 měsíce ZDARMA" a kontakt spojený s patičkou do jedné karty.
// Obrázky do galerie (3 v řadě). Zatím 3× stejný vizuál – nahraď finálními z XD.
const GALLERY_IMAGES = [
  '/images/uni-gallery.png',
  '/images/uni-gallery.png',
  '/images/uni-gallery.png',
]

export default function ContentPage() {
  // Index posledního mezinadpisu – ten se vysází jako běžný text (bez tučného řezu a odsazení)
  const lastHeadingIndex = UNI.paragraphs.reduce((last, p, i) => (isHeading(p) ? i : last), -1)
  // Galerie se vloží před druhý nadpis (za úvodní blok, před „ÚVODNÍ USTANOVENÍ")
  const galleryBeforeIndex = UNI.paragraphs.findIndex((p, i) => i > 0 && isHeading(p))

  return (
    <Box data-testid="page-uni">
      {/* Karta s nadpisem a obchodními podmínkami – vlnité čáry prosvítají v okrajích, zarovnaná na grid */}
      <Box sx={{ position: 'relative', mb: '200px' }}>
        <DecorLines sx={{ top: 110 }} />
        <GridSection sx={{ position: 'relative', zIndex: 1 }}>
          <SectionCard sx={{ bgcolor: '#F5F5F5', px: fluid(20, 64), pt: fluid(80, 85), pb: fluid(96, 180) }}>
            {/* Obsah na 10sloupcovém gridu: na desktopu odsazený (obsah 8/10), na mobilu i tabletu plná šířka */}
            <Grid container columns={10}>
              <Grid offset={{ xs: 0, lg: 1 }} size={{ xs: 10, lg: 8 }}>
                <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', maxWidth: 592, lineHeight: fluid(22, 57), letterSpacing: '-0.84px', m: '0 auto', fontSize: fluid(18, 42) }}>{UNI.title}</Typography>
                <Stack sx={{ mt: fluid(40, 65) }}>
                  {UNI.paragraphs.map((p, i) => (
                    <Fragment key={i}>
                      {i === galleryBeforeIndex && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                            gap: '24px',
                            my: fluid(32, 48),
                          }}
                        >
                          {GALLERY_IMAGES.map((src, gi) => (
                            <Box
                              key={gi}
                              component="img"
                              src={src}
                              alt=""
                              aria-hidden
                              sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '20px', display: 'block' }}
                            />
                          ))}
                        </Box>
                      )}
                      {isHeading(p) && i !== lastHeadingIndex ? (
                        <Typography sx={{ fontWeight: 700, fontSize: fluid(14, 18), mt: i === 0 ? 0 : '32px', lineHeight: fluid(20, 30) }}>{p}</Typography>
                      ) : (
                        <Typography sx={{ fontSize: fluid(14, 18), lineHeight: fluid(20, 30), whiteSpace: 'pre-line' }}>{p}</Typography>
                      )}
                    </Fragment>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </SectionCard>
        </GridSection>
      </Box>

      <TwoMonthsFreeBanner />

      {/* Kontakt spojený s patičkou do jedné bílé karty (dle XD Desktop_UNI) */}
      <Footer topContent={<ContactBlock />} />
    </Box >
  )
}
