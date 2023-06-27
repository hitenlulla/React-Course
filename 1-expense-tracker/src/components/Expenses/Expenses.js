import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

// props is used to pass parameters into children components
// And are accessible by the children component
function Expenses(props) {
  return (
    <Card className="expenses">
      {/* Access data coming into props using '.' notation */}
      <ExpenseItem expense={props.expenses[0]} />
      <ExpenseItem expense={props.expenses[1]} />
      <ExpenseItem expense={props.expenses[2]} />
      <ExpenseItem expense={props.expenses[3]} />
    </Card>
  );
}
export default Expenses;
