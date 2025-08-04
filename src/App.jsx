import React from 'react';
import { ExpenseProvider } from "./contextstore/ExpenseContext";
import Overview from "./Component/overview";
import Transactions from './Component/trancation';

function App() {
  return (
    <ExpenseProvider>
      <div className="max-w-md mx-auto mt-6 p-4 shadow-md rounded-lg">
        <Overview />
        <Transactions />
      </div>
    </ExpenseProvider>
  );
}

export default App;
