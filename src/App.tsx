import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import ContentPage from './pages/ContentPage'

// Definice cest – oddělené, aby šly testovat přes MemoryRouter
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cenik" element={<PricingPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/faq" element={<ContentPage />} />
        <Route path="/obchodni-podminky" element={<ContentPage />} />
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
