import { useEffect } from 'react'
import { Box, Link as MuiLink, Stack } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { scrollToHashOnClick } from '../../utils/scrollToHash'
import MenuToggle from './MenuToggle'
import { fluid } from '../../theme/fluid'
import { PAGE_PX } from '../../theme/grid'

// Mobilní menu: panel vysouvající se shora a při zavření zasunutý zpět nahoru. Panel zůstává
// v DOM kvůli plynulé animaci oběma směry; v zavřeném stavu je mimo obrazovku a skrytý pro
// asistivní technologie (aria-hidden).
export default function MobileMenu({
  open, onClose, links,
}: { open: boolean; onClose: () => void; links: { label: string; to: string }[] }) {
  const { pathname } = useLocation()

  // Zamknout scroll pozadí, dokud je menu otevřené
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Zavřít na Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* Overlay: klikem zavře menu */}
      <Box
        onClick={onClose}
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      />

      {/* Vysouvací obsah: bílý panel s navigací */}
      <Box
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        // Zavřený panel zůstává v DOM kvůli animaci; `inert` ho skryje pro asistivní technologie
        // a hlavně z něj odsune focus (na rozdíl od aria-hidden, které při zaostřeném potomkovi hlásí chybu).
        inert={!open}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          transform: open ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: open ? 'auto' : 'none',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      >
        {/* Bílý panel se zaoblenými spodními rohy */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: '0 0 60px 60px',
            px: PAGE_PX,
            pt: fluid(90, 80),
            pb: '110px'
          }}
        >
          {/* Horní lišta: pill s logem a odznakem, kruhové zavírací tlačítko na místě hamburgeru */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, bgcolor: '#fff', borderRadius: 999, py: 0.75, pl: 2.5, pr: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.30)' }}>
              <Box component="img" src="/images/logo-epoukaz.svg" alt="ePoukaz online" sx={{ height: 11, display: 'block' }} />
              <Box sx={{ bgcolor: 'secondary.main', color: '#fff', borderRadius: 999, px: 2.5, py: 1, fontWeight: 700, fontSize: 14, lineHeight: 1.2, textAlign: 'center' }}>
                30 dní<br />ZDARMA
              </Box>
            </Box>
            <Box sx={{ borderRadius: '50%', boxShadow: '0 4px 24px rgba(0,0,0,0.30)' }}>
              <MenuToggle open onClick={onClose} />
            </Box>
          </Box>

          {/* Navigace */}
          <Stack spacing={5.5} sx={{ mt: '94px', pl: 4 }}>
            {links.map((l) => {
              const active = l.to === pathname
              return (
                <MuiLink
                  key={l.label}
                  component={RouterLink}
                  to={l.to}
                  onClick={() => { onClose(); scrollToHashOnClick(l.to, pathname) }}
                  tabIndex={open ? 0 : -1}
                  underline="none"
                  sx={{ fontWeight: 700, fontSize: 24, color: active ? 'primary.main' : '#000', '&:hover': { color: 'primary.main' } }}
                >
                  {l.label}
                </MuiLink>
              )
            })}
          </Stack>
        </Box>
      </Box>
    </>
  )
}
