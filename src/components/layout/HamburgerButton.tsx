import { Box, IconButton } from '@mui/material'

// Kruhové bílé tlačítko hamburgeru dle XD (ikona public/icons/hamburger.svg –
// bílý kruh se stínem a vlevo zarovnané „bars-sort" proužky s klesající délkou).
// Otevírá mobilní menu; zavírací „×" v otevřeném menu řeší MenuToggle.
export default function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <IconButton
      aria-label="Otevřít menu"
      aria-expanded={open}
      onClick={onClick}
      sx={{ p: 0, flexShrink: 0, '&:hover': { opacity: 0.9 } }}
    >
      <Box
        component="img"
        src="/icons/hamburger.svg"
        alt=""
        sx={{ width: 73, height: 73, display: 'block' }}
      />
    </IconButton>
  )
}
