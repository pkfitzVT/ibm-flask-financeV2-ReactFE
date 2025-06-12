// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../apiClient';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const navigate                = useNavigate();
  const location                = useLocation();

  // If someone redirected here after register, show that flash:
  const flash = location.state?.flash;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post('/login', { email, password });
      navigate('/transactions', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
      <div className="page-bg page-bg--auth">
        <div className="page-card">
          <h2 className="text-center mb-4">Login</h2>

          {flash && (
              <div className="alert alert-info" role="alert">
                {flash}
              </div>
          )}

          {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>
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
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Log In
            </button>
          </form>

          <p className="text-center mt-3">
            Don’t have an account?{' '}
            <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
  );
}
