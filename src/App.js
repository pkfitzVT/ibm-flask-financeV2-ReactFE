// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider }      from './contexts/AuthContext';
import Header                from './components/Header';
import PrivateRoute          from './components/PrivateRoute';

import SplashPage            from './pages/SplashPage';
import LoginPage             from './pages/LoginPage';
import RegisterPage          from './pages/RegisterPage';
import LogoutPage            from './pages/LogoutPage';
import Transactions          from './pages/Transactions';

// Analysis pages
import AnalysisDashboard     from './pages/Analysis/AnalysisDashboard';
import ABTestPage            from './pages/Analysis/AbTestPage';
import RegressionPage        from './pages/Analysis/RegressionPage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />

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
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
