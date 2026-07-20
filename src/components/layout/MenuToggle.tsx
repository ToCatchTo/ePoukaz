import { Box, IconButton } from '@mui/material'

// Kruhové bílé tlačítko se třemi proužky, které se při otevření plynule přetočí do „×".
// Slouží jako hamburger v hlavičce i jako zavírací tlačítko v otevřeném menu (stejné místo → efekt morphu).
export default function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  const bar = {
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    width: 22,
    height: 2,
    borderRadius: '50%',
    bgcolor: '#000',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  }
  return (
    <IconButton
      onClick={onClick}
      aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
      aria-expanded={open}
      sx={{ width: 56, height: 56, bgcolor: '#fff', flexShrink: 0, '&:hover': { bgcolor: '#f2f2f2' } }}
    >
      <Box sx={{ position: 'relative', width: 22, height: 16 }}>
        <Box sx={{ ...bar, transform: open ? 'translate(-50%, -50%) rotate(45deg)' : 'translate(-50%, -50%) translateY(-7px)' }} />
        <Box sx={{ ...bar, transform: 'translate(-50%, -50%)', opacity: open ? 0 : 1 }} />
        <Box sx={{ ...bar, transform: open ? 'translate(-50%, -50%) rotate(-45deg)' : 'translate(-50%, -50%) translateY(7px)' }} />
      </Box>
    </IconButton>
  )
}
