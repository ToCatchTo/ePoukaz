import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import SearchField from '../components/common/SearchField'
import SearchResults from '../components/common/SearchResults'
import VydejnaCtaFooter from '../components/common/VydejnaCtaFooter'
import GridSection from '../components/layout/GridSection'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useCompaniesSearch } from '../hooks/useApi'
import { SEARCH } from '../data/content'
import { fluid } from '../theme/fluid'

// Úvodní stránka – vyhledávání provozoven. Prázdný dotaz nezobrazuje panel (dle Desktop_1).
export default function HomePage() {
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 300)
  const { data, loading, error } = useCompaniesSearch(debounced)
  const showPanel = debounced.trim().length > 0

  return (
    <Box data-testid="page-home">
      <GridSection>
        <Stack spacing={fluid(32, 50)} sx={{ alignItems: 'center', textAlign: 'center', mt: fluid(60, 139) }}>
          <Typography variant="h1" sx={{ color: '#fff', maxWidth: 720, fontSize: { xs: 30, sm: 36, md: 42 }, lineHeight: 1.2 }}>{SEARCH.h1}</Typography>
          <Typography sx={{ color: '#fff', fontSize: fluid(16, 20), maxWidth: 812 }}>{SEARCH.perex}</Typography>
          <Box sx={{ width: '100%', maxWidth: 1088 }}>
            <SearchField value={query} onChange={setQuery} placeholder={SEARCH.placeholder} placeholderShort={SEARCH.placeholderShort} />
          </Box>
          {showPanel && (
            <Box sx={{ width: '100%', mt: fluid(20, 20) }}>
              <SearchResults loading={loading} error={error} companies={data ?? []} />
            </Box>
          )}
        </Stack>
      </GridSection>

      <Box sx={{ mt: fluid(200, 400) }}>
        <VydejnaCtaFooter />
      </Box>
    </Box>
  )
}
