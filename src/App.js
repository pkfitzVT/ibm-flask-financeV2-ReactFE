import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider }      from './contexts/AuthContext';
import Header                from './components/Header';
import PrivateRoute          from './components/PrivateRoute';

import SplashPage            from './pages/SplashPage';
import LoginPage             from './pages/LoginPage';
import RegisterPage          from './pages/RegisterPage';
import LogoutPage            from './pages/LogoutPage';
import Transactions          from './pages/Transactions';
import AnalysisDashboard     from './pages/Analysis/AnalysisDashboard';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Header />

          <Routes>
            {/* Public */}
            <Route path="/"        element={<SplashPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login"    element={<LoginPage />} />

            {/* Protected */}
            <Route
                path="/transactions"
                element={
                  <PrivateRoute>
                    <Transactions />
                  </PrivateRoute>
                }
            />
            <Route
                path="/analysis/*"
                element={
                  <PrivateRoute>
                    <AnalysisDashboard />
                  </PrivateRoute>
                }
            />
            <Route path="/logout" element={<LogoutPage />} />

            {/* Catch-all */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
