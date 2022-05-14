import React , {useState} from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  // Add New Expense button states
  const [isButtonClicked, setButtonClicked] = useState(false)

  // customOnProp Handler to handle data coming from ExpenseForm (Child)
  const saveExpenseDataHandler = (enteredExpenseData) => {
      // Add a unique identifier to enteredExpenseData
      const expenseData = {
        ...enteredExpenseData,
        id: Math.random().toString()
      };

      // onAddExpense() - customOnProp() to send data from NewExpense (Child) -> App (Parent)
      props.onAddExpense(expenseData);

      // Close the form
      setButtonClicked(false)
  };

  const addNewExpenseHandler = (event) => {
    setButtonClicked(true)
  }

  const cancelAddNewExpenseHandler = () => {
    setButtonClicked(false)
  }
  
  return (
    <div className='new-expense'>
      { !isButtonClicked && <button onClick={addNewExpenseHandler} onCancel={cancelAddNewExpenseHandler} >Add New expense</button>}
      {/* onSaveExpenseData - Custom onProps for Getting data from ExpenseForm (Child) */}
      { isButtonClicked && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} /> }
    </div>
  );

  
};

export default NewExpense;