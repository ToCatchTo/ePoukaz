import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import PageLayout from './components/layout/PageLayout'

// Dočasné stuby stránek – nahradí je Tasky 9–12
const Stub = ({ id, label }: { id: string; label: string }) => (
  <Box data-testid={id} sx={{ color: '#fff', py: 10 }}>{label}</Box>
)

// Definice cest – oddělené, aby šly testovat přes MemoryRouter
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Stub id="page-home" label="Home" />} />
        <Route path="/cenik" element={<Stub id="page-cenik" label="Ceník" />} />
        <Route path="/kontakt" element={<Stub id="page-kontakt" label="Kontakt" />} />
        <Route path="/obchodni-podminky" element={<Stub id="page-uni" label="UNI" />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
