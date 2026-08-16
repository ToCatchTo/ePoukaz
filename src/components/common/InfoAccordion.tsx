import { useState } from 'react'
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material'
import CircleArrowButton from './CircleArrowButton'
import GridSection from '../layout/GridSection'
import { CARD_R } from '../../theme/layout'
import { fluid } from '../../theme/fluid'

type Item = { title: string; body: string }

// Infobox accordion – vlevo nadpisy (aktivní teal + underline), vpravo (lg+) šedý panel
// s tělem aktivní položky; na mobilu/tabletu se tělo rozbaluje inline.
export default function InfoAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0)

  return (
    <GridSection sx={{ px: '16px' }}>
      <Box sx={{ bgcolor: '#fff', borderRadius: CARD_R, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'stretch', minHeight: { lg: 1240 } }}>
        {/* Levá polovina – accordion nadpisů */}
        <Box sx={{ flexBasis: { lg: '50%' }, maxWidth: { xs: '100%', lg: '50%' }, minWidth: 0, p: { xs: '50px 24px', sm: '108px 76px', lg: '140px 90px', xl: '170px 140px 150px 138px' } }}>
          <Stack divider={<Divider sx={{ borderColor: '#E8E8E8' }} />} spacing={0}>
            {items.map((it, i) => {
              const isOpen = i === open
              return (
                <Box key={it.title + i} onClick={() => setOpen(i)} sx={{ cursor: 'pointer', py: fluid(20, 28), '&:hover .info-title': { textDecoration: 'underline' } }}>
                  <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography className="info-title" variant="h5" sx={{ fontSize: fluid(18, 26), color: isOpen ? 'secondary.main' : '#000', textDecoration: isOpen ? 'underline' : 'none', transition: 'color 0.25s ease' }}>
                      {it.title}
                    </Typography>
                    {/* Desktop: šipka je vždy přítomná (u aktivní zprůhledněná), drží stejné místo,
                        takže se řádky nepřeskládají a levý seznam při přepnutí neposkočí.
                        Mobil/tablet: šipka dolů/nahoru u každé položky. */}
                    <CircleArrowButton
                      onClick={() => setOpen(i)}
                      sx={{ display: { xs: 'none', lg: 'inline-flex' }, opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto', transition: 'opacity 0.25s ease' }}
                    />
                    <CircleArrowButton onClick={() => setOpen(i)} src="/static-icons/arrow-down.svg" rotate={isOpen ? 180 : 0} size={{ xs: 28, sm: 36 }} sx={{ display: { xs: 'inline-flex', lg: 'none' } }} />
                  </Stack>
                  {/* Tělo inline jen na mobilu/tabletu – rozbalí se (Collapse) a text se prolne (fade-in) */}
                  <Box sx={{ display: { lg: 'none' } }}>
                    <Collapse in={isOpen} unmountOnExit timeout={350} easing="cubic-bezier(0.4, 0, 0.2, 1)">
                      <Typography
                        sx={{
                          mt: 2, fontSize: 16, lineHeight: 1.7, whiteSpace: 'pre-line',
                          animation: 'infoStepFadeIn 0.35s ease',
                          '@keyframes infoStepFadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                        }}
                      >
                        {it.body}
                      </Typography>
                    </Collapse>
                  </Box>
                </Box>
              )
            })}
          </Stack>
        </Box>

        {/* Pravá polovina – šedý panel s tělem aktivní položky (jen lg+).
            Klíč {open} prvek při každé změně přemountuje, takže se fade-in animace přehraje znovu. */}
        <Box sx={{ display: { xs: 'none', lg: 'block' }, flexBasis: '50%', maxWidth: '50%', minWidth: 0, bgcolor: '#F5F5F5', p: '170px 138px 150px 71px' }}>
          <Box
            key={open}
            sx={{
              animation: 'infoPanelFade 350ms cubic-bezier(0.4, 0, 0.2, 1)',
              '@keyframes infoPanelFade': {
                from: { opacity: 0, transform: 'translateY(10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            <Typography variant="h5" sx={{ fontSize: 26, color: 'secondary.main', mb: fluid(40, 51) }}>{items[open].title}</Typography>
            <Typography sx={{ fontSize: 18, lineHeight: 1.67, maxWidth: 392, whiteSpace: 'pre-line' }}>{items[open].body}</Typography>
          </Box>
        </Box>
      </Box>
    </GridSection>
  )
}
