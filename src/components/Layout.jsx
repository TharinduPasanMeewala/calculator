import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'

const NAV = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/dataretentionpolicy', label: 'DataRetentionPolicy', icon: '📦' },
  { path: '/auditlog', label: 'AuditLog', icon: '🛒' },
  { path: '/apikey', label: 'ApiKey', icon: '👥' },
  { path: '/exportjob', label: 'ExportJob', icon: '⚙️' },
  { path: '/userpreference', label: 'UserPreference', icon: '📋' },
  { path: '/calculationcache', label: 'CalculationCache', icon: '🔧' },
  { path: '/calculationerror', label: 'CalculationError', icon: '📈' },
  { path: '/calculationhistory', label: 'CalculationHistory', icon: '🏷️' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:hidden flex items-center justify-between bg-gray-900 px-4 py-3">
        <span className="text-white font-bold text-sm">calculator</span>
        <button onClick={() => setOpen(!open)} className="text-gray-300 text-xl">☰</button>
      </div>
      <aside className={`${open ? 'block' : 'hidden'} md:flex md:w-60 bg-gray-900 md:flex-col flex-shrink-0`}>
        <div className="hidden md:block px-5 py-5 border-b border-gray-700/50">
          <h1 className="text-white font-bold text-base truncate">calculator</h1>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {NAV.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
              <span>{item.icon}</span><span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto"><Outlet /></main>
    </div>
  )
}