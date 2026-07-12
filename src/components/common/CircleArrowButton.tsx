import { Box, IconButton } from '@mui/material'

// Kulaté tlačítko se šipkou pro kroky „Jak to funguje" (ikona z návrhu)
export default function CircleArrowButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton onClick={onClick} sx={{ p: 0 }}>
      <Box component="img" src="/icons/Arrow_how_R.svg" alt="" sx={{ width: 42, height: 42, display: 'block' }} />
    </IconButton>
  )
}
