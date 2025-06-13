// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login }          = useAuth();
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]  = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // this calls POST /login, sets isAuthenticated, and navigates
      await login(email, password);
    } catch (err) {
      // show server message or fallback
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="page-bg page-bg--auth">
        <div className="page-card mx-auto" style={{ maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">Email</label>
              <input
                  id="login-email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="login-password" className="form-label">Password</label>
              <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
              />
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
            >
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <p className="mt-3 text-center">
            Don’t have an account?{' '}
            <a href="/register">Register here</a>
          </p>
        </div>
      </div>
  );
}
