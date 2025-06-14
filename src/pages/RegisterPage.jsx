// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate }       from 'react-router-dom';
import api                    from '../apiClient';

export default function RegisterPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post('/register', { email, password });
      // successful registration → send them to login
      navigate('/login', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error;

      // If they’re already registered, send them to login immediately
      if (msg === 'Email already registered') {
        navigate('/login', { replace: true });
        return;
      }

      // Otherwise show the error on this form
      setError(msg || 'Registration failed');
    }
  };

  return (
      <div className="page-bg page-bg--auth">
        <div className="page-card">
          <h2 className="text-center mb-4">Register</h2>

          {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reg-email" className="form-label">
                Email
              </label>
              <input
                  id="reg-email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="reg-password" className="form-label">
                Password
              </label>
              <input
                  id="reg-password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
  );
}
