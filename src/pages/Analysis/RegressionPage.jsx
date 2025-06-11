// src/pages/Analysis/RegressionPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function RegressionPage() {
    // filter state
    const [startDate, setStartDate] = useState('');
    const [endDate,   setEndDate]   = useState('');
    const [period,    setPeriod]    = useState('all');

    // results
    const [result,   setResult]   = useState(null);
    const [chartImg, setChartImg] = useState(null);
    const [error,    setError]    = useState(null);
    const [loading,  setLoading]  = useState(false);

    const runAnalysis = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/api/analysis/regression', {
                withCredentials: true,
                params: {
                    start:  startDate || undefined,
                    end:    endDate   || undefined,
                    period,              // pass 'all'|'morning'|'noon'|'afternoon'
                },
            });
            // expecting { slope, intercept, r_squared, chart_img? }
            setResult({
                slope:     data.slope,
                intercept: data.intercept,
                r2:        data.r_squared ?? data.r2,
            });
            setChartImg(data.chart_img ?? null);
        } catch (e) {
            setError(e);
            setResult(null);
            setChartImg(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        runAnalysis();
    };

    return (
        <div className="p-4">
            <h2>Regression Analysis</h2>

            <form onSubmit={handleSubmit} className="form-inline mb-4">
                <label className="me-3">
                    From:{' '}
                    <input
                        type="date"
                        name="start_date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="form-control"
                    />
                </label>

                <label className="me-3">
                    To:{' '}
                    <input
                        type="date"
                        name="end_date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="form-control"
                    />
                </label>

                <label className="me-3">
                    Period:{' '}
                    <select
                        name="period"
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                        className="form-select"
                        style={{ display: 'inline-block', width: 'auto' }}
                    >
                        {['all','morning','noon','afternoon'].map(p => (
                            <option key={p} value={p}>
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Filtering…' : 'Filter'}
                </button>
            </form>

            {error && (
                <div className="alert alert-danger">
                    Error: {error.message}
                </div>
            )}

            {result && (
                <div className="mt-4">
                    <h5>Results:</h5>
                    <ul>
                        <li>Slope:     {result.slope ?? 'N/A'}</li>
                        <li>Intercept: {result.intercept ?? 'N/A'}</li>
                        <li>R²:        {result.r2 ?? 'N/A'}</li>
                    </ul>
                </div>
            )}

            {chartImg && (
                <div className="mb-5">
                    <h5>Data + Trend Line:</h5>
                    <img src={`data:image/png;base64,${chartImg}`} alt="Regression chart" />
                </div>
            )}
        </div>
    );
}
