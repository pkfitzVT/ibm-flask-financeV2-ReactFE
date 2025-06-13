// src/apiClient.js

import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL
    ? `${process.env.REACT_APP_API_BASE_URL.replace(/\/$/, '')}/api`
    : '/api';

console.log('🔗 API baseURL is:', baseURL);

const api = axios.create({
  baseURL,               // e.g. "http://localhost:5000/api" or just "/api"
  withCredentials: true, // send the cookie on every request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
