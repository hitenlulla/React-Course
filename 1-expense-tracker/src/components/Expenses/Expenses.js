import React, { useState } from "react";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
// props is used to pass parameters into children components
// And are accessible by the children component
function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {/* Rendering Lists using map() */}
      {props.expenses.map((expense) => (
        // Every list rendered item should have a unique key prop.
        // This is to avoid component overwriting and state collision
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </Card>
  );
}
export default Expenses;
