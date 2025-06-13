// src/pages/Analysis/RegressionPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../../apiClient';

export default function RegressionPage() {
    // raw transactions (to derive date bounds)
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    // filter state
    const [startDate, setStartDate] = useState('');
    const [endDate,   setEndDate]   = useState('');
    const [period,    setPeriod]    = useState('all');

    // results
    const [result,   setResult]   = useState(null);
    const [chartImg, setChartImg] = useState(null);
    const [error,    setError]    = useState(null);
    const [loading,  setLoading]  = useState(false);

    // 1) On mount: fetch all txns, compute min/max
    useEffect(() => {
        api.get('/transactions')
            .then(({ data }) => {
                // extract date strings YYYY-MM-DD, sort them
                const isoDates = data
                    .map(t => t.dateTime.slice(0,10))
                    .sort();
                const first = isoDates[0];
                const last  = isoDates[isoDates.length - 1];
                setMinDate(first);
                setMaxDate(last);
                setStartDate(first);
                setEndDate(last);
            })
            .catch(err => {
                console.error('Could not load transactions for date bounds', err);
            });
    }, []);

    const runAnalysis = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await api.get('/analysis/regression', {
                params: {
                    start_date: startDate,
                    end_date:   endDate,
                    period,
                },
            });

            setResult({
                slope:     data.slope,
                intercept: data.intercept,
                r2:        data.r_squared ?? data.r2,
            });
            setChartImg(data.chart_img ?? null);

        } catch (e) {
            console.error('Regression error', e);
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
        <div className="page-bg page-bg--analysis page-bg--wide">
            <div className="page-card">
                <h2 className="mb-4 text-center">Regression Analysis</h2>

                <form onSubmit={handleSubmit} className="row g-3 mb-4 align-items-end">
                    {/* FROM */}
                    <div className="col-auto">
                        <label htmlFor="startDate" className="form-label">From</label>
                        <input
                            id="startDate"
                            type="date"
                            className="form-control"
                            value={startDate}
                            min={minDate}
                            max={endDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </div>

                    {/* TO */}
                    <div className="col-auto">
                        <label htmlFor="endDate" className="form-label">To</label>
                        <input
                            id="endDate"
                            type="date"
                            className="form-control"
                            value={endDate}
                            min={startDate}
                            max={maxDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>

                    {/* PERIOD */}
                    <div className="col-auto">
                        <label htmlFor="period" className="form-label">Period</label>
                        <select
                            id="period"
                            className="form-select"
                            value={period}
                            onChange={e => setPeriod(e.target.value)}
                        >
                            {['all','morning','noon','afternoon'].map(p => (
                                <option key={p} value={p}>
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SUBMIT */}
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Filtering…' : 'Filter'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="alert alert-danger">
                        Error: {error.message || 'Request failed'}
                    </div>
                )}

                {result && (
                    <div className="mb-4">
                        <h5>Results</h5>
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>Slope</th>
                                <td>{result.slope ?? 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Intercept</th>
                                <td>{result.intercept ?? 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>R²</th>
                                <td>{result.r2 ?? 'N/A'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {chartImg && (
                    <div className="mb-5">
                        <h5>Data + Trend Line</h5>
                        <img
                            src={`data:image/png;base64,${chartImg}`}
                            alt="Regression chart"
                            className="img-fluid border"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
