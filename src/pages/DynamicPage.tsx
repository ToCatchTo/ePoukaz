import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { usePage } from '../hooks/useApi'
import DecorLines from '../components/common/DecorLines'
import SectionCard from '../components/common/SectionCard'
import GridSection from '../components/layout/GridSection'
import Footer from '../components/layout/Footer'
import ContactBlock from '../components/common/ContactBlock'
import { fluid } from '../theme/fluid'

// Dynamická podstránka z API (pages/{slug}) – nadpis + HTML obsah + galerie.
export default function DynamicPage() {
  const { slug = '' } = useParams()
  const { data, loading, error } = usePage(slug)

  return (
    <Box data-testid="page-dynamic">
      <Box sx={{ position: 'relative', mb: '200px' }}>
        <DecorLines sx={{ top: 110 }} />
        <GridSection sx={{ position: 'relative', zIndex: 1 }}>
          <SectionCard sx={{ bgcolor: '#F5F5F5', px: fluid(20, 64), pt: fluid(80, 85), pb: fluid(96, 180) }}>
            {loading && <Typography sx={{ textAlign: 'center' }}>Načítám…</Typography>}
            {!loading && error && (
              <Typography sx={{ textAlign: 'center' }}>Stránka nenalezena.</Typography>
            )}
            {!loading && !error && data && (
              <>
                <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', lineHeight: fluid(22, 57), letterSpacing: '-0.84px', fontSize: fluid(18, 42) }}>
                  {data.title}
                </Typography>
                {/* content je hotové HTML z našeho interního CMS (důvěryhodný zdroj), proto se
                    vykresluje přímo. Pokud by obsah někdy pocházel od uživatelů, je nutné ho
                    nejdřív sanitizovat (např. DOMPurify). */}
                <Box
                  sx={{ fontSize: fluid(14, 18), lineHeight: fluid(20, 30), '& img': { maxWidth: '100%', borderRadius: '20px' } }}
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
                {data.gallery.length > 0 && (
                  <Box data-testid="page-gallery" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: '24px', mt: fluid(32, 48) }}>
                    {data.gallery.map((src, i) => (
                      <Box key={i} component="img" src={src} alt="" sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
                    ))}
                  </Box>
                )}
              </>
            )}
          </SectionCard>
        </GridSection>
      </Box>
      <Footer topContent={<ContactBlock />} />
    </Box>
  )
}
