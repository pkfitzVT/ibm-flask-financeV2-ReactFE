// src/pages/RegressionPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegressionPage() {
    // State for filters & results
    const [start, setStart]   = useState('');
    const [end, setEnd]       = useState('');
    const [months, setMonths] = useState([]); // e.g. [1,2,3]
    const [hours, setHours]   = useState([]); // e.g. [9,10,11]
    const [model, setModel]   = useState(null);
    const [error, setError]   = useState(null);

    // Fetch whenever filters change (or you can trigger on a button click)
    useEffect(() => {
        // Only call once you have valid inputs (or remove the guard to call on mount)
        if (!start && !end && !months.length && !hours.length) return;

        axios.get('/api/analysis/regression', {
            withCredentials: true,
            params: {
                start,
                end,
                months: months.join(','),
                hours:  hours.join(',')
            }
        })
            .then(res => setModel(res.data))
            .catch(err => setError(err));
    }, [start, end, months, hours]);

    if (error)  return <p>Error: {error.message}</p>;
    if (!model) return <p>Loading…</p>;

    return (
        <div>
            <h2>Regression Analysis</h2>

            {/* Example filter inputs */}
            <div>
                <label>
                    Start date:
                    <input type="date" value={start}
                           onChange={e => setStart(e.target.value)} />
                </label>
                <label>
                    End date:
                    <input type="date" value={end}
                           onChange={e => setEnd(e.target.value)} />
                </label>
                {/* Add multi-selects or checkboxes for months/hours here */}
            </div>

            {/* Results */}
            <p>Intercept: {model.intercept}</p>
            <p>Slope:     {model.slope}</p>
            <p>R²:        {model.r_squared}</p>
        </div>
    );
}
