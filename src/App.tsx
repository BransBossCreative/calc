import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChecklistProvider } from './context/ChecklistContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { ChecklistPage } from './pages/ChecklistPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { AdminUsers } from './pages/AdminUsers';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminSettings } from './pages/AdminSettings';
import { AdminTemplates } from './pages/AdminTemplates';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ChecklistProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Admin-only route for creating checklists */}
              <Route path="/checklist" element={
                <ProtectedRoute>
                  <ChecklistPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute>
                  <AdminAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/admin/templates" element={
                <ProtectedRoute>
                  <AdminTemplates />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </ChecklistProvider>
    </AuthProvider>
  );
}

export default App;