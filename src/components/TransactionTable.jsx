// src/components/TransactionTable.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TransactionTable({
                                             transactions,
                                             onDelete,
                                             onUpdate,
                                             onCreate,
                                         }) {
    const [edits, setEdits] = useState({});
    const [newTxn, setNewTxn] = useState({ dateTime: '', amount: '' });

    const startEdit = (transaction) =>
        setEdits((prev) => ({
            ...prev,
            [transaction.id]: {
                dateTime: transaction.dateTime,
                amount: transaction.amount,
            },
        }));

    const cancelEdit = (id) =>
        setEdits((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });

    const saveEdit = (id) => {
        onUpdate(id, edits[id]);
        cancelEdit(id);
    };

    const saveNew = () => {
        onCreate({
            dateTime: newTxn.dateTime,
            amount: Number(newTxn.amount),
        });
        setNewTxn({ dateTime: '', amount: '' });
    };

    return (
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Date & Time</th>
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
                                    type="datetime-local"
                                    value={edits[t.id].dateTime}
                                    onChange={(evt) =>
                                        setEdits((prev) => ({
                                            ...prev,
                                            [t.id]: {
                                                ...prev[t.id],
                                                dateTime: evt.target.value,
                                            },
                                        }))
                                    }
                                />
                            ) : (
                                new Date(t.dateTime).toLocaleString()
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={edits[t.id].amount}
                                    onChange={(evt) =>
                                        setEdits((prev) => ({
                                            ...prev,
                                            [t.id]: {
                                                ...prev[t.id],
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

            {/* Blank row for adding a new transaction */}
            <tr>
                <td>—</td>
                <td>
                    <input
                        type="datetime-local"
                        value={newTxn.dateTime}
                        onChange={(evt) =>
                            setNewTxn((prev) => ({
                                ...prev,
                                dateTime: evt.target.value,
                            }))
                        }
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={newTxn.amount}
                        onChange={(evt) =>
                            setNewTxn((prev) => ({
                                ...prev,
                                amount: evt.target.value,
                            }))
                        }
                    />
                </td>
                <td>
                    <button onClick={saveNew} disabled={!newTxn.dateTime || !newTxn.amount}>
                        ➕ Add
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

TransactionTable.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            dateTime: PropTypes.string.isRequired,
            amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};
