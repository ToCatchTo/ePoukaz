import { Fragment } from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import ContactBlock from '../components/common/ContactBlock'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import { CONTENT_W } from '../theme/layout'
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
      <Box sx={{ maxWidth: CONTENT_W, mx: 'auto' }}>
        {/* Karta s nadpisem a obchodními podmínkami – vlnité čáry prosvítají v okrajích */}
        <Box sx={{ position: 'relative', mb: '200px' }}>
          <DecorLines sx={{ top: 110 }} />
          <SectionCard sx={{ bgcolor: '#F5F5F5', position: 'relative', zIndex: 1, pt: '85px', pb: '180px' }}>
            {/* Obsah na 10sloupcovém gridu: 1 sloupec mezera vlevo, obsah 8 sloupců, 1 sloupec vpravo */}
            <Grid container columns={10}>
              <Grid offset={1} size={8}>
                <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', maxWidth: 592, lineHeight: '57px', letterSpacing: '-0.84px', m: '0 auto' }}>{UNI.title}</Typography>
                <Stack sx={{ mt: '65px' }}>
                  {UNI.paragraphs.map((p, i) => (
                    <Fragment key={i}>
                      {i === galleryBeforeIndex && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '24px',
                            my: '48px',
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
                        <Typography sx={{ fontWeight: 700, fontSize: 18, mt: i === 0 ? 0 : '32px' }}>{p}</Typography>
                      ) : (
                        <Typography sx={{ fontSize: 18, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{p}</Typography>
                      )}
                    </Fragment>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </SectionCard>
        </Box>

        <TwoMonthsFreeBanner />
      </Box>

      {/* Kontakt spojený s patičkou do jedné bílé karty (dle XD Desktop_UNI) */}
      <Footer topContent={<ContactBlock />} />
    </Box>
  )
}
