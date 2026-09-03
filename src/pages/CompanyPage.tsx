import { Box, Button, CircularProgress, Grid, Link, Stack, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import SectionCard from '../components/common/SectionCard'
import GridSection from '../components/layout/GridSection'
import { fluid } from '../theme/fluid'
import { CARD_R } from '../theme/layout'
import { useCompany } from '../hooks/useApi'
import { useImagesReady } from '../hooks/useImagesReady'
import { Seo } from '../components/common/Seo'
import { SEO } from '../data/seo'
import { companyImages, formatZip } from '../api/companyFill'

// Poloměr zaoblení fotek a mapy dle XD (desktop 110 px, na mobilu jemnější).
const MEDIA_R = fluid(28, 110)

// Nadpis sloupce v hlavičce („Adresa prodejny", „Kontaktní údaje") – černý, tučný, 20 px, mb 10 px dle XD.
function ColumnHeading({ children }: { children: string }) {
  return (
    <Typography sx={{ fontWeight: 700, color: '#000', fontSize: fluid(15, 20), lineHeight: 1.5, mb: '10px' }}>
      {children}
    </Typography>
  )
}

// Detailní stránka provozovny (/provozovna/:publicHash) dle XD „detail prodejny":
// bílá karta na 10 sloupců (GridSection „content"), uvnitř obsah na 8 sloupcích
// (1 sloupec mezera z každé strany) – Zpět, hlavička logo | adresa | kontakt
// (svislé fialové linky), fotky z API pod sebou a mapa s pinem podle adresy.
export default function CompanyPage() {
  const { publicHash } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { data: company, loading, error } = useCompany(publicHash)
  const notFound = Boolean(error)

  // Fotky provozovny (exteriér, interiér, …) – logo se do stacku nedává, patří do hlavičky.
  const photos = company ? companyImages(company).filter((img) => img.kind === 'photo') : []
  // Telefony: přednostně seznam publicPhones, jinak jediný publicPhone (může chybět úplně).
  const phones = company
    ? (company.publicPhones.length ? company.publicPhones : company.publicPhone ? [company.publicPhone] : [])
    : []
  const street = company?.address.street ?? ''
  const cityZip = company ? [formatZip(company.address.zip), company.address.city].filter(Boolean).join(' ') : ''
  // Dotaz do mapy: název + adresa, ať pin sedí co nejlíp.
  const mapQuery = company ? [company.name, street, cityZip].filter(Boolean).join(', ') : ''

  // Spinner drží, dokud nedorazí data i všechny fotky (ať po odkrytí nic neposkakuje).
  const imagesReady = useImagesReady(photos.map((p) => p.src), !loading)
  const ready = !loading && imagesReady

  // Svislá fialová dělící linka mezi sloupci hlavičky – 200 px, opacity 10 %, jen desktop.
  const divider = (
    <Box aria-hidden sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0, width: '2px', height: '200px', bgcolor: 'primary.main', opacity: 0.1, mx: fluid(24, 44) }} />
  )

  return (
    <Box data-testid="page-company">
      <Seo
        path={location.pathname}
        title={company?.name}
        description={SEO[location.pathname]?.description ?? (company?.name ? `${company.name} – ePoukaz online.` : 'ePoukaz online.')}
      />
      <GridSection variant="content" sx={{ pt: fluid(24, 48), pb: fluid(40, 96) }}>
        <SectionCard sx={{ bgcolor: '#fff', borderRadius: CARD_R, px: 0, py: fluid(32, 74) }}>
          {/* Obsah karty na 8 z 10 sloupců (1 sloupec mezera z každé strany); na mobilu plná šířka */}
          <Grid container columns={10}>
            <Grid size={{ xs: 10, md: 8 }} offset={{ xs: 0, md: 1 }} sx={{ px: { xs: '32px', md: 0 } }}>
              {notFound ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 240 }}>
                  <Typography sx={{ textAlign: 'center', fontSize: fluid(16, 20) }}>
                    Provozovnu se nepodařilo načíst.
                  </Typography>
                </Box>
              ) : (
                <>
                  {!ready && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 240 }}>
                      <CircularProgress aria-label="Načítání" />
                    </Box>
                  )}
                  {/* Obsah se renderuje vždy – dokud není „ready", je skrytý mimo obrazovku (přednačtení
                      fotek); po načtení se odkryje, takže nic neposkakuje. */}
                  <Box
                    aria-hidden={ready ? undefined : true}
                    sx={ready ? undefined : { position: 'absolute', left: -99999, top: 0, width: '100%', opacity: 0, pointerEvents: 'none' }}
                  >
                    {/* Zpět – tyrkysový pill s bílou kolečkovou šipkou (uvnitř karty vlevo nahoře) */}
                    <Button
                      onClick={() => navigate(-1)}
                      color="secondary"
                      variant="contained"
                      startIcon={
                        <Box component="img" alt="Zpět" src="/static-icons/arrow-right.svg" sx={{ width: { xs: 34, md: 43 }, height: { xs: 34, md: 43 }, borderRadius: '50%', display: 'grid', placeItems: 'center', rotate: '180deg', mr: { xs: '18px', md: '30px' } }} />
                      }
                      sx={{ color: '#fff', mb: fluid(28, 60), p: { xs: '5px 30px 5px 8px', md: '7px 45px 7px 12px' }, fontSize: { xs: '15px', md: fluid(16, 18) }, fontWeight: 500 }}
                    >
                      Zpět
                    </Button>

                    {/* Hlavička: logo | adresa | kontakt. Desktop 3 sloupce se svislými fialovými
                        linkami, na mobilu se skládají pod sebe. */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, gap: { xs: fluid(24, 32), md: 0 } }}>
                      <Box sx={{ flex: { md: 1 }, minWidth: 0, display: 'flex', alignItems: 'center' }}>
                        {company?.logo && (
                          <Box
                            component="img"
                            src={company.logo}
                            alt={company.name}
                            loading="lazy"
                            sx={{ maxWidth: '100%', maxHeight: fluid(64, 76), objectFit: 'contain', objectPosition: 'left center', display: 'block' }}
                          />
                        )}
                      </Box>
                      {divider}
                      <Box sx={{ flex: { md: 1 }, minWidth: 0 }}>
                        <ColumnHeading>Adresa prodejny</ColumnHeading>
                        {company?.name && <Typography sx={{ fontSize: fluid(15, 20), color: '#000', lineHeight: '25px' }}>{company.name}</Typography>}
                        {street && <Typography sx={{ fontSize: fluid(15, 20), color: '#000', lineHeight: '25px' }}>{street}{cityZip ? ',' : ''}</Typography>}
                        {cityZip && <Typography sx={{ fontSize: fluid(15, 20), color: '#000', lineHeight: '25px' }}>{cityZip}</Typography>}
                      </Box>
                      {divider}
                      <Box sx={{ flex: { md: 1 }, minWidth: 0 }}>
                        <ColumnHeading>Kontaktní údaje</ColumnHeading>
                        {company?.publicEmail && (
                          <Typography sx={{ fontSize: fluid(15, 20), color: '#000', lineHeight: '30px', overflowWrap: 'anywhere' }}>
                            <Link href={`mailto:${company.publicEmail}`} underline="hover" color="inherit">{company.publicEmail}</Link>
                          </Typography>
                        )}
                        {phones.map((phone) => (
                          <Typography key={phone} sx={{ fontSize: fluid(15, 20), color: '#000', lineHeight: '30px' }}>
                            <Link href={`tel:${phone.replace(/\s+/g, '')}`} underline="hover" color="inherit">{phone}</Link>
                          </Typography>
                        ))}
                      </Box>
                    </Box>

                    {/* Fotky z API pod sebou (poměr 3:2, výrazně zaoblené rohy dle XD) */}
                    {photos.length > 0 && (
                      <Stack data-testid="company-photos" spacing={fluid(24, 56)} sx={{ mt: fluid(32, 72) }}>
                        {photos.map((img, i) => (
                          <Box
                            key={img.src}
                            component="img"
                            src={img.src}
                            alt={`${company?.name ?? 'Provozovna'} – fotografie ${i + 1}`}
                            loading="lazy"
                            sx={{ width: '100%', aspectRatio: '1088 / 724', objectFit: 'cover', borderRadius: MEDIA_R, display: 'block' }}
                          />
                        ))}
                      </Stack>
                    )}

                    {/* Mapa s pinem podle adresy – Google Maps embed bez klíče */}
                    {mapQuery && (
                      <Box
                        component="iframe"
                        title="Mapa provozovny"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        sx={{ width: '100%', aspectRatio: '1088 / 432', minHeight: 220, border: 0, borderRadius: MEDIA_R, display: 'block', mt: fluid(24, 56) }}
                      />
                    )}
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </SectionCard>
      </GridSection>
    </Box>
  )
}
