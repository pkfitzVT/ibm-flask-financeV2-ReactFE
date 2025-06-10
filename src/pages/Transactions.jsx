// src/pages/Transactions.jsx
import { useEffect, useState } from 'react';
import api from '../apiClient';

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => {
                console.error(err);
                setError('Failed to load transactions');
            });
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }
    if (!transactions.length) {
        return <div>Loading transactions…</div>;
    }

    return (
        <div className="container p-4">
            <h2>Transactions</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(txn => (
                    <tr key={txn.id}>
                        <td>{txn.id}</td>
                        <td>{txn.date}</td>
                        <td>${txn.amount.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
