# React - The Complete Guide
- [React - The Complete Guide](#react---the-complete-guide)
- [Introduction](#introduction)
- [Installing React](#installing-react)
- [Initializing React App](#initializing-react-app)
- [Components](#components)
  - [Creating and Exporting](#creating-and-exporting)
    - [Simple Component](#simple-component)
    - [Complex Components](#complex-components)
  - [Importing](#importing)
  - [Styling (Static)](#styling-static)
  - [Injecting Data](#injecting-data)
  - [Sending Data using **Props**](#sending-data-using-props)
  - [Adding Vanilla JS logic](#adding-vanilla-js-logic)
  - [Spliting into Sub-Components](#spliting-into-sub-components)
  - [Wrapper Components - **ChildrenProps**](#wrapper-components---childrenprops)
  - [Organizing Components](#organizing-components)
  - [Event Listener - **onProps**](#event-listener---onprops)
- [State](#state)
  - [Implementing State](#implementing-state)
  - [User Inputs](#user-inputs)
    - [Collecting Input](#collecting-input)
    - [Litening Inputs](#litening-inputs)
    - [Adding States to Inputs](#adding-states-to-inputs)
    - [Listening Form Submit](#listening-form-submit)
    - [Communicate Data Up to Parent](#communicate-data-up-to-parent)
- [Rendering Dynamic Content](#rendering-dynamic-content)
  - [Rendering Dynamic List](#rendering-dynamic-list)
  - [Rendering Stateful Lists](#rendering-stateful-lists)
  - [Rendering Conidtional Content](#rendering-conidtional-content)
- [Dynamic Styling](#dynamic-styling)
  - [Inline Styling](#inline-styling)
  - [Class Styling](#class-styling)
  - [Styled Components](#styled-components)
    - [Declaring](#declaring)
    - [Dynamic styling](#dynamic-styling-1)
    - [Media Queries](#media-queries)
  - [Inbuilt - CSS Modules](#inbuilt---css-modules)
    - [Declaring](#declaring-1)
    - [Dynamic Styling](#dynamic-styling-2)
    - [Media Queries](#media-queries-1)

# Introduction
1. #### What is **React** ?
   > A Client-Side JavaScript Library for building User Interfaces

2. #### Why use React instead of Vanilla Javascript ?
   > In Vanilla Javascript, every single step has to be written for a web component. *(Imperative Approach)*
   >
   > React provides a way to create HTML components and it splits the whole app into smaller components that perform their individual tasks. *(Declarative Approach)* 

3. #### Single Page Application Approach
    > Using React to build all the components(Widgets) on a webpage.
    >
    > Server only renders **one** HTML page and all the other actions (routing, filtering, sorting) can be handled by React.
    > 
    > To the end-user it feels like the page is changing but in reality only the components are rendered.

# Installing React
 1. Install the latest node LTS version [Node](https://nodejs.org/en/download/).
 2. I installed node v16.15.0
 3. Use the create-react-app tool from [Github](https://github.com/facebook/create-react-app)
   
# Initializing React App 
App Name: **my-app**

```bash
nvm use 16.15.0
npx create-react-app my-app
```

Open a new terminal in the my-app folder
```bash
cd my-app
npm install
npm start
```

> Once the app is built, **src/index.js** acts as an entrypoint

# Components
1. ### What is a **Component**
    > Reusable Blocks of code that are used to build widgets on webpage.
    > 
    > Example: Cards, Sidebar
    > 
    > Components are also used for *Separation of Concerns* i.e. All the component code is separated into their individual files.

2. #### What are components made of
    > Components are made by combining
    > 
    > * HTML 
    > * CSS  
    > * JavaScript

3. #### React and Components
    > React allows to create re-usable and reactive components using declarative approach
    > 
    > As a developer, we need to define the desired target state and let React figure out the actual JS-DOM instructions

## Creating and Exporting
### Simple Component
Components are created using JSX - A special syntax for JS + XML

> 1. create a directory named 'components' in src/
> 
> 2. Create a file with name of your component following the naming convention
> Example: **ExpenseItem.js**

A Component in react is simply a function that returns JSX code.
Note: The function name is same as the file name.
> In *ExpenseItem.js*
```jsx
function ExpenseItem(){
    return (<h1>Expense Item!</h1>)
}

export default ExpenseItem;
```

### Complex Components
> In *ExpenseItem.js*
```jsx
function ExpenseItem() {
  return (
    <div>
      <div>March 28, 2021</div>
      <div>
        <h2>Car Insurance</h2>
        <div>$294.67</div>
      </div>
    </div>
  );
}

export default ExpenseItem;

```

## Importing
_index.js_ is the entry point for the web app

_index.js_ renders the default component __\<App/\>__

Hence our custom made components need to be imported in _App.js_

Note: The custom component (HTML) should be same as the component function name

```jsx
import './App.css';

// Importing Custom made components
import ExpenseItem from './components/ExpenseItem'

function App() {
  return (
    <div className="App">
      <h2>Let's Get Started</h2>        
      {/* Add Custom Component on App */}

      <ExpenseItem></ExpenseItem>
    </div>
  );
}

export default App;
```

## Styling (Static)
In *components/* create a css file with the same name as that of the component. Eg: ExpenseItem.css

> In *ExpenseItem.css*

```css
.expense-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    padding: 0.5rem;
    margin: 1rem 0;
    border-radius: 12px;
    background-color: #4b4b4b;
  }
  
  .expense-item__description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
    flex-flow: column-reverse;
    justify-content: flex-start;
    flex: 1;
  }
  
  .expense-item h2 {
    color: #3a3a3a;
    font-size: 1rem;
    flex: 1;
    margin: 0 1rem;
    color: white;
  }
  
  .expense-item__price {
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #40005d;
    border: 1px solid white;
    padding: 0.5rem;
    border-radius: 12px;
  }
  
  @media (min-width: 580px) {
    .expense-item__description {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex: 1;
    }
  
    .expense-item__description h2 {
      font-size: 1.25rem;
    }
  
    .expense-item__price {
      font-size: 1.25rem;
      padding: 0.5rem 1.5rem;
    }
  }
```

> Import this file in *ExpenseItem.js* and add the classes to **className** property in JSX

```jsx
// Importing the style for component
import './ExpenseItem.css';

function ExpenseItem() {
  return (
    {/* class attribute from html is invalid in JSX */}
    {/* Hence use className attribute */}
    <div className="expense-item">
      <div>March 28, 2022</div>
      <div className="expense-item__description">
        <h2>Car Insurance</h2>
        <div className="expense-item__price">294.67</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
```

## Injecting Data
We can use {variableName} to inject the data stored in variableName

Within {} any javascript code is valid. Eg: { Math.random() }

> In _ExpenseItem.js_

```jsx
function ExpenseItem() {
  const expenseDate = new Date(2021, 2, 28);
  const expenseTitle = 'Car Insurance';
  const expensePrice = 294.67;

  return (
    <div className="expense-item">
      <div>{expenseDate.toISOString()}</div>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">${expensePrice}</div>
      </div>
    </div>
  );
}
```

But creating variables with fix values cannot make the component reusable.

To solve this we can pass the values to inject from *App.js* using **props**

## Sending Data using **Props**
Props get the values when _App.js_ uses component and sends data by passing it as attributes to components.

> In _App.js_

```jsx
function App() {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
  ];

  return (
    <div className="App">
      <h2> Let 's Get Started</h2>
      {/* Attributes sent from JSX can be accessed by the component using props */}
      {/* title, amount, date are attributes */}
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      ></ExpenseItem>
    </div>
  );
}
```
Here title, amount and date are send to *ExpenseItem.js* as props object

> In *ExpenseItem.js*

```jsx
function ExpenseItem(props) {
  return (
    <div className="expense-item">
      <div>{props.date.toISOString()}</div>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}
```

> Note: props can also be used to send functions to the Child Component. (Later comes in handy while using state management).

## Adding Vanilla JS logic
Sometimes data needs to be processed before displaying in the component. For that we can use vanilla JS to write the logic.

Example: We need to format the Date object to dd, month, yyyy before displaying

> In _ExpenseItem.js_
```jsx
function ExpenseItem(props) {
    const month = props.date.toLocaleString('en-US', {month: 'long'})
    const day = props.date.toLocaleString('en-US', {day: '2-digit'})
    const year = props.date.getFullYear()
  
    return (
    <div className="expense-item">
      <div>
          <div>{month}</div>
          <div>{day}</div>
          <div>{year}</div>          
      </div>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}
```

## Spliting into Sub-Components
In the above example, we can build a Date sub component and it can be imported in _ExpenseItem.js_

> Create _ExpenseDate.js_

```jsx
import './ExpenseDate.css'

function ExpenseDate(props){
    const month = props.date.toLocaleString('en-US', {month: 'long'})
    const day = props.date.toLocaleString('en-US', {day: '2-digit'})
    const year = props.date.getFullYear()

    return (<div>
        <div>{month}</div>
        <div>{day}</div>
        <div>{year}</div>          
    </div>)
}

export default ExpenseDate
```

> Create _ExpenseDate.css_

```css
.expense-date {
  display: flex;
  flex-direction: column;
  width: 5.5rem;
  height: 5.5rem;
  border: 1px solid #ececec;
  background-color: #2a2a2a;
  color: white;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
}

.expense-date__month {
  font-size: 0.75rem;
  font-weight: bold;
}

.expense-date__year {
  font-size: 0.75rem;
}

.expense-date__day {
  font-size: 1.5rem;
  font-weight: bold;
}
```

## Wrapper Components - **ChildrenProps**
Components that are only used to provide certain functionality to enclosing components

For example: Card component can wrap other components which should be styled like cards.

`<Card><ExpenseItem /></Card>`

But React doesn't support Component Composition directly.

To solve this, we use **Children props**

> Create a _Card.js_ Wrapper Component

```jsx
import './Card.css'

function Card(props){
    // we need to append the className of the composite component to apply it's styles with the card style
    const newClass ='card ' + props.className
    return(
        <div className={newClass}>{props.children}</div>
    )
}

export default Card
```
__props.children is the reference to composite Component that needs to be wrapped__

> In _Cards.css_

```css
.card{
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}
```

> Modifying _ExpensesItem.js_ to use Card Component

```jsx
import Card from "./Card"

function ExpenseItem(props) {
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
}
```

__*Concept of Composition* helps to avoid repetition of style code by creating wrapper Components__

## Organizing Components
Storing many components in a single _components/_ can become cumbersome. Hence we can create multiple directories according to the use case of the components

Example:
* _'UI/'_ for Card; 
* _'Expenses/'_ for ExpenseItem, ExpenseDate

## Event Listener - **onProps**
Suppose we want to change the title of the ExpenseItem on a button click, we can't use .addEventListener() like JS.
In JSX, we use **onProps**. They are the attributes which handles event triggers.

`<button onClick={clickHandler}>Change Title</button>`

```jsx
const clickHandler = () =>{
    console.log("Clicked");
}
```

The onClick prop takes reference to function (clickHandler) which should be executed when the button is clicked.

If we try to change the title of the ExpenseItem using clickHandlers. It will not work.

> This will not change the title of the ExpenseItem
```jsx
const clickHandler = () =>{
    props.title = "This is the new title"
}
```

Why doesn't this work?
> A component is just a function. 
> We don't call this function, React does -
> While building the Component on page.
> Once the component is built react is unaware of any changes made to the Component.
> 
> To notify react that something has to be changed - We use **States**

# State
1. ### What is **State**
    > A State is a special object (hook) in React that contains the data or information about the component. 
    >
    > If we need to change that data, we can change the state of the component. 
    >
    > Changing the state of a component, re-evaluates it on the screen and the update is successfully seen.
    
## Implementing State
Consider the above scenario of changing the title of ExpenseItem. We can use State

>In _ExpenseItem.js_
```jsx
// Import State hook from react library
import React, { useState } from "react"


function ExpenseItem(props) {
  /* useState()
   * Parameters : Data on which State should be defined
   * Returns: Array of 2 elements - Current Data & A Function to change the Current Data
   * Should only be used directly inside the component.
   */
  const [currTitle, setTitle] = useState(props.title)

  const clickHandler = () =>{
    console.log("Button Clicked");
    //  Changing the Current Data of State on Button Click
    setTitle("Title Updated")
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        
        {/* To Change the data of component when state is changed */}
        {/* - use the current data given by the state */}
        <h2>{currTitle}</h2>
        
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}
```
>NOTE:
> Every instance of the Component has a separate state.
> 
> Every `<ExpenseItem>` has its own state and state update on one `<ExpenseItem>` doesn't affect the state of other `<ExpenseItem>`

## User Inputs
### Collecting Input
We can create a form component to get input from user.

> Create a new directory in _components/_ named _NewExpense_
>
> In _components/NewExpense/ExpenseForm.js_
```jsx
import "./ExpenseForm.css";

const ExpenseForm = () => {
  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" />
        </div>
        <div className="new-expense__control">
          <label>Title</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="Submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
```

> In _components/NewExpense/NewExpense.js_
```jsx
import ExpenseForm from './ExpenseForm'
import './NewExpense.css'

// Using Arrow Functions
const NewExpense = (props) => {
    return(<div className="new-expense">
        <ExpenseForm />
    </div>)
}

export default NewExpense
```
> Add this `<NewExpense/>` in App.js

### Litening Inputs
Adding __onChange__ onProp in ExpenseForm

```jsx
return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>        
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Title</label>
          <input type="date" min="2019-01-01" max="2022-12-31" onChange={dateChangeHandler}/>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="Submit">Add Expense</button>
      </div>
    </form>
  );
```

### Adding States to Inputs
There are 2 possible ways to add states to the ExpenseForm
1. Multiple states: Each Input has it's own state
2. Single state: Entire form has a single state object consisting all the inputs

> Type 1: Multiple states
```jsx
const ExpenseForm = () => {
    // Example of Multiple States - Each Input has it's own state
    const [ enteredTitle, setEnteredTitle ] = useState('')
    const [ enteredAmount, setEnteredAmount ] = useState('')
    const [ enteredDate, setEnteredDate ] = useState('')
     
    const titleChangeHandler = (event) => {
        // Individual State update
        setEnteredTitle(event.target.value);
        
    }

    const amountChangeHandler = (event) => {
        // Individual State update
        setEnteredAmount(event.target.value)
    }

    const dateChangeHandler = (event) => {
        // Individual State update
        setEnteredDate(event.target.value)
    }
    
  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Title</label>
          <input type="date" min="2019-01-01" max="2022-12-31" onChange={dateChangeHandler}/>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="Submit">Add Expense</button>
      </div>
    </form>
  );
};
```

>Type 2: Entire form has a single state object consisting all the inputs
```jsx

const ExpenseForm = () => {
  // Example of Multiple States - Using 1 States (For Entire Form)
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  const titleChangeHandler = (event) => {
    // Collective State update
    setUserInput({
      ...userInput, // Copy all the properties of curr state
      enteredTitle: event.target.value, // Override the title property of curr state
    });
  };

  const amountChangeHandler = (event) => {
    // Collective State update
    setUserInput({
      ...userInput,
      enteredAmount: event.target.value,
    });
  };

  const dateChangeHandler = (event) => {
    // Collective State update
    setUserInput({
      ...userInput,
      enteredDate: event.target.value,
    });
  };
  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="Submit">Add Expense</button>
      </div>
    </form>
  );
};
```

> **NOTE: The above (Single State) implementation can fail at times.**
>
> It fails because the new State is dependent upon the previous state.
>
> And React uses State Scheduling which might not update the previous state and we can end up using the wrong previous state.
> 
> To avoid this problem, setProperty() can take in an anonymous function which will give us the access to the latest previous state.

> setProperty() when new state depends on the previous state
```jsx
setUserInput((previousState) => {
    return {
        ...previousState, // Copy all the properties of prev state
        enteredTitle: event.target.value, // Override the title property of prev state
        }
})
```

>Update the setProperty() (setUserInput()) in _ExpenseForm.js_
```jsx

const ExpenseForm = () => {
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  // Update the setProperty()
  const titleChangeHandler = (event) => {
    setUserInput((previousState) => {
    return {
        ...previousState, // Copy all the properties of prev state
        enteredTitle: event.target.value, // Override the title property of prev state
        }
    })
  };

  const amountChangeHandler = (event) => {
    setUserInput((previousState) => {
    return {
        ...previousState,
        enteredAmount: event.target.value,
        }
    })
  };

  const dateChangeHandler = (event) => {
    setUserInput((previousState) => {
    return {
        ...previousState,
        enteredDate: event.target.value,
        }
    })
  };

  .
  .
  .
};
```

### Listening Form Submit
In JSX of the form we can use __onSubmit__ (onProp) to handle form submits and create a submitFormHandler()

> 2-Way Binding: Data in the input field can be changed from the event listener,
> By:
> 
> 1. Adding a 'value' attribute to the input field (in jsx) which takes the current state.
> 
> 2. Updating the State from the event handler

> _ExpenseForm.js_
```jsx
const formSubmitHandler = (event) => {
    event.preventDefault();       // Prevents reloading of the page

    // Store the input data
    const newExpenseData = {
        title: enteredTitle,
        amount: enteredAmount,
        data: new Date(enteredDate)
    }

    /* Reseting the Inputs to blank - 2 Way Binding 
    * We can reset the state of the input fields
    * We can set these state values as 'value' attribute in Input Field
    */
    setEnteredTitle('')
    setEnteredAmount('')
    setEnteredDate('')
    
    // Send newExpenseData to App component in _App.js_
}
```

```jsx
return (
    <form onSubmit={formSubmitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          {/* Add the value field for 2 Way Binding */}
          <input type="text" onChange={titleChangeHandler} value={enteredTitle}/>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          {/* Add the value field for 2 Way Binding */}
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label>Title</label>
          {/* Add the value field for 2 Way Binding */}
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
            value={enteredDate}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="Submit">Add Expense</button>
      </div>
    </form>
  );
```

### Communicate Data Up to Parent
Once we collected the data we need to send it to the parent component so it can render a new ExpenseItem

> Child - Parent Communication
> ---
> 1. For this we use custom **onProps** on the parent and pass a handlerFunction().
>
> 2. This handlerFunction() function can be accessed as a normal prop by the Child component. This function will be called from the Child with the data to communicate.
> 
> Note 1: For nested components The communication needs to be step wise. From Child to Parent to Grand-Parent. React doesn't allow skipping of steps.
> 
> Note 2: By sending the data up, we are also sending the state of the component up to the parent. This can later be used to update state of related components.

To Send newExpenseData from the form to App component. We need to follow a chain of communication: ExpenseForm -> NewExpense -> App

1. Sending data ExpenseForm -> NewExpense
  
  > _NewExpense.js_: Creating **onSaveExpenseData** onProp
  ```jsx
  const saveExpenseDataHandler = (enteredExpenseData) =>{
    const expenseData = {
        ...enteredExpenseData,  // Data coming from child (ExpenseForm)
        id: Math.random().toString(),
    }

    // send this expenseData to Parent (App)
    }

    const newExpense = (props) => {
        return(<div className="new-expense">
            {/* onSaveExpenseData is a custom onProp used for communication bw ExpenseForm and NewExpense */}
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
        </div>)
    }
  ```

  > _ExpenseForm.js_: Using **onSaveExpenseData()** from __props__ 

  ```jsx
    const formSubmitHandler = (event) => {
      event.preventDefault();
      
      const newExpenseData = {
          title: enteredTitle,
          amount: enteredAmount,
          data: new Date(enteredDate)
      }

      setEnteredTitle('')
      setEnteredAmount('')
      setEnteredDate('')
      
      // Send Data to Parent (NewExpense)
      props.onSaveExpenseData(newExpenseData)
    }

  ```
   
2. Sending data NewExpense -> App
  
  > App.js_: Creating **onAddExpense** onProp
  ```jsx
    const addExpenseHandler = (expenseData) => {
    console.log("In App.js");
    // ExpenseData is the data coming from Child (NewExpense)
    console.log(expenseData);

    // Render this new data on screen
  }

  return (
    <div className="App">   
      {/* onAddExpense is a custom onProp used for communication bw NewExpense and App */}
      <NewExpense onAddExpense={addExpenseHandler} />
      <Card>
        <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
        ></ExpenseItem>
      </Card>
      <Card>
        <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
        ></ExpenseItem>
      </Card>
    </div>
  );
  ```

  > NewExpense.js_: Using **onAddExpense()** from __props__ 

  ```jsx
    const newExpense = (props) => {

    const saveExpenseDataHandler = (enteredExpenseData) =>{
        const expenseData = {
            ...enteredExpenseData,              // Data coming from child (ExpenseForm)
            id: Math.random().toString(),
        }
    
        // send this expenseData to Parent (App)
        props.onAddExpense(expenseData)
    }

    return(<div className="new-expense">
        {/* onSaveExpenseData is a custom onProp used for communication bw ExpenseForm and NewExpense */}
        <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
    </div>)
    }
  ```

# Rendering Dynamic Content
Till now, in our app we have added ExpenseItems statically by defining each item in App.js. This will not work for creating new ExpenseItems. To Create new ExpenseItems we need to render Dynamic Content.

> Before that, I have created another Component Expenses which stores all the ExpenseItems in it.

> *Expenses.js*
```jsx
import './Expenses.css';
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card"
import ExpensesFilter from './ExpensesFilter'

function Expense(props){
    return(
        <Card className="expenses" >
            <ExpensesFilter selectedYear={filterYear} onSelectFilter={selectFilterHandler} />
            <ExpenseItem title={props.expenses[0].title} amount={props.expenses[0].amount} date={props.expenses[0].date}></ExpenseItem>
            <ExpenseItem title={props.expenses[1].title} amount={props.expenses[1].amount} date={props.expenses[1].date}></ExpenseItem>
            <ExpenseItem title={props.expenses[2].title} amount={props.expenses[2].amount} date={props.expenses[2].date}></ExpenseItem>
            <ExpenseItem title={props.expenses[3].title} amount={props.expenses[3].amount} date={props.expenses[2].date}></ExpenseItem>
        </Card>
        
    )
}

export default Expense;
```

> *Expenses.css*
```css
.expenses {
    padding: 1rem;
    background-color: rgb(31, 31, 31);
    margin: 2rem auto;
    width: 50rem;
    max-width: 95%;    
}
```

> *App.js*
```jsx
import "./App.css";
// Importing Custom made components
import Expenses from './components/Expenses/Expenses'
import NewExpense from './components/NewExpense/NewExpense'

function App() {
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  const addExpenseHandler = (expenseData) => {
    console.log("In App.js");
    console.log(expenseData);

    // Render this new data on screen
  }

  return (
    <div className="App">   
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses}/>
    </div>
  );
}

export default App;
```
## Rendering Dynamic List
As we can see in *Expenses.js* ExpenseItem is statically defined hence to Dynamically Render such elements we can use the following.
{} can be used to run any valid JS code

> *Expenses.js*
```jsx
{props.expenses.map(expense => (
    <ExpenseItem 
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
    />
))}
```
> map() transforms every item in the array
> 
## Rendering Stateful Lists
To render our newExpenseItem we need to add this item to the expenses array. But doing that directly won't work hence we use State

> *App.js*
```jsx
{props.items.map((expense) => (
    <ExpenseItem
    key={expense.id}
    title={expense.title}
    amount={expense.amount}
    date={expense.date}
    />
))}
```
**The Key Attribute is an important attribute while rendering dynamic content as it help react to distinguish the elements and also where to position them. The Key attribute should have a unique value.**

## Rendering Conidtional Content

Methods
1. Using Ternary ( ? : ) Operator
2. Using Short circuiting and ( && )
3. Using Variables to store logic

> Using Ternary ( ? : ) Operator

```jsx
{
    props.items.length === 0 
    ? <p>No Content Found</p> 
    : props.items.map((expense) => (          
        <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
        />
        ))
}
```

> Using Short circuiting and ( && )
```jsx
{ props.items.length === 0 && <p>No Content Found</p> } 
{ props.items.length > 0 && props.items.map((expense) => (          
        <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
        />
        ))
}
```

> Using Variables to store logic
```jsx
let expensesContent = <p>No Expenses Found</p>
  if(props.items.length > 0){
    expensesContent = props.items.map((expense) => (          
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ))
  }

return { expensesContent }
```

# Dynamic Styling
Sometimes we need to apply conditions on the component while setting the style. Eg: Changing input color for invalid input.

This can be done using:
## Inline Styling
Adding Styles inline in the component in JSX with  Ternary operator ( ? : )

> To check if the input is valid or not we can create a boolean state which will hold the value of validity

`const [isValid, setIsValid] = useState(true);`

> Input is invalid if the field is empty

```jsx
if (enteredValue.trim().length === 0) {
  setIsValid(false);
  return;
}
```

> Input is valid if the input starts getting characters. In Input field event handler

```jsx
if(event.target.value.trim().length > 0) setIsValid(true)
```

> Applying Styles to Input tag according to isValid

**Inline style attribute takes a JS object with CSS properties in camelCase**
```jsx
<input
  style={{
    border: !isValid ? "2px solid red" : "2px solid black",
    backgroundColor: !isValid ? "salmon" : "transparent",
  }}
  type="text"
  onChange={goalInputChangeHandler}
/>
```

But this is not effecient as inline styles have the highest priority and it can overwrite the static class styles of the component.

## Class Styling
We can add pre defined classes with 'invalid' styles to a component using conditional logic inside className using JS-String_Tagging_Literals \`${}\`

> Invalid css-styles
```css
.form-control.invalid input {
  border-color: red;
  background: #fe9090;
}


.form-control.invalid {
  color: red
}
```

> Dynamic className
```jsx
<div className={`form-control ${!isValid ? 'invalid' : ''}`}>
  <label>Course Goal</label>
  <input
    type="text"
    onChange={goalInputChangeHandler}
  />
</div>
```

> Major Drawback of using css styles in components
> 
> CSS style that is defined for a particular component is globally declared
> for all the components.
> 
> This can cause style collisions if the Components have same classNames.
> >
> To avoid this we can use a third party library called styled-components

## Styled Components
A 3rd party library used to separate CSS for every component

### Declaring
```jsx
import styled from "styled-components";

const Button = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;
```

> The library uses `` for button object instantiation (Tagged Template Literal), which takes in the style that need to be applied on the component.
>
> Note we do not provide the '.button' class as the class name of the component is generated by Styled Component library. 
> >
> All the instances of nested '.button' in styling are replaced by **&**.
> 
> Eg: .button:focus{}   ->  &:focus()

### Dynamic styling
We can inject dynamic styles using conditional logic in styled components using props

> Using props array to check props.invalid using \`${}\` and ( ? : ) directly in style
```jsx
const FormControl = styled.div`
    margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${ props => props.invalid ? 'red' : 'black' };
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${ props => props.invalid ? 'red' : 'black' };
    background: ${ props => props.invalid ? 'salmon' : 'transparent' };
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }
`
```

> sending isValid state as invalid prop to styled component
```jsx
<FormControl invalid={ !isValid }>
  <label>Course Goal</label>
  <input
    type="text"
    onChange={goalInputChangeHandler}
  />
</FormControl>
```

### Media Queries
Media Query can be directly addedd to the styled component definition without the class name.

```jsx
const Button = styled.button`
  width: 100%;
  
  @media (min-width: 768px) {
    width: auto;
  }
`;
```
**Having CSS code inside js file can become cumbersome hence we can also use inbuilt css modules to limit the scope of styling**

## Inbuilt - CSS Modules

### Declaring
>Instead of naming css files as *Component.css* , name them **Component.module.css**

> In *Component.js* file

```jsx
import styles from "./Button.module.css";

const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
```

> note: The className is not static and it is dynamic, obtained by **styles.property** or **styles['property-name']**

### Dynamic Styling
To add dynamic styling we can use the similar approach of sending className dynamically

```jsx
<div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
  <label>Course Goal</label>
  <input
    type="text"
    onChange={goalInputChangeHandler}
  />
</div>
```

### Media Queries
To add media queries, simply change the *Component.module.css* file

```css
.button {
  width: 100%;
}

@media (min-width: 768px) {
  .button{
    width: auto;
  }
}
```