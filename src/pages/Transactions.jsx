// src/pages/Transactions.jsx

import React, { useEffect, useState } from 'react';
import api from '../apiClient';
import TransactionTable from '../components/TransactionTable';

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError]               = useState(null);
    const [loading, setLoading]           = useState(true);

    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data))
            .catch(() => setError('Failed to load transactions'))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        api.delete(`/transactions/${id}`)
            .then(() => setTransactions(prev => prev.filter(t => t.id !== id)))
            .catch(() => setError('Failed to delete transaction'));
    };

    const handleUpdate = (id, changes) => {
        api.put(`/transactions/${id}`, changes)
            .then(res => setTransactions(prev =>
                prev.map(t => t.id === id ? res.data : t)
            ))
            .catch(() => setError('Failed to update transaction'));
    };

    const handleCreate = newTxn => {
        api.post('/transactions', newTxn)
            .then(res => setTransactions(prev => [...prev, res.data]))
            .catch(() => setError('Failed to create transaction'));
    };

    // loading state
    if (loading) {
        return (
            <div className="page-bg page-bg--transactions page-bg--wide">
                <div className="page-card">
                    <div className="text-center">Loading transactions…</div>
                </div>
            </div>
        );
    }

    // error state
    if (error) {
        return (
            <div className="page-bg page-bg--transactions page-bg--wide">
                <div className="page-card">
                    <div className="alert alert-danger">{error}</div>
                </div>
            </div>
        );
    }

    // main content
    return (
        <div className="page-bg page-bg--transactions page-bg--wide">
            <div className="page-card">
                <h2 className="mb-4">Transaction Records</h2>

                <TransactionTable
                    transactions={transactions}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onCreate={handleCreate}
                />
            </div>
        </div>
    );
}
