import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        // no header on public pages
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Transaction App v2
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/transactions">
                                Transactions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/analysis">
                                Analysis
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn nav-link" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
