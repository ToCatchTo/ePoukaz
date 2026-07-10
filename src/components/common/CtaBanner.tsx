import { Button, Stack, Typography } from '@mui/material'
import SectionCard from './SectionCard'
import { CTA_BANNER } from '../../data/content'

// Spodní CTA banner – bílá karta s fialovým nadpisem a tyrkysovým tlačítkem
export default function CtaBanner() {
  return (
    <SectionCard sx={{ my: 6, textAlign: 'center' }}>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <Typography variant="h2" sx={{ color: 'primary.main' }}>{CTA_BANNER.title}</Typography>
        <Button variant="contained" color="secondary" sx={{ color: '#fff', px: 5, py: 1.5 }}>
          {CTA_BANNER.button}
        </Button>
      </Stack>
    </SectionCard>
  )
}
