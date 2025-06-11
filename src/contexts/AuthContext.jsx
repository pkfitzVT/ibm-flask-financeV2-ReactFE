import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../apiClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading]               = useState(true);
  const navigate                              = useNavigate();

  // Check auth status on mount
  useEffect(() => {
    api.get('/me')
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.warn('Logout error', err);
    }
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  // While checking /me, don’t render children
  if (loading) {
    return <div>Loading…</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
