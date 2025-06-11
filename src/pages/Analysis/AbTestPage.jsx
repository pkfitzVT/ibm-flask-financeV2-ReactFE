import { useState, useEffect } from 'react';
import api from '../../apiClient';

export default function AbTestPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.get('/analysis/abtest')
            .then((res) => setData(res.data))
            .catch(() => {
                // handle error if needed
            });
    }, []);

    return (
        <div className="container p-4">
            <h3>A/B Test</h3>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
        </div>
    );
}
