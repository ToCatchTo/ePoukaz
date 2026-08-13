import { useState } from 'react'
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material'
import CircleArrowButton from './CircleArrowButton'
import GridSection from '../layout/GridSection'
import { CARD_R } from '../../theme/layout'
import { fluid } from '../../theme/fluid'

type Item = { title: string; body: string }

// Infobox accordion – vlevo nadpisy (aktivní teal + underline), vpravo (lg+) šedý panel
// s tělem aktivní položky; na mobilu/tabletu se tělo rozbaluje inline (vzor HowItWorks).
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
                <Box key={it.title + i} onClick={() => setOpen(i)} sx={{ cursor: 'pointer', py: fluid(20, 28) }}>
                  <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontSize: fluid(18, 26), color: isOpen ? 'secondary.main' : '#000', textDecoration: isOpen ? 'underline' : 'none' }}>
                      {it.title}
                    </Typography>
                    {/* Desktop: šipka jen u zavřených; mobil: šipka dolů/nahoru */}
                    {!isOpen && <CircleArrowButton onClick={() => setOpen(i)} sx={{ display: { xs: 'none', lg: 'inline-flex' } }} />}
                    <CircleArrowButton onClick={() => setOpen(i)} src="/icons/arrow-down.svg" rotate={isOpen ? 180 : 0} size={{ xs: 28, sm: 36 }} sx={{ display: { xs: 'inline-flex', lg: 'none' } }} />
                  </Stack>
                  {/* Tělo inline jen na mobilu/tabletu */}
                  <Box sx={{ display: { lg: 'none' } }}>
                    <Collapse in={isOpen} unmountOnExit timeout={350} easing="cubic-bezier(0.4, 0, 0.2, 1)">
                      <Typography sx={{ mt: 2, fontSize: 16, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{it.body}</Typography>
                    </Collapse>
                  </Box>
                </Box>
              )
            })}
          </Stack>
        </Box>

        {/* Pravá polovina – šedý panel s tělem aktivní položky (jen lg+) */}
        <Box sx={{ display: { xs: 'none', lg: 'block' }, flexBasis: '50%', maxWidth: '50%', minWidth: 0, bgcolor: '#F5F5F5', p: '170px 138px 150px 71px' }}>
          <Typography variant="h5" sx={{ fontSize: 26, color: 'secondary.main', mb: fluid(40, 51) }}>{items[open].title}</Typography>
          <Typography sx={{ fontSize: 18, lineHeight: 1.67, maxWidth: 392, whiteSpace: 'pre-line' }}>{items[open].body}</Typography>
        </Box>
      </Box>
    </GridSection>
  )
}
