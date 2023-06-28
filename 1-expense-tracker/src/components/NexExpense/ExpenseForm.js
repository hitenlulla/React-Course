import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  // Individual states - declaration
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  /*
  // Multi state - declaration
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });
  */

  /*
  // Individual state event handler
  const titleChangeHandler = (event) => {
    // Updating single state
    setEnteredTitle(event.target.value);
    // OR
    // Updating multi-state (when new state is dependent on previous state, use function as parameter)
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };
  */

  // Shared event handler
  const inputChangeHandler = (identifier, value) => {
    if (identifier === "title") {
      setEnteredTitle(value);
    } else if (identifier === "amount") {
      setEnteredAmount(value);
    } else if (identifier === "date") {
      setEnteredDate(value);
    }
  };

  // Submit button handler
  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    console.log(expenseData);
    // Reset input fields to blank
    setEnteredAmount("");
    setEnteredTitle("");
    setEnteredDate("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          {/* Individual onChangeHandler 
            <input type="text" onChange={titleChangeHandler} /> 
          */}

          {/* Shared onChangeHandler */}
          <input
            type="text"
            value={enteredTitle} // two-way binding -> to clear the data when form is submitted
            onChange={(event) => {
              inputChangeHandler("title", event.target.value);
            }}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={(event) => {
              inputChangeHandler("amount", event.target.value);
            }}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2023-12-31"
            value={enteredDate}
            onChange={(event) => {
              inputChangeHandler("date", event.target.value);
            }}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
