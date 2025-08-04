import React from 'react';
import { useExpense } from '../contextstore/ExpenseContext';

const Transactions = () => {
  const { transactions, deleteTransaction,setTransactions } = useExpense();

 const handleDelete = (id) => {
  const txnToDelete = transactions.find((txn) => txn.id === id);

  if (!txnToDelete) return;

  const effect =
    txnToDelete.type === "INCOME"
      ? `- ₹${txnToDelete.amount}`
      : `+ ₹${txnToDelete.amount}`;

  const confirmDelete = window.confirm(
    `Are you sure you want to delete this transaction?\n\nThis will affect your balance: ${effect}`
  );

  if (confirmDelete) {
    const updated = transactions.filter((txn) => txn.id !== id);
    setTransactions(updated);
  }
};


  return (
  <div className="space-y-2">
    <h2 className="font-semibold text-lg text-center">Transactions:</h2>

    {transactions.length === 0 ? (
      <p className="text-gray-500">No transactions found.</p>
    ) : (
      transactions.map((txn, index) => (
        <div key={txn.id} className="p-2 border-b">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">
                {index + 1}. {txn.desc} {/* <-- Serial No. here */}
              </div>
              <div className="text-xs text-gray-500">{txn.date}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={txn.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}>
                ₹{txn.amount}
              </span>
              <button
                onClick={() => handleDelete(txn.id)}
                className="text-red-500 hover:text-red-700 text-sm"
                title="Delete"
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

};

export default Transactions;
