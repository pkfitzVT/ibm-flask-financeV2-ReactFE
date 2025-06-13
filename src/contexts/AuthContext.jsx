// src/contexts/AuthContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import api from '../apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth]       = useState(true);
  const navigate                              = useNavigate();

  // On mount, check session
  useEffect(() => {
    api.get('/me')
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false))
        .finally(() => setLoadingAuth(false));
  }, []);

  // Call this from your login page
  const login = async (email, password) => {
    await api.post('/login', { email, password });
    setIsAuthenticated(true);
    navigate('/transactions', { replace: true });
  };

  // Call this to log out
  const logout = async () => {
    await api.post('/logout').catch(() => {});
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
      () => ({ isAuthenticated, login, logout }),
      [isAuthenticated]
  );

  // Don’t render the app until we know auth state
  if (loadingAuth) {
    return <div>Loading…</div>;
  }

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
