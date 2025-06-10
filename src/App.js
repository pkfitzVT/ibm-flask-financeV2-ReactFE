// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SplashPage     from './pages/SplashPage';
import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import Transactions   from './pages/Transactions';
import Analysis       from './pages/Analysis/AnalysisDashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Splash/Landing page */}
                <Route path="/" element={<SplashPage />} />

                {/* Authentication */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login"    element={<LoginPage />} />

                {/* Protected areas */}
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/analysis/*"   element={<Analysis />} />

                {/* Fallback */}
                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
