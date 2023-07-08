import React, { useState } from "react";

import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
const NewExpense = (props) => {
  // Conditional component rendering based on click
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  // Bottom-up data passing
  // To get data that is generated in a child component, send the handler function as a on-prop
  // This function will be recieved as a normal prop.
  // Then call this function when data needs to be saved
  const saveExpenseDataHandler = (expenseData) => {
    const data = {
      ...expenseData,
      id: Math.random().toString(),
    };
    props.onAddNewExpense(data);
    stopAddingExpense();
  };

  const startAddingExpense = () => {
    setIsAddingExpense(true);
  };

  const stopAddingExpense = () => {
    setIsAddingExpense(false);
  };

  return (
    <div className="new-expense">
      {/* Conditional rendering JSX */}
      {!isAddingExpense && (
        <button onClick={startAddingExpense}>Add New Expense</button>
      )}
      {/* 
        Such components are called as -> *CONTROLLED COMPONENTS* 
        - because we control the result state of the child component in the parent component
      */}
      {isAddingExpense && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopAddingExpense}
        />
      )}
    </div>
  );
};

export default NewExpense;
