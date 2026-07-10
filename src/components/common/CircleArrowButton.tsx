import { IconButton } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Tyrkysové kulaté tlačítko se šipkou (accordion, CTA)
export default function CircleArrowButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{ bgcolor: 'secondary.main', color: '#fff', '&:hover': { bgcolor: 'secondary.dark' } }}
    >
      <ArrowForwardIcon />
    </IconButton>
  )
}
