// src/pages/Analysis/AbTestPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

const groupOptionsMap = {
    half:    ['1', '2'],
    weekday: ['0','1','2','3','4','5','6'],
    time:    ['morning','afternoon','evening','night'],
    month:   ['1','2','3','4','5','6','7','8','9','10','11','12']
};

export default function ABTestPage() {
    const [groupBy, setGroupBy]           = useState('half');
    const [groupOptions, setGroupOptions] = useState(groupOptionsMap.half);
    const [paramA, setParamA]             = useState(groupOptionsMap.half[0]);
    const [paramB, setParamB]             = useState(groupOptionsMap.half[1]);
    const [results, setResults]           = useState(null);
    const [error, setError]               = useState('');
    const [loading, setLoading]           = useState(false);

    const handleGroupByChange = e => {
        const gb = e.target.value;
        setGroupBy(gb);
        const opts = groupOptionsMap[gb];
        setGroupOptions(opts);
        setParamA(opts[0]);
        setParamB(opts[1] || opts[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setResults(null);
        setLoading(true);

        try {
            const resp = await axios.post('/api/analysis/abtest', {
                group_by: groupBy,
                param_a:  paramA,
                param_b:  paramB
            });
            setResults(resp.data);
        } catch {
            setError('Failed to run A/B test');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-bg page-bg--analysis page-bg--wide">
            <div className="page-card">
                <h2 className="mb-4">A/B Test</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Group by:</label>
                        <select
                            className="form-select"
                            value={groupBy}
                            onChange={handleGroupByChange}
                        >
                            <option value="half">Half (first/second)</option>
                            <option value="weekday">Weekday (0=Mon…6=Sun)</option>
                            <option value="time">Time of Day</option>
                            <option value="month">Month</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Group A param:</label>
                        <select
                            className="form-select"
                            value={paramA}
                            onChange={e => setParamA(e.target.value)}
                        >
                            {groupOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Group B param:</label>
                        <select
                            className="form-select"
                            value={paramB}
                            onChange={e => setParamB(e.target.value)}
                        >
                            {groupOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? 'Running…' : 'Run A/B Test'}
                    </button>
                </form>

                {results && (
                    <div className="mt-5">
                        <h4>Results</h4>
                        <p>
                            <strong>t-score:</strong>{' '}
                            {results.t_score != null
                                ? results.t_score.toFixed(3)
                                : 'N/A'}
                        </p>
                        <p>
                            <strong>p-value:</strong>{' '}
                            {results.p_value != null
                                ? results.p_value.toFixed(5)
                                : 'N/A'}
                        </p>

                        <details className="mt-3">
                            <summary style={{ cursor: 'pointer' }}>
                                Show raw group data
                            </summary>

                            <table className="table table-bordered mt-2">
                                <thead>
                                <tr>
                                    <th>Group A</th>
                                    <th>Group B</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(() => {
                                    const a = results.groupA || [];
                                    const b = results.groupB || [];
                                    const maxLen = Math.max(a.length, b.length);
                                    return Array.from({ length: maxLen }).map((_, i) => {
                                        const key = `${a[i] ?? ''}-${b[i] ?? ''}-${i}`;
                                        return (
                                            <tr key={key}>
                                                <td>{a[i] != null ? a[i] : ''}</td>
                                                <td>{b[i] != null ? b[i] : ''}</td>
                                            </tr>
                                        );
                                    });
                                })()}
                                </tbody>
                            </table>
                        </details>

                        {results.boxplot_img && (
                            <>
                                <h5 className="mt-4">Boxplot</h5>
                                <img
                                    src={`data:image/png;base64,${results.boxplot_img}`}
                                    alt="Boxplot"
                                    className="img-fluid border mt-2"
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
