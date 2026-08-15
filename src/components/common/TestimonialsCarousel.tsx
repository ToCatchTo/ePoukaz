import { useLayoutEffect, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { TESTIMONIALS } from '../../data/content'
import { fluid } from '../../theme/fluid'

// Mobilní varianta recenzí: vodorovný swipe carousel s tečkovým indikátorem.
// (Na desktopu jsou recenze plovoucí karty, viz HeroSection.)
// První kartou má být „Gábina" (dle XD), zbytek v původním pořadí.
const ORDERED = [...TESTIMONIALS].sort((a, b) =>
  a.name === 'Gábina' ? -1 : b.name === 'Gábina' ? 1 : 0,
)

// Nekonečná smyčka: seznam vykreslíme víckrát a scroll držíme v prostřední kopii.
// Repozici (posun o celé sady zpět do středu) provádíme až po zastavení scrollu;
// během setrvačného flingu by kolize s momentum-scrollem a snapem způsobila cukání.
const N = ORDERED.length
const COPIES = 5 // lichý počet kvůli prostřední kopii s bufferem na obě strany
const MID = Math.floor(COPIES / 2) // index prostřední kopie
const LOOP = Array.from({ length: COPIES }, () => ORDERED).flat()

export default function TestimonialsCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  // active = index v rámci celého LOOPu; tečka odpovídá active % N
  const [active, setActive] = useState(MID * N)

  // Index karty nejblíž středu viewportu.
  const nearest = () => {
    const el = ref.current
    if (!el) return MID * N
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
    return best
  }

  // Šířka jedné sady (od začátku 1. karty po tutéž kartu v další kopii).
  const setWidth = () => {
    const el = ref.current
    if (!el) return 0
    const a = el.children[0] as HTMLElement | undefined
    const b = el.children[N] as HTMLElement | undefined
    if (!a || !b) return 0
    return b.offsetLeft - a.offsetLeft
  }

  const centerOffset = (child: HTMLElement) => {
    const el = ref.current!
    return child.offsetLeft - (el.clientWidth - child.clientWidth) / 2
  }

  // Start v prostřední kopii, bez animace.
  useLayoutEffect(() => {
    const el = ref.current
    const child = el?.children[MID * N] as HTMLElement | undefined
    if (el && child) el.scrollLeft = centerOffset(child)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Po zastavení scrollu vrátíme pozici do prostřední kopie. Posun o celé sady je
  // při identickém layoutu vizuálně neviditelný a jen obnoví zásobu karet.
  const normalize = () => {
    const el = ref.current
    if (!el) return
    const w = setWidth()
    if (w <= 0) return
    let best = nearest()
    const mid = MID * N
    while (best < mid) {
      el.scrollLeft += w
      best += N
    }
    while (best >= mid + N) {
      el.scrollLeft -= w
      best -= N
    }
    setActive(best)
  }

  const onScroll = () => {
    // Tečky a překryv (zIndex) aktualizujeme hned, repozici až po zastavení.
    setActive(nearest())
    clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(normalize, 140)
  }

  // Klik na tečku i scrolluje na instanci karty i v aktuální kopii.
  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const base = active - (active % N)
    const child = el.children[base + i] as HTMLElement | undefined
    if (!child) return
    el.scrollTo({ left: centerOffset(child), behavior: 'smooth' })
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
          px: '16%',
          py: 2,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {LOOP.map((t, i) => (
          <Box
            key={i}
            sx={{
              flex: '0 0 78%',
              minWidth: 260,
              scrollSnapAlign: 'center',
              // Karty se lehce překrývají (dle XD), aktivní je navrchu.
              // Uniformní překryv zajišťuje bezešvý přechod mezi kopiemi.
              mr: '-22px',
              position: 'relative',
              zIndex: i === active ? 3 : 1,
              bgcolor: '#fff',
              borderRadius: '56px',
              p: 3,
              textAlign: 'center',
              // Boční stín (záporný spread ho drží u hran) brání slití překrývajících se karet.
              boxShadow: '12px 0 16px -8px rgba(0,0,0,0.22), -12px 0 16px -8px rgba(0,0,0,0.22)',
            }}
          >
            <Box
              component="img"
              src="/icons/stars.svg"
              alt="Hodnocení 5 z 5 hvězdiček"
              sx={{ display: 'block', height: 20, width: 'auto', mx: 'auto', mb: 1 }}
            />
            <Typography sx={{ color: 'primary.main', fontWeight: 400, fontSize: 16 }}>{t.name}</Typography>
            <Typography sx={{ color: '#9A9A9A', fontSize: 13, mb: 1.25 }}>{t.role}</Typography>
            <Typography sx={{ fontSize: 14, lineHeight: '22px', maxWidth: fluid(200, 1000) }}>„{t.quote}"</Typography>
          </Box>
        ))}
      </Box>

      {/* Tečkový indikátor: světlé tečky, aktivní je výraznější. */}
      <Stack direction="row" sx={{ justifyContent: 'center', mt: 1, gap: '20px' }}>
        {ORDERED.map((t, i) => (
          <Box
            key={t.name}
            component="button"
            aria-label={`Recenze ${i + 1}`}
            onClick={() => goTo(i)}
            sx={{
              width: 15,
              height: 15,
              p: 0,
              border: 0,
              borderRadius: '50%',
              cursor: 'pointer',
              bgcolor: '#fff',
              transition: 'background-color 0.2s ease',
              opacity: 0.5,
              '&::after': {
                content: '""',
                display: i === active % N ? 'block' : 'none',
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: '#4200D8',
                opacity: 0.5,
                ml: '3px'
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}
