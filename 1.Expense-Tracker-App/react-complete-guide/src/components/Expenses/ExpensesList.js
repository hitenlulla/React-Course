import './ExpensesList.css'
import ExpenseItem from './ExpenseItem'

const ExpensesList = (props) => {
    // Condition based content:
    // If length of the data (filteredExpenses) is 0, return Not found
    if(props.items.length === 0) return <h2 className="expenses-list__fallback" >No Expenses Found</h2>

    // Else return a dynamically rendered List
    return (
        <ul className="expenses-list">
            { props.items.map((expense) => (          
                <ExpenseItem
                    key={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                />
            ))}
        </ul>
    )
}

export default ExpensesList