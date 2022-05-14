import React, { useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

// Initial value for expenses array State
const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  // customOnProp handler to handle data coming from NewExpense (child)
  const addExpenseHandler = (expense) => {
    // Update the State of the current expenses array
    setExpenses((prevExpenses) => {
      // Add the newly created expense to the current expenses array and return
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      {/* onAddExpense - customOnProp to get data from NewExpense (child) */}
      <NewExpense onAddExpense={addExpenseHandler} />

      {/* Passing expenses from App (Parent) -> Expenses (Child) using attributes(props) */}
      <Expenses items={expenses} />
    </div>
  );
};

export default App;