import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import PageLayout from './components/layout/PageLayout'
import HomePage from './pages/HomePage'
import CenikPage from './pages/CenikPage'
import KontaktPage from './pages/KontaktPage'

// Dočasné stuby stránek – nahradí je Task 12
const Stub = ({ id, label }: { id: string; label: string }) => (
  <Box data-testid={id} sx={{ color: '#fff', py: 10 }}>{label}</Box>
)

// Definice cest – oddělené, aby šly testovat přes MemoryRouter
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cenik" element={<CenikPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
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
