import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import HomePage from './pages/HomePage'
import CenikPage from './pages/CenikPage'
import KontaktPage from './pages/KontaktPage'
import UniPage from './pages/UniPage'

// Definice cest – oddělené, aby šly testovat přes MemoryRouter
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cenik" element={<CenikPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
        <Route path="/faq" element={<UniPage />} />
        <Route path="/obchodni-podminky" element={<UniPage />} />
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
