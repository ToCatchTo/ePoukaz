import { useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { TESTIMONIALS } from '../../data/content'

// Mobilní varianta recenzí – vodorovný „swipe" carousel s tečkovým indikátorem.
// (Na desktopu se recenze zobrazují jako plovoucí karty kolem ruky – viz HeroSection.)
// V carouselu chceme jako první kartu „Gábina" (dle XD), zbytek v původním pořadí
const ORDERED = [...TESTIMONIALS].sort((a, b) =>
  a.name === 'Gábina' ? -1 : b.name === 'Gábina' ? 1 : 0,
)

export default function TestimonialsCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = ref.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(el.children).forEach((c, i) => {
      const child = c as HTMLElement
      const cc = child.offsetLeft + child.clientWidth / 2
      const d = Math.abs(cc - center)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    setActive(best)
  }

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const child = el.children[i] as HTMLElement | undefined
    if (!child) return
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: 'smooth' })
  }

  return (
    <Box>
      <Box
        ref={ref}
        onScroll={onScroll}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          px: '11%',
          py: 2,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {ORDERED.map((t, i) => (
          <Box
            key={t.name}
            sx={{
              flex: '0 0 78%',
              minWidth: 260,
              scrollSnapAlign: 'center',
              // Karty se lehce překrývají (dle XD); aktivní je navrchu
              mr: i === ORDERED.length - 1 ? 0 : '-22px',
              position: 'relative',
              zIndex: i === active ? 3 : 1,
              bgcolor: '#fff',
              borderRadius: '56px',
              p: 3,
              textAlign: 'center',
              // Stín po stranách (záporný spread ho drží u hran), aby se překrývající karty neslévaly
              boxShadow: '12px 0 16px -8px rgba(0,0,0,0.22), -12px 0 16px -8px rgba(0,0,0,0.22)',
            }}
          >
            <Box
              component="img"
              src="/icons/stars.svg"
              alt="Hodnocení 5 z 5 hvězdiček"
              sx={{ display: 'block', height: 20, width: 'auto', mx: 'auto', mb: 1 }}
            />
            <Typography sx={{ color: 'primary.main', fontWeight: 400, fontSize: 18 }}>{t.name}</Typography>
            <Typography sx={{ color: '#9A9A9A', fontSize: 13, mb: 1.25 }}>{t.role}</Typography>
            <Typography sx={{ fontSize: 15, lineHeight: 1.5 }}>„{t.quote}"</Typography>
          </Box>
        ))}
      </Box>

      {/* Tečkový indikátor – jemné světlé tečky dle XD (aktivní o něco výraznější) */}
      <Stack direction="row" spacing={3} sx={{ justifyContent: 'center', mt: 3 }}>
        {ORDERED.map((t, i) => (
          <Box
            key={t.name}
            component="button"
            aria-label={`Recenze ${i + 1}`}
            onClick={() => goTo(i)}
            sx={{
              width: 9,
              height: 9,
              p: 0,
              border: 0,
              borderRadius: '50%',
              cursor: 'pointer',
              bgcolor: i === active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
              transition: 'background-color 0.2s ease',
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}
