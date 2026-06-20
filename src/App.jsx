import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import LeadsPage from './pages/LeadsPage'
import AddLeadPage from './pages/AddLeadPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen" style={{ background: '#f0f2f5' }}>
        <Sidebar />
        <main className="flex-1 ml-48 p-6 min-h-screen overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/leads/add" element={<AddLeadPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
