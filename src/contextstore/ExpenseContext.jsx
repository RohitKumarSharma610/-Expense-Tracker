import React, { createContext, useContext, useEffect, useState } from 'react';

 const ExpenseContext = createContext();

export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    const total = transactions.reduce((acc, txn) => {
      return txn.type === "INCOME" ? acc + txn.amount : acc - txn.amount;
    }, 0);
    setBalance(total);
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, { ...transaction , id: Date.now()}]);
  };

 



  return (
    <ExpenseContext.Provider value={{setTransactions ,transactions, addTransaction, balance }}>
      {children}
    </ExpenseContext.Provider>
  );
};
