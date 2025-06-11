import { useEffect, useState } from 'react';
import api from '../apiClient';
import TransactionTable from '../components/TransactionTable';

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [error,        setError]        = useState(null);
    const [loading,      setLoading]      = useState(true);

    useEffect(() => {
        api.get('/transactions')
            .then(res => {
                setTransactions(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load transactions');
                setLoading(false);
            });
    }, []);

    const handleDelete = id => {
        api.delete(`/transactions/${id}`)
            .then(() => {
                setTransactions(ts => ts.filter(t => t.id !== id));
            })
            .catch(() => {
                setError('Failed to delete transaction');
            });
    };

    // ← NEW: patch your update endpoint
    const handleUpdate = (id, changes) => {
        api.patch(`/transactions/${id}`, changes)
            .then(res => {
                setTransactions(ts =>
                    ts.map(t => t.id === id ? res.data : t)
                );
            })
            .catch(() => {
                setError('Failed to update transaction');
            });
    };

    if (loading) return <div>Loading transactions…</div>;
    if (error)   return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container p-4">
            <h2>Transactions</h2>
            <TransactionTable
                transactions={transactions}
                onDelete={handleDelete}
                onUpdate={handleUpdate}  // ← now passed in
            />
        </div>
    );
}
