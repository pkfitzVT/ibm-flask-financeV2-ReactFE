// src/components/TransactionTable.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TransactionTable({ transactions, onDelete, onUpdate }) {
    const [edits, setEdits] = useState({});

    const startEdit = (transaction) =>
        setEdits((prevEdits) => ({
            ...prevEdits,
            [transaction.id]: { date: transaction.date, amount: transaction.amount },
        }));

    const cancelEdit = (id) =>
        setEdits((prevEdits) => {
            const copy = { ...prevEdits };
            delete copy[id];
            return copy;
        });

    const saveEdit = (id) => {
        onUpdate(id, edits[id]);
        cancelEdit(id);
    };

    return (
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((t) => {
                const isEditing = Boolean(edits[t.id]);
                return (
                    <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>
                            {isEditing ? (
                                <input
                                    value={edits[t.id].date}
                                    onChange={(evt) =>
                                        setEdits((prevEdits) => ({
                                            ...prevEdits,
                                            [t.id]: {
                                                ...prevEdits[t.id],
                                                date: evt.target.value,
                                            },
                                        }))
                                    }
                                />
                            ) : (
                                t.date
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={edits[t.id].amount}
                                    onChange={(evt) =>
                                        setEdits((prevEdits) => ({
                                            ...prevEdits,
                                            [t.id]: {
                                                ...prevEdits[t.id],
                                                amount: evt.target.value,
                                            },
                                        }))
                                    }
                                />
                            ) : (
                                t.amount
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <>
                                    <button onClick={() => saveEdit(t.id)}>💾 Save</button>
                                    <button onClick={() => cancelEdit(t.id)}>✖ Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => startEdit(t)}>✏️ Edit</button>
                                    <button onClick={() => onDelete(t.id)}>🗑️ Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                );
            })}

            {/* You can add your “new” row here for insert if you like */}
            </tbody>
        </table>
    );
}

TransactionTable.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};
