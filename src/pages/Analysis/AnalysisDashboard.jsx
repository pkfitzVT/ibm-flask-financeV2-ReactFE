// src/pages/AnalysisDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function AnalysisDashboard() {
    return (
        <div className="page-bg page-bg--analysis page-bg--wide">
            <div className="page-card text-center">
                <h2 className="mb-4">Analysis Dashboard</h2>

                <div className="d-grid gap-3">
                    <Link to="/analysis/abtest" className="btn btn-primary">
                        A/B Testing
                    </Link>
                    <Link to="/analysis/regression" className="btn btn-primary">
                        Regression Analysis
                    </Link>
                </div>
            </div>
        </div>
    );
}
