import React, { useState } from 'react';
import { useExpense } from '../contextstore/ExpenseContext';

const Overview = () => {
  const { addTransaction, balance } = useExpense();
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [error, setError] = useState('');
  const [errorTimer, setErrorTimer] = useState(null);

  const handleAdd = () => {
    if (amount.trim() === '' || desc.trim() === '') {
      setError("Enter all fields");
      let seconds = 3;
      setErrorTimer(seconds);
      const interval = setInterval(() => {
        seconds -= 1;
        if (seconds > 0) setErrorTimer(seconds);
        else {
          setError('');
          setErrorTimer(null);
          clearInterval(interval);
        }
      }, 1000);
      return;
    }

   const now = new Date();
const newTxn = {
  amount: parseFloat(amount),
  desc,
  type,
  category: "General",
  date: now.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }),
};
addTransaction(newTxn);

    setAmount('');
    setDesc('');
    setType('EXPENSE');

    document.activeElement.blur();
  };


  return (
      <div className="space-y-3 mb-4">
       <div className="text-center">
    <h1 className="text-2xl font-bold text-gray-800">💰 Expense Tracker</h1>
    <p className="text-sm text-gray-500">Track your income and expenses easily</p>
  </div>

  <h2 className="text-xl font-bold">
    Balance: 
    <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
      ₹{balance}
    </span>
  </h2>
        <input type="number" placeholder="Amount" className="w-full p-2 border rounded" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        <input type="text" placeholder="Description" className="w-full p-2 border rounded" value={desc} onChange={(e) => setDesc(e.target.value)} onKeyDown={(e)=>{
          if(e.key === "Enter"){
               e.preventDefault()
               handleAdd()
          }
        }}/>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded relative">
            {error} {errorTimer && <span className="text-xs bg-white px-1.5 py-1 rounded-full border  absolute right-2 top-1">{errorTimer}</span>}
          </div>
        )}
        <div className="flex gap-4">
          <label><input type="radio" name="type" value="EXPENSE" checked={type === 'EXPENSE'} onChange={(e) => setType(e.target.value)} /> Expense</label>
          <label><input type="radio" name="type" value="INCOME" checked={type === 'INCOME'} onChange={(e) => setType(e.target.value)} /> Income</label>
        </div>
        <div className="flex justify-center">
    <button className="bg-black text-white px-4 py-2 rounded" onClick={handleAdd}>
      Add Transaction
    </button>
    </div>
    
      </div>
    );
};

export default Overview;
