import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import ScrollToTop from './components/common/ScrollToTop'
import HomePage from './pages/HomePage'
import ProVydejnyPage from './pages/ProVydejnyPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import ContentPage from './pages/ContentPage'
import DynamicPage from './pages/DynamicPage'

// Definice cest – oddělené, aby šly testovat přes MemoryRouter
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pro-vydejny" element={<ProVydejnyPage />} />
        <Route path="/cenik" element={<PricingPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/faq" element={<ContentPage />} />
        <Route path="/obchodni-podminky" element={<ContentPage />} />
        <Route path="/provozovna/:publicHash" element={<ContentPage />} />
        <Route path="/stranka/:slug" element={<DynamicPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}
