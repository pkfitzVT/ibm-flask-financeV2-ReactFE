// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Transactions from './pages/Transactions';
import LoginPage    from './pages/LoginPage';
import Analysis     from './pages/Analysis/AnalysisDashboard';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Redirect root to /transactions (or /login as you choose) */}
          <Route path="/" element={<Navigate to="/transactions" replace />} />

          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analysis/*" element={<Analysis />} />
          {/* Inside AnalysisDashboard you’d have nested Routes for regression and A/B */}

          {/* 404 catch-all */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
