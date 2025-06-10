// src/components/TransactionTable.jsx
import PropTypes from 'prop-types';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((txn) => (
                <tr key={txn.id}>
                    <td>{txn.id}</td>
                    <td>{txn.date}</td>
                    <td>${txn.amount.toFixed(2)}</td>
                    <td>
                        <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => onEdit(txn)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(txn.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

TransactionTable.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            date: PropTypes.string,
            amount: PropTypes.number,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
