// src/pages/AnalysisDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AnalysisDashboard() {
    return (
        <div className="p-4">
            <h1>Analysis Dashboard</h1>
            <ul>
                <li>
                    <Link to="/analysis/abtest">A/B Testing</Link>
                </li>
                <li>
                    <Link to="/analysis/regression">Regression Analysis</Link>
                </li>
            </ul>
        </div>
    );
}
