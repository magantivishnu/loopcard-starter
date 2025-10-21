
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import SetupWizard from './routes/SetupWizard'
import Dashboard from './routes/Dashboard'
import PublicCard from './routes/PublicCard'
import Settings from './routes/Settings'

export default function App() {
  return (
    <div className="container py-4">
      <header className="flex items-center justify-between mb-4">
        <Link to="/" className="text-xl font-bold">LoopCard</Link>
        <nav className="flex gap-2 text-sm">
          <Link to="/setup" className="btn">Setup</Link>
          <Link to="/dashboard" className="btn">Dashboard</Link>
          <Link to="/settings" className="btn">Settings</Link>
          <a href="/card/demo" className="btn">Public Card</a>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/setup" replace />} />
        <Route path="/setup" element={<SetupWizard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/card/:slug" element={<PublicCard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}
