import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  // States of Input fields
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // Event Handlers on input field
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  // Event Handler on Form Submit
  const submitHandler = (event) => {
    // Avoid Reloading of page on form submit
    event.preventDefault();

    // Input Data converted to expenseData to create NewExpenseItem
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    // Send expenseData from ExpenseForm to NewExpense (Child -> Parent)
    // Calling customOnProp() i.e. onSaveExpenseData() to communicate bw Child -> Parent
    props.onSaveExpenseData(expenseData);

    // Reset Input Fields - Using 2 Way Mapping
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  // onProps(onChange, onSubmit) used for Event Listening
  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;