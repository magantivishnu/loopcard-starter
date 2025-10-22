import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Home from '@/routes/Home'
import Login from '@/routes/Login'
import SetupWizard from '@/routes/SetupWizard'
import Dashboard from '@/routes/Dashboard'
import PublicCard from '@/routes/PublicCard'
import Settings from '@/routes/Settings'
import { AuthProvider, useAuth } from '@/auth/AuthProvider'
import ProtectedRoute from '@/auth/ProtectedRoute'

function Header() {
  const loc = useLocation()
  const hideOn = ['/card/'] // hide header on public card view
  const isHidden = hideOn.some((p) => loc.pathname.startsWith(p))
  const { user, signOut } = useAuth()

  if (isHidden) return null

  return (
    <header className="flex items-center justify-between mb-4">
      <Link to="/" className="text-xl font-bold">LoopCard</Link>
      <nav className="flex gap-2 text-sm items-center">
        <Link to="/" className="btn">Home</Link>
        <Link to="/setup" className="btn">Create Card</Link>
        <Link to="/dashboard" className="btn">Dashboard</Link>
        <Link to="/settings" className="btn">Settings</Link>
        {user ? (
          <>
            <span className="hidden sm:inline text-sm text-gray-600">{user.email}</span>
            <button className="btn" onClick={signOut}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="mobile-shell">
        <div className="mobile-device">
          <div className="container mobile-safe">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/setup" element={<SetupWizard />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/card/:slug" element={<PublicCard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
