// src/pages/Analysis/AbTestPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';

const AbTestPage = () => {
    // Define valid options for each group_by value
    const groupOptionsMap = {
        half: ['1', '2'],
        weekday: ['0', '1', '2', '3', '4', '5', '6'],
        time: ['morning', 'afternoon', 'evening', 'night'],
        month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    };

    // State for group_by and options
    const [groupBy, setGroupBy] = useState('half');
    const [groupOptions, setGroupOptions] = useState(groupOptionsMap['half']);

    // State for paramA and paramB
    const [paramA, setParamA] = useState(groupOptions[0]);
    const [paramB, setParamB] = useState(groupOptions[1]);

    // State for results
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    // When groupBy changes → update options and reset paramA/B
    const handleGroupByChange = (e) => {
        const selectedGroupBy = e.target.value;
        setGroupBy(selectedGroupBy);

        const newOptions = groupOptionsMap[selectedGroupBy];
        setGroupOptions(newOptions);

        // Reset paramA and paramB to first 2 options
        setParamA(newOptions[0]);
        setParamB(newOptions[1] || newOptions[0]);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResults(null);

        try {
            const resp = await axios.post('/api/analysis/abtest', {
                group_by: groupBy,
                param_a: paramA,
                param_b: paramB
            });
            setResults(resp.data);
        } catch (err) {
            console.error(err);
            setError('Failed to run A/B test');
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2 className="mb-4">A/B Test</h2>

                <form onSubmit={handleSubmit}>
                    <label className="form-label">Group by:</label>
                    <select
                        className="form-select mb-3"
                        value={groupBy}
                        onChange={handleGroupByChange}
                    >
                        <option value="half">Half (first/second)</option>
                        <option value="weekday">Weekday (0=Mon, 6=Sun)</option>
                        <option value="time">Time of Day</option>
                        <option value="month">Month</option>
                    </select>

                    <label className="form-label">Group A param:</label>
                    <select
                        className="form-select mb-3"
                        value={paramA}
                        onChange={(e) => setParamA(e.target.value)}
                    >
                        {groupOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <label className="form-label">Group B param:</label>
                    <select
                        className="form-select mb-3"
                        value={paramB}
                        onChange={(e) => setParamB(e.target.value)}
                    >
                        {groupOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <button type="submit" className="btn btn-primary">Run A/B Test</button>
                </form>

                {error && <div className="alert alert-danger mt-4">{error}</div>}

                {results && (
                    <div className="mt-5">
                        <h4>Results:</h4>
                        <p><strong>P-value:</strong> {results.p_value !== null ? results.p_value.toFixed(5) : 'N/A'}</p>
                        <h5>Group A (outliers removed):</h5>
                        <pre>{JSON.stringify(results.groupA, null, 2)}</pre>
                        <h5>Group B (outliers removed):</h5>
                        <pre>{JSON.stringify(results.groupB, null, 2)}</pre>
                        {results.boxplot_img && (
                            <>
                                <h5>Boxplot:</h5>
                                <img
                                    src={`data:image/png;base64,${results.boxplot_img}`}
                                    alt="Boxplot"
                                    className="img-fluid border"
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AbTestPage;
