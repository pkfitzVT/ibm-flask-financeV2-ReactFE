import { useEffect, useState } from 'react';
import api from '../apiClient';

export default function Transactions() {
    // 1) Hooks at the very top—no returns before this!
    const [transactions, setTransactions] = useState([]);
    const [error, setError]               = useState(null);
    const [loading, setLoading]           = useState(true);
    console.log('🔍 transactions state type:', typeof transactions);
    console.log('🔍 transactions state value:', transactions);
    console.log('State – transactions:', transactions);
    // 2) useEffect immediately—still before any early return
    useEffect(() => {
        api.get('/transactions')
            .then((res) => {
                console.log('Raw response data:', res.data);
                setTransactions(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load transactions');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // 3) Now it’s safe to return early based on state
    if (loading) {
        console.log('Loading… transactions state is:', transactions);
        return <div>Loading transactions…</div>;
    }

    if (error) {
        console.log('After load, transactions state is:', transactions);
        return <div className="alert alert-danger">{error}</div>;
    }

    // 4) Finally, render the table
    return (
        <div className="container p-4">
            <h2>Transactions</h2>
            <table className="table table-striped">
                <thead>
                <tr><th>ID</th><th>Date</th><th>Amount</th></tr>
                </thead>
                <tbody>
                {transactions.map((txn) => (
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
