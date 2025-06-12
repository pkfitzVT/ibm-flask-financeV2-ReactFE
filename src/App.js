// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header              from './components/Header';
import PrivateRoute        from './components/PrivateRoute';

import SplashPage          from './pages/SplashPage';
import LoginPage           from './pages/LoginPage';
import RegisterPage        from './pages/RegisterPage';
import LogoutPage          from './pages/LogoutPage';
import Transactions        from './pages/Transactions';

// Analysis pages
import AnalysisDashboard   from './pages/Analysis/AnalysisDashboard';
import ABTestPage          from './pages/Analysis/AbTestPage';
import RegressionPage      from './pages/Analysis/RegressionPage';

function AppContent() {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();

    // never show header on these public paths:
    const publicPaths = ['/', '/login', '/register', '/logout'];
    const showHeader = isAuthenticated && !publicPaths.includes(pathname);

    return (
        <>
            {showHeader && <Header />}

            <Routes>
                {/* Public */}
                <Route path="/"         element={<SplashPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login"    element={<LoginPage />} />
                <Route path="/logout"   element={<LogoutPage />} />

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
                    path="/analysis"
                    element={
                        <PrivateRoute>
                            <AnalysisDashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/analysis/abtest"
                    element={
                        <PrivateRoute>
                            <ABTestPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/analysis/regression"
                    element={
                        <PrivateRoute>
                            <RegressionPage />
                        </PrivateRoute>
                    }
                />

                {/* 404 catch-all */}
                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
}
