import { Fragment } from 'react'
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import SectionCard from '../components/common/SectionCard'
import TwoMonthsFreeBanner from '../components/common/TwoMonthsFreeBanner'
import ContactBlock from '../components/common/ContactBlock'
import DecorLines from '../components/common/DecorLines'
import Footer from '../components/layout/Footer'
import GridSection from '../components/layout/GridSection'
import { fluid } from '../theme/fluid'
import { UNI } from '../data/content'
import { useCompanies } from '../hooks/useApi'
import { useImagesReady } from '../hooks/useImagesReady'
import { formatAddress, orderUrl, fillPlaceholders, companyImages } from '../api/companyFill'

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
  const { publicHash } = useParams()
  const { data: companies, loading } = useCompanies()
  const company = publicHash ? companies?.find((c) => c.publicHash === publicHash) : undefined

  // Hodnoty do šablony – prázdné, když provozovna není (holé /faq, /obchodni-podminky jako dnes).
  const fill = {
    companyName: company?.name ?? '',
    address: company ? formatAddress(company.address) : '',
    ico: company?.billingIco ?? '',
    orderUrl: company ? orderUrl(company.publicHash) : '',
  }
  // Galerie jako {src, kind}; u provozovny z API (logo → contain, fotky → cover),
  // jinak statický fallback (vše jako fotky).
  const galleryImages = company
    ? companyImages(company)
    : GALLERY_IMAGES.map((src) => ({ src, kind: 'photo' as const }))

  // Index posledního mezinadpisu – ten se vysází jako běžný text (bez tučného řezu a odsazení)
  const lastHeadingIndex = UNI.paragraphs.reduce((last, p, i) => (isHeading(p) ? i : last), -1)
  // Galerie se vloží před druhý nadpis (za úvodní blok, před „ÚVODNÍ USTANOVENÍ")
  const galleryBeforeIndex = UNI.paragraphs.findIndex((p, i) => i > 0 && isHeading(p))

  // Načítací kolečko: drží se, dokud (1) nedorazí data z API a (2) se nenačtou VŠECHNY obrázky
  // (logo + fotky galerie). Obsah renderujeme i během načítání (skrytý mimo obrazovku), aby se
  // obrázky stihly přednačíst – po odkrytí už nic neposkakuje.
  // Kolečko se drží, dokud nedorazí data z API a nenačtou se všechny obrázky galerie (logo + fotky).
  const uniqueSrcs = Array.from(new Set(galleryImages.map((img) => img.src)))
  const imagesReady = useImagesReady(uniqueSrcs, !loading)
  const ready = !loading && imagesReady

  return (
    <Box data-testid="page-uni">
      {/* Karta s nadpisem a obchodními podmínkami – vlnité čáry prosvítají v okrajích, zarovnaná na grid */}
      <Box sx={{ position: 'relative', mb: '200px' }}>
        <DecorLines sx={{ top: 110 }} />
        <GridSection sx={{ position: 'relative', zIndex: 1 }}>
          <SectionCard sx={{ bgcolor: '#F5F5F5', px: fluid(20, 64), pt: fluid(80, 85), pb: fluid(96, 180) }}>
            {!ready && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 240 }}>
                <CircularProgress aria-label="Načítání" />
              </Box>
            )}
            {/* Obsah renderujeme vždy – dokud není „ready", je skrytý mimo obrazovku (jen aby se
                přednačetly obrázky). Po načtení se odkryje. */}
            <Box
              aria-hidden={ready ? undefined : true}
              sx={ready ? undefined : { position: 'absolute', left: -99999, top: 0, width: '100%', opacity: 0, pointerEvents: 'none' }}
            >
            {/* Obsah na 10sloupcovém gridu: na desktopu odsazený (obsah 8/10), na mobilu i tabletu plná šířka */}
            <Grid container columns={10}>
              <Grid offset={{ xs: 0, lg: 1 }} size={{ xs: 10, lg: 8 }}>
                <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', maxWidth: 592, lineHeight: fluid(22, 57), letterSpacing: '-0.84px', m: '0 auto', fontSize: fluid(18, 42) }}>{UNI.title}</Typography>
                <Stack sx={{ mt: fluid(40, 65) }}>
                  {UNI.paragraphs.map((p, i) => (
                    <Fragment key={i}>
                      {i === galleryBeforeIndex && galleryImages.length > 0 && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: `repeat(${Math.min(galleryImages.length, 3)}, 1fr)` },
                            gap: '24px',
                            my: fluid(32, 48),
                            justifyItems: 'center',
                          }}
                        >
                          {galleryImages.map((img, gi) => (
                            <Box
                              key={gi}
                              component="img"
                              src={img.src}
                              alt=""
                              aria-hidden
                              sx={{
                                width: '100%', maxWidth: 360, aspectRatio: '4 / 3', borderRadius: '20px', display: 'block',
                                // logo celé (contain) na bílém s odsazením; fotky vyplní rám (cover)
                                objectFit: img.kind === 'logo' ? 'contain' : 'cover',
                                ...(img.kind === 'logo' && { bgcolor: '#fff', p: 3 }),
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      {isHeading(p) && i !== lastHeadingIndex ? (
                        <Typography sx={{ fontWeight: 700, fontSize: fluid(14, 18), mt: i === 0 ? 0 : '32px', lineHeight: fluid(20, 30) }}>{fillPlaceholders(p, fill)}</Typography>
                      ) : (
                        <Typography sx={{ fontSize: fluid(14, 18), lineHeight: fluid(20, 30), whiteSpace: 'pre-line' }}>{fillPlaceholders(p, fill)}</Typography>
                      )}
                    </Fragment>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            </Box>
          </SectionCard>
        </GridSection>
      </Box>

      <TwoMonthsFreeBanner />

      {/* Kontakt spojený s patičkou do jedné bílé karty (dle XD Desktop_UNI) */}
      <Footer topContent={<ContactBlock />} />
    </Box >
  )
}
