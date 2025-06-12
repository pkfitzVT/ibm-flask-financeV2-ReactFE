// src/pages/AbTestPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AbTestPage = () => {
    // Form state
    const [groupBy, setGroupBy] = useState('half');
    const [paramA, setParamA] = useState('morning');
    const [paramB, setParamB] = useState('morning');

    // Result state
    const [result, setResult] = useState(null);

    // Possible options
    const groupByOptions = [
        { value: 'half', label: 'First/Second Half' },
        { value: 'weekday', label: 'Weekday vs. Weekend' },
        { value: 'time', label: 'Time of Day' },
        { value: 'month', label: 'Month' },
    ];

    const timeOfDayOptions = [
        { value: 'morning', label: 'Morning (6–11)' },
        { value: 'afternoon', label: 'Afternoon (12–17)' },
        { value: 'evening', label: 'Evening (18–23)' },
        { value: 'night', label: 'Night (0–5)' },
    ];

    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
        value: `${i + 1}`,
        label: `${i + 1}`,
    }));

    const paramOptions = () => {
        if (groupBy === 'time') return timeOfDayOptions;
        if (groupBy === 'month') return monthOptions;
        // Default fallback (for half and weekday groupings)
        return [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
        ];
    };

    // Handle form submit
    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/analysis/abtest', {
                group_by: groupBy,
                param_a: paramA,
                param_b: paramB,
            });

            setResult(response.data);
        } catch (error) {
            console.error('Error running A/B test:', error);
            setResult(null);
        }
    };

    return (
        <div>
            <h2>Data Analysis</h2>
            <h3>A/B Test</h3>

            <div style={{ marginBottom: '10px' }}>
                <label>Group by: </label>
                <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
                    {groupByOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Param A: </label>
                <select value={paramA} onChange={e => setParamA(e.target.value)}>
                    {paramOptions().map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Param B: </label>
                <select value={paramB} onChange={e => setParamB(e.target.value)}>
                    {paramOptions().map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <button onClick={handleSubmit}>Run A/B Test</button>

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h4>Results:</h4>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AbTestPage;
