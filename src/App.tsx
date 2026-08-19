import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'
import PageLayout from './components/layout/PageLayout'
import ScrollToTop from './components/common/ScrollToTop'
import { HOW_IT_WORKS, ABOUT_EPOUKAZ } from './data/content'

const HomePage = lazy(() => import('./pages/HomePage'))
const ForDistributorsPage = lazy(() => import('./pages/ForDistributorsPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ContentPage = lazy(() => import('./pages/ContentPage'))
const DynamicPage = lazy(() => import('./pages/DynamicPage'))
const InfoPage = lazy(() => import('./pages/InfoPage'))

// Definice cest oddělená od App, aby šla testovat přes MemoryRouter
export function AppRoutes() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}><CircularProgress aria-label="Načítání" /></Box>}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pro-vydejny" element={<ForDistributorsPage />} />
          <Route path="/cenik" element={<PricingPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/faq" element={<ContentPage title="Časté dotazy" />} />
          <Route path="/obchodni-podminky" element={<ContentPage title="Obchodní podmínky" />} />
          <Route path="/provozovna/:publicHash" element={<ContentPage />} />
          <Route path="/stranka/:slug" element={<DynamicPage />} />
          <Route path="/jak-to-funguje" element={<InfoPage data={HOW_IT_WORKS} path="/jak-to-funguje" />} />
          <Route path="/vse-o-epoukazu" element={<InfoPage data={ABOUT_EPOUKAZ} path="/vse-o-epoukazu" />} />
        </Route>
      </Routes>
    </Suspense>
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
