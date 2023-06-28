import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
const NewExpense = (props) => {
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
  };

  return (
    <div className="new-expense">
      {/* 
        Such components are called as -> *CONTROLLED COMPONENTS* 
        - because we control the result state of the child component in the parent component
      */}
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
