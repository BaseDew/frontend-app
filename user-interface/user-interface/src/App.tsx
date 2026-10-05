import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './components/LoginPage';
import Dashboard from './components/Dashboard';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* TODO: CSS */}
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<div style={{ padding: '20px' }}><h2>404</h2></div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
