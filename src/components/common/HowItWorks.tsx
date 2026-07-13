import { useState } from 'react'
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material'
import CircleArrowButton from './CircleArrowButton'
import { CARD_R } from '../../theme/layout'
import { HOW_STEPS } from '../../data/content'

// TODO: až budou dodány, každý krok bude mít vlastní obrázek.
// Zatím placeholder (ruka s telefonem) pro všechny kroky.
const STEP_IMAGES = HOW_STEPS.map(() => '/images/howitworks-phone.png')

// Sekce „Jak to funguje" – vlevo accordion 8 kroků (vždy právě jeden otevřený),
// vpravo obrázek přes celou výšku karty, který se mění podle otevřeného kroku.
export default function HowItWorks() {
  const [open, setOpen] = useState(0)

  return (
    <Box
      id="jak-to-funguje"
      sx={{
        bgcolor: '#fff',
        borderRadius: CARD_R,
        overflow: 'hidden', // ořízne obrázek do zaoblených rohů karty
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch', // obě poloviny stejně vysoké
        // Pevná výška karty = jako v nejvyšším stavu (nejdelší krok otevřený).
        // Díky tomu se při přepínání kroků NEMĚNÍ výška karty → pravý obrázek se nepřeškáluje
        // a sekce pod kartou neposkakuje. Roztahuje se plynule jen popisek uvnitř.
        // (tunable – kdyby se texty kroků prodloužily, hodnotu zvyš)
        minHeight: { md: 1240 },
      }}
    >
      {/* Levá polovina – accordion kroků (přesně 50 % šířky, nadpisy se zalamují) */}
      <Box sx={{ flexBasis: { xs: 'auto', md: '50%' }, maxWidth: { xs: '100%', md: '50%' }, minWidth: 0, flexGrow: 0, flexShrink: 1, p: { xs: 4, md: '170px 90px 150px 140px' } }}>
        <Stack divider={<Divider sx={{ borderColor: '#E8E8E8' }} />} spacing={0}>
          {HOW_STEPS.map((s, i) => {
            const isOpen = i === open
            return (
              <Box
                key={s.title}
                onClick={() => setOpen(i)}
                sx={{ cursor: 'pointer', py: 4, '&:hover .step-title': { textDecoration: 'underline' } }}
              >
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography className="step-title" variant="h5" sx={{ textDecoration: isOpen ? 'underline' : 'none', maxWidth: '374px' }}>
                    {s.title}
                  </Typography>
                  {/* šipka jen u zavřených kroků */}
                  {!isOpen && <CircleArrowButton onClick={() => setOpen(i)} />}
                </Stack>
                <Collapse in={isOpen} unmountOnExit timeout={350} easing="cubic-bezier(0.4, 0, 0.2, 1)">
                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: '#000',
                      maxWidth: '392px',
                      // jemný fade-in textu při rozbalení, ať se neobjeví skokem
                      animation: 'howStepFadeIn 0.35s ease',
                      '@keyframes howStepFadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                      '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                    }}
                  >
                    {s.text}
                  </Typography>
                </Collapse>
              </Box>
            )
          })}
        </Stack>
      </Box>

      {/* Pravá polovina – obrázek přes celou výšku (přesně 50 % šířky, mění se podle otevřeného kroku) */}
      <Box sx={{ flexBasis: { xs: 'auto', md: '50%' }, maxWidth: { xs: '100%', md: '50%' }, minWidth: 0, flexGrow: 1, flexShrink: 1, position: 'relative', bgcolor: '#F3EEF9', minHeight: { xs: 360, md: 'auto' } }}>
        <Box
          component="img"
          src={STEP_IMAGES[open]}
          alt="Ukázka aplikace ePoukaz online v telefonu"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </Box>
    </Box>
  )
}
