import { Box, InputBase } from '@mui/material'
import { fluid } from '../../theme/fluid'

type Props = { value: string; onChange: (v: string) => void; placeholder: string }

// Bílý zaoblený vyhledávací input (pill) s lupou vlevo a mazacím křížkem vpravo (jen když je text).
export default function SearchField({ value, onChange, placeholder }: Props) {
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', gap: fluid(16, 38),
        bgcolor: '#fff', border: '1px solid #707070', borderRadius: 999,
        boxShadow: 'inset 0px 8px 10px #00000029',
        px: fluid(20, 34), height: fluid(64, 100), width: '100%',
      }}
    >
      <Box component="img" src="/icons/search.svg" alt="" aria-hidden sx={{ width: fluid(28, 44), flexShrink: 0 }} />
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        inputProps={{ 'aria-label': 'Hledat výdejnu' }}
        sx={{ fontSize: fluid(16, 26), letterSpacing: '0.52px', color: '#000', '& input::placeholder': { color: '#939393', opacity: 1 } }}
      />
      {value && (
        <Box
          component="button"
          type="button"
          aria-label="Vymazat"
          onClick={() => onChange('')}
          sx={{ border: 0, bgcolor: 'transparent', cursor: 'pointer', p: 0, flexShrink: 0, display: 'inline-flex' }}
        >
          <Box component="img" src="/icons/Menu_closed.svg" alt="" aria-hidden sx={{ width: fluid(36, 60) }} />
        </Box>
      )}
    </Box>
  )
}
