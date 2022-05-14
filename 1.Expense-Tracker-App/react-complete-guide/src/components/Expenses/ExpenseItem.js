import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

// Data(title, amount, date) coming from Expenses is stored in props
const ExpenseItem = (props) => {
  return (
    <li>
      {/* Card - Wrapper Class */}
      <Card className='expense-item'>
        {/* Create a ExpenseDate component with props.date */}
        <ExpenseDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.title}</h2>
          <div className='expense-item__price'>${props.amount}</div>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;