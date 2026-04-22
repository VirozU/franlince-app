import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import UploadPage from './pages/UploadPage'
import CatalogPage from './pages/CatalogPage'
import StatsPage from './pages/StatsPage'
import SearchPage from './pages/SearchPage'
import PaintingDetailPage from './pages/PaintingDetailPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<PaintingDetailPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Layout>
  )
}

export default App
