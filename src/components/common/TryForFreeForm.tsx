import { cloneElement, useRef, useState } from 'react'
import type { CSSProperties, ReactElement, Ref } from 'react'
import { Box, Button, InputBase, Snackbar, Stack, Typography } from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'
import { Transition } from 'react-transition-group'
import { TRY_FORM } from '../../data/content'
import { fluid } from '../../theme/fluid'
import { PAGE_PX } from '../../theme/grid'

const POPUP_DURATION = 450

// Podle fáze: vjezd zprava (translateX) + fade-in, odchod = jen fade-out (zůstane na místě).
const POPUP_STATE_STYLES: Record<string, CSSProperties> = {
  entering: { transform: 'translateX(0)', opacity: 1 },
  entered: { transform: 'translateX(0)', opacity: 1 },
  exiting: { transform: 'translateX(0)', opacity: 0 }, // fade out, beze změny pozice
  exited: { transform: 'translateX(110%)', opacity: 0 }, // start mimo obrazovku vpravo
}

// Vlastní přechod pro Snackbar: „plynule vylítne zprava" a při zavření „fade outne".
function PopupTransition(props: TransitionProps & { children: ReactElement<{ ref?: Ref<HTMLElement>; style?: CSSProperties }> }) {
  const { in: inProp, children, onEnter, onEntering, onEntered, onExit, onExiting, onExited } = props
  const nodeRef = useRef<HTMLElement>(null)
  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      timeout={POPUP_DURATION}
      appear
      onEnter={onEnter as never}
      onEntering={onEntering as never}
      onEntered={onEntered as never}
      onExit={onExit as never}
      onExiting={onExiting as never}
      onExited={onExited as never}
    >
      {(state) =>
        cloneElement(children, {
          ref: nodeRef,
          style: {
            transition: `transform ${POPUP_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${POPUP_DURATION}ms ease`,
            willChange: 'transform, opacity',
            ...POPUP_STATE_STYLES[state],
            ...(children.props as { style?: CSSProperties }).style,
          },
        })
      }
    </Transition>
  )
}

// Formulář „Vyzkoušejte to sami – 30 dní zdarma" – JEN VIZUÁL (6 pill polí).
// Není dělaný podle gridu, jen centrovaný; boční margin ≥ 1 sloupec přes PAGE_PX.
// Po „Odeslat" vyjede vpravo nahoře potvrzovací pop-up (Snackbar) laděný do designu stránky.
export default function TryForFreeForm() {
  const [sent, setSent] = useState(false)

  return (
    <Box sx={{ px: PAGE_PX }}>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', mb: fluid(120, 230) }}>
        <Typography variant="h1" sx={{ color: '#fff', maxWidth: '905px' }}>{TRY_FORM.title}</Typography>
        <Typography sx={{ color: '#fff', maxWidth: 796, fontSize: fluid(16, 26), lineHeight: 1.5, mt: fluid(30, 35) }} dangerouslySetInnerHTML={{ __html: TRY_FORM.subtitle }} />
        {/* Přesně 2 sloupce (na mobilu 1) – CSS grid, bez přetékání */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, columnGap: 6, rowGap: { xs: 2, md: 4 }, width: '100%', maxWidth: 700, mt: fluid(40, 60) }}>
          {Array.from({ length: TRY_FORM.fieldsCount }).map((_, i) => (
            <InputBase
              key={i}
              placeholder="*Jméno"
              sx={{
                bgcolor: '#CFBAFF', borderRadius: 999, px: 5, py: 2.5, width: '100%', fontSize: fluid(16, 20),
                '& input::placeholder': { color: '#000', opacity: 1 }, height: '60px'
              }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSent(true)}
          endIcon={<Box component="img" src="/icons/arrow-right.svg" alt="" sx={{ width: fluid(30, 40), height: fluid(30, 40) }} />}
          sx={{ color: '#fff', pl: '30px', pr: '15px', py: 1.5, fontSize: fluid(18, 24), mt: fluid(60, 75), '& .MuiButton-endIcon': { ml: '70px', mr: 0 }, fontWeight: 500 }}
        >
          {TRY_FORM.submit}
        </Button>
      </Stack>

      {/* Potvrzovací pop-up – vpravo nahoře, vyjede zprava a při zavření se rozplyne (fade out) */}
      <Snackbar
        open={sent}
        onClose={(_, reason) => { if (reason !== 'clickaway') setSent(false) }}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        slots={{ transition: PopupTransition }}
        sx={{ maxWidth: 440 }}
      >
        <Stack
          direction="row"
          sx={{
            position: 'relative',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: '28px',
            p: '20px 48px 20px 24px',
            boxShadow: '0 24px 70px rgba(66, 0, 216, 0.28)',
            m: 1,
            gap: '20px'
          }}
        >
          {/* Tyrkysový kruh s bílou fajfkou */}
          <Box sx={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', bgcolor: 'secondary.main', display: 'grid', placeItems: 'center' }}>
            <Box component="svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 24, height: 24 }}>
              <polyline points="20 6 9 17 4 12" />
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 18, color: 'primary.main', lineHeight: 1.3 }}>
              Děkujeme za zájem!
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.5, mt: 0.25 }}>
              Ozveme se vám s bezplatným přístupem na 30 dní.
            </Typography>
          </Box>

          {/* Zavírací × */}
          <Box
            component="button"
            type="button"
            aria-label="Zavřít"
            onClick={() => setSent(false)}
            sx={{
              position: 'absolute', top: 12, right: 16,
              border: 0, bgcolor: 'transparent', cursor: 'pointer',
              fontSize: 20, lineHeight: 1, color: 'text.secondary', p: 0.5,
              '&:hover': { color: 'primary.main' },
            }}
          >
            ×
          </Box>
        </Stack>
      </Snackbar>
    </Box>
  )
}
