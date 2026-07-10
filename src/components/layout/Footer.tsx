import { Box, Grid, Typography } from '@mui/material'
import { FOOTER } from '../../data/content'

// Patička – bílá karta se 4 sloupci (firma + 3 sloupce odkazů) a kreditem
export default function Footer() {
  return (
    <>
      <Box sx={{ bgcolor: '#fff', borderRadius: 6, px: 6, py: 5, mt: 6 }}>
        <Grid container spacing={4}>
          {/* Firma */}
          <Grid size={4}>
            <Typography sx={{ fontSize: 22, mb: 2 }}>
              <b>ePoukaz</b><span style={{ color: '#939393' }}>online</span>
            </Typography>
            {FOOTER.company.map((line) => (
              <Typography key={line} sx={{ fontSize: 14, color: '#000' }}>{line}</Typography>
            ))}
          </Grid>
          {/* 3 sloupce odkazů */}
          {FOOTER.columns.map((col) => (
            <Grid size={2.66} key={col.title}>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>{col.title}</Typography>
              {col.links.map((link) => (
                <Typography key={link} sx={{ fontSize: 14, color: '#000', mb: 0.5 }}>{link}</Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Typography sx={{ textAlign: 'center', fontSize: 14, color: '#000', mt: 4 }}>
          {FOOTER.copyright}
        </Typography>
      </Box>
      {/* Kredit agentury */}
      <Typography sx={{ textAlign: 'center', color: '#fff', fontWeight: 700, mt: 3 }}>
        {FOOTER.credit}
      </Typography>
    </>
  )
}
