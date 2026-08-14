import { cloneElement, useRef } from 'react'
import type { CSSProperties, ReactElement, Ref } from 'react'
import { Box, Snackbar, Stack, Typography } from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'
import { Transition } from 'react-transition-group'

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

// Potvrzovací pop-up laděný do stylu stránky – vpravo nahoře, vyjede zprava a při zavření
// se rozplyne (fade out). Bílá karta, tyrkysový kruh s bílou fajfkou, fialový nadpis.
export default function SuccessPopup({
  open,
  onClose,
  title,
  text,
}: {
  open: boolean
  onClose: () => void
  title: string
  text: string
}) {
  return (
    <Snackbar
      open={open}
      onClose={(_, reason) => { if (reason !== 'clickaway') onClose() }}
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
          gap: '20px',
        }}
      >
        {/* Tyrkysový kruh s bílou fajfkou */}
        <Box sx={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', bgcolor: 'secondary.main', display: 'grid', placeItems: 'center' }}>
          <Box component="svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 24, height: 24 }}>
            <polyline points="20 6 9 17 4 12" />
          </Box>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 18, color: 'primary.main', lineHeight: 1.3 }}>{title}</Typography>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.5, mt: 0.25 }}>{text}</Typography>
        </Box>

        {/* Zavírací × */}
        <Box
          component="button"
          type="button"
          aria-label="Zavřít"
          onClick={onClose}
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
  )
}
