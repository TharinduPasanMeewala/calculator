import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import DataRetentionPolicyPage from './pages/DataRetentionPolicy.jsx'
import AuditLogPage from './pages/AuditLog.jsx'
import ApiKeyPage from './pages/ApiKey.jsx'
import ExportJobPage from './pages/ExportJob.jsx'
import UserPreferencePage from './pages/UserPreference.jsx'
import CalculationCachePage from './pages/CalculationCache.jsx'
import ApplicationSettingsPage from './pages/ApplicationSettings.jsx'
import UserFeedbackPage from './pages/UserFeedback.jsx'
import PerformanceScalabilityReportPage from './pages/PerformanceScalabilityReport.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dataretentionpolicy" element={<DataRetentionPolicyPage />} />
          <Route path="/auditlog" element={<AuditLogPage />} />
          <Route path="/apikey" element={<ApiKeyPage />} />
          <Route path="/exportjob" element={<ExportJobPage />} />
          <Route path="/userpreference" element={<UserPreferencePage />} />
          <Route path="/calculationcache" element={<CalculationCachePage />} />
          <Route path="/settings" element={<ApplicationSettingsPage />} />
          <Route path="/feedback" element={<UserFeedbackPage />} />
          <Route path="/reports/performance" element={<PerformanceScalabilityReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}