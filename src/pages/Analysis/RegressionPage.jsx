// src/pages/Analysis/RegressionPage.jsx
import { useState, useEffect } from 'react';
import api from '../../apiClient';

export default function RegressionPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.get('/analysis/regression')
            .then(res => setData(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="container p-4">
            <h3>Regression</h3>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
        </div>
    );
}
