import React from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  // Rendering conditional content
  if (props.expenses.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {/* Rendering Lists using map() */}
      {props.expenses.map((expense) => (
        // Every list rendered item should have a unique key prop.
        // This is to avoid component overwriting and state collision
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
};

export default ExpensesList;
