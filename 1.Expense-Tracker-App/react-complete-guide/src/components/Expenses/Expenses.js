import React, { useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";

// Data (expense array) coming from App attributes to Expenses is stored in props
const Expenses = (props) => {
  // State for filteredYear
  const [filteredYear, setFilteredYear] = useState("2020");

  // Custom onProp handler to handle data coming from ExpensesFilter (Child)
  const filterChangeHandler = (selectedYear) => {
    // Update the State of filteredYear to new data
    setFilteredYear(selectedYear);
  };

  // Filter the current State of expenses array according to current state of filterYear
  const filteredExpenses = props.items.filter((expense) => {
    // If the year of expense is same as current state of filterYear
    return expense.date.getFullYear().toString() === filteredYear;
  });

  /*
  // Using variables and logic to handle conditional content rendering
  let expensesContent = <p>No Expenses Found</p>
  if(filteredExpenses.length > 0){
    expensesContent = filteredExpenses.map((expense) => (          
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ))
  }
  */

  return (
    <div>
      {/* Card - Wrapped Component */}
      <Card className="expenses">
        {/* selected attr is used to initialize the value of drop down (2 way Mapping) */}
        {/* onChangeFilter - custom onProp to get data coming from ExpensesFilter (Child) */}
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />

        {/* Dynamic rendering */}

        {/* Show the ExpensesChart */}
        <ExpensesChart expenses={filteredExpenses} />

        {/* Showing all the expenses as ExpenseItem */}
        {/*         
        {props.items.map((expense) => (          
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))} 
        */}

        {/* Showing Expenses according to filterYear */}
        {/* Key is an import attribute for react and should contain unique identifier */}
        {/* { filteredExpenses.map((expense) => (          
                <ExpenseItem
                  key={expense.id}
                  title={expense.title}
                  amount={expense.amount}
                  date={expense.date}
                />
              ))
        } */}

        {/* Render the Dynamically generated conditional content component */}
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
