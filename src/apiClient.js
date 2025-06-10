import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
    withCredentials: true,            // if you’re using cookie-based sessions
    headers: { 'Content-Type': 'application/json' },
});

export default api;