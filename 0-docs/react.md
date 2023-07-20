****# React - Deep dive
- [Introduction](#introduction)
- [Installing dependencies](#installing-dependencies)
- [Creating a react app](#creating-a-react-app)
- [Components](#components)
  - [Creating a component](#creating-a-component)
    - [Simple Component](#simple-component)
    - [Complex Components](#complex-components)
  - [Importing](#importing)
  - [Styling (Static)](#styling-static)
  - [Injecting dynamic data into components](#injecting-dynamic-data-into-components)
  - [Sending Data to child component using **Props**](#sending-data-to-child-component-using-props)
  - [Wrapper Components - **ChildrenProps**](#wrapper-components---childrenprops)
  - [Event Listeners - **onProps**](#event-listeners---onprops)
- [State](#state)
  - [Implementing State](#implementing-state)
  - [User Inputs (Forms)](#user-inputs-forms)
    - [Collecting Input](#collecting-input)
    - [Litening Inputs](#litening-inputs)
    - [Adding States to Inputs](#adding-states-to-inputs)
    - [Listening Form Submit](#listening-form-submit)
    - [Communicate Data from Child to Parent (Up)](#communicate-data-from-child-to-parent-up)
    - [Communicate State-Setter from Parent to Child (Down)](#communicate-state-setter-from-parent-to-child-down)
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
- [Fragments](#fragments)
- [Portals](#portals)
- [Refs](#refs)
  - [Declaring a ref](#declaring-a-ref)
  - [Connecting Ref to HTML element](#connecting-ref-to-html-element)
  - [Using the ref to read value of input (DOM Element)](#using-the-ref-to-read-value-of-input-dom-element)
  - [Using ref to do DOM manipulation](#using-ref-to-do-dom-manipulation)
- [Effects / Side-Effects](#effects--side-effects)
  - [**useEffect()**:](#useeffect)
  - [Defining a **useEffect**](#defining-a-useeffect)
    - [Without dependencies](#without-dependencies)
    - [With dependencies](#with-dependencies)
  - [Cleanup function](#cleanup-function)
- [Complex State Updates - Reducer](#complex-state-updates---reducer)
  - [**useReducer()**](#usereducer)
  - [Defining a **useReducer()**](#defining-a-usereducer)
  - [Updating states using actions](#updating-states-using-actions)
  - [When to use **useReducer()** vs **useState()**](#when-to-use-usereducer-vs-usestate)
    - [useState():](#usestate)
    - [useReducer():](#usereducer-1)
- [Context API:](#context-api)
  - [Defining a **Context**](#defining-a-context)
  - [**Providing** the context with **value** attr](#providing-the-context-with-value-attr)
  - [Consuming the context](#consuming-the-context)
    - [Using **Consumer**](#using-consumer)
    - [Using **useContext()** Hook](#using-usecontext-hook)
  - [Creating a custom context provider Component](#creating-a-custom-context-provider-component)
    - [Limitations](#limitations)
- [Forwarded Refs](#forwarded-refs)
- [React Optimization techniques](#react-optimization-techniques)
    - [React Memo](#react-memo)
    - [useCallback hook](#usecallback-hook)
    - [useMemo hook](#usememo-hook)
- [Building custom hooks](#building-custom-hooks)
    - [Why do we need cusom hooks?](#why-do-we-need-cusom-hooks)
- [Sending HTTP requests](#sending-http-requests)
    - [Sending a GET request](#sending-a-get-request)
    - [Sending a POST request.](#sending-a-post-request)
    - [custom HTTP hook for all types of requests](#custom-http-hook-for-all-types-of-requests)
      - [Creating useHTTP hook](#creating-usehttp-hook)
      - [Using useHTTP hook to GET](#using-usehttp-hook-to-get)
      - [Using useHTTP hook to POST](#using-usehttp-hook-to-post)
- [Animating React components](#animating-react-components)

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

# Installing dependencies
 1. Install the latest node LTS version [Node](https://nodejs.org/en/download/).
 2. I installed node v16.15.0
 3. Use the create-react-app tool from [Github](https://github.com/facebook/create-react-app)
   
# Creating a react app 
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
    Reusable Blocks of code that are used to build widgets on webpage. 
    Example: Cards, Sidebar
    
    Components are also used for *Separation of Concerns* i.e. All the component code is separated into their individual files.

2. #### What are components made of
    Components are made by combining
     
    * HTML 
    * CSS  
    * JavaScript

3. #### React and Components
    React allows to create re-usable and reactive components using declarative approach
     
    As a developer, we need to define the desired target state and let React figure out the actual JS-DOM operations that need to be performed to reach the desired state. Example: opening a sidebar on a button click.

## Creating a component
### Simple Component
Components are created using JSX - A special syntax for JS + XML
1. create a directory named 'components' in src/
2. Create a file with name of your component following the naming convention
Example: **ExpenseItem.js**

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
**NOTE**: A component can only return a single JSX item. 

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

## Injecting dynamic data into components
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

## Sending Data to child component using **Props**
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


## Wrapper Components - **ChildrenProps**
Components that are only used to provide certain functionality to enclosing components

For example: Card component can wrap other components which should be styled like cards.

```jsx
<Card><ExpenseItem /></Card>
```

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

__*Concept of Composition* helps to avoid repetition of style code by creating wrapper Components__

## Event Listeners - **onProps**
In react, we use **onProps**. They are the attributes which handles event triggers.

onProps can be of type: onClick, onChange, etc

onProps can be added to any component as follows
```html
<button onClick={clickHandler}>Change Title</button>
```

```jsx
const clickHandler = () =>{
    console.log("Clicked");
}
```

The onClick prop takes reference to function (clickHandler) which should be executed when the button is clicked.

If we try to change the title of the ExpenseItem using clickHandlers. It will not work.

```jsx
const clickHandler = () =>{
  props.title = "This is the new title"
}
```
This will not change the title of the ExpenseItem

Why does this not work?

A component is just a function. 
We don't call this function, React does -
While building the Component on page.
Once the component is built react is unaware of any changes made to the Component.

To notify react that something has to be changed - We use concept of **States**


# State
1. ### What is **State**
    A State is a special object (hook) in React that contains the data or information about the component. 
  
    If we need to change that data, we can change the state of the component. 
  
    Changing the state of a component, re-evaluates it on the screen and the update is successfully seen.
    
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

## User Inputs (Forms)
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

### Communicate Data from Child to Parent (Up)
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

### Communicate State-Setter from Parent to Child (Down)

If we want to update state of the Parent component using an event from the Child component.

We can use props to send state updater from parent to child.

Eg: Rendering a Modal component when wrong information is entered in the form (Form Data -> Modal). And closing the modal from a button present on it (Modal -> Form Data).

> _ExpenseForm.js_: Using **props** to send state setter via event handler

  ```jsx
    const [error, setError] = useState(null);
    
    const errorHandler = () => {
      setError(null);
    };
    
    const formSubmitHandler = (event) => {  
      // Form validation - setError to non null
      if(enteredTitle.length === 0 || +enteredAmount === 0) {
        setError("Error", "Input can't be blank")
        return;
      }
      .
      .
      .
    }

    // return a modal if curr state of error is not null and return the form
    // onConfirm attr is used to send errorHandler to Child(Modal) which is used to setError to null
    return(
      <div>
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )}
        <form onSubmit={addExpenseHandler}>
        .
        .
        .
        </form>
      </div>

    )

  ```

> In *Backdrop.js*
```jsx

// If the backdrop is clicked or the button is clicked, the onConfirm [errorHandler from parent(ExpenseForm)] is called which calls the setError(null) and closes the modal.
const ErrorModal = (props) => {
  return (
    <div>
      <div class="backdrop" onClick={props.onConfirm} />
      <div>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
        <button onClick={props.onConfirm}>Okay</button>
      </div>
    </div>
  );
};

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

# Fragments
JSX has a major drawback that we can only return a single element from the component.

```jsx
const Component = (props) => {
  return (
    <h2>Hello</h2>
    <p>Hi</p>
  );
};
```

> **The above code does not work**

To solve this drawback we can use a <div> and encapsulate the JSX within it.

```jsx
const Component = (props) => {
  return (
    <div>
      <h2>Hello</h2>
      <p>Hi</p>
    </div>
  );
};
```

In complex applications, A lot of divs will be rendered on the page, creating a div-soup. This can make the app slow.

Another work around is to use a **Wrapper Component**
> In *Wrapper.js*
```jsx
const Wrapper = () => {return props.children}
export default Wrapper
```

> In *Component.js*
```jsx
import Wrapper from './Wrapper'

const Component = (props) => {
  return (
    <Wrapper>
      <h2>Hello</h2>
      <p>Hi</p>
    </Wrapper>
  );
};
```
**Wrapper component** is a dummy component that tricks React to believe that only one element is returned.

We don't need to do this on our own as React provides a Component called **Fragment**

```jsx
import React, { Fragment } from 'react'

const Component = (props) => {
  return (
    <Fragment>
      <h2>Hello</h2>
      <p>Hi</p>
    </Fragment>
  );
};
```

or another syntax is using <>-</>.
>**But this doesn't work in all the react versions**
```jsx
import React, { Fragment } from 'react'

const Component = (props) => {
  return (
    <>
      <h2>Hello</h2>
      <p>Hi</p>
    </>
  );
};
```

# Portals
React renders all the Components inside a div 'root'. This breaks the HTML semantics.

For example, The Backdrop and Modal should not be inside the root div and should be at the top of the HTML document.

To solve this, we can portal the Backdrop and Modal components to a custom div we make in *public/index.html*

> In *public/index.html*
```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="backdrop-root"></div>
  <div id="overlay-root"></div>
  <div id="root"></div>  
</body>
```

Create a portal in Component file - ReactDOM.createPortal()

> In ErrorModal.js
```jsx
import React from "react";
import ReactDOM from "react-dom";

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}

      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};
```

# Refs
A special hook used to create a reference link between HTML element and React code. i.e. Get access of DOM elements to work with them. 

For example: We can create a ref on a input tag to get the input value without using states on each keystroke.

## Declaring a ref
```js
const nameInputElement = useRef();
```

## Connecting Ref to HTML element
Using a ref attribute on JSX element
```html
<input id="username" type="text" ref={nameInputElement} />
```

## Using the ref to read value of input (DOM Element)
```jsx
console.log(nameInputElement.current.value)
```

## Using ref to do DOM manipulation
Refs can also be used for DOM manipulation but it is preferred **not to be used**.

Simple manipulations like reseting the value field of input can be considered.
```jsx
nameInputElement.current.value = ''
```

Note: The Components that use refs are called *Uncontrolled Components* as they are not controlled by React.

*Controlled Components* are components that use State management of react.

# Effects / Side-Effects
Main task of React is to render components on the webpage. Components are rendered on the screen when the app starts or when the State of the app changes.

Suppose we want to change the state of the component on a HTTP request, and we define the HTTP calling inside the component function. Whenever the component will be rendered an HTTP call will be made, which will inturn render the component again. This can cause an infinite loop. This is an example of a side effect.

To overcome the problem we can use a special react hook **useEffect()**

## **useEffect()**:
`useEffect(()=> {}, [])`

It takes two parameters, An arrow function which consists of side effect tasks to be performed. And an array of dependencies that define when the arrow function should be executed.

## Defining a **useEffect**
### Without dependencies
> Eg: On page refresh, check if user was logged in using browser's localStorage. And keep him logged in.
> >
> Blank [] dependencies means there will not be any change in dependencies hence this function will only run once on start.
```jsx
useEffect(()=>{
  if(localStorage.getItem('isLoggedIn') === '1')  setIsLoggedIn(true)
},[])
```

### With dependencies
> Validate form if the entered email and password are valid. Run this function everytime the enteredEmail and enteredPassword change.

```jsx
useEffect(() => {
  setFormIsValid(
    enteredEmail.includes('@') && enteredPassword.trim().length > 6
  );
}, [enteredEmail, enteredPassword]);
```

## Cleanup function
useEffect() returns a function, and that function runs before the next execution of useEffect.

This can be used for **debouncing**: Wait for the user to finish typing the email and password and then validate the form. (As validating on every keystroke will cause a lot of state updates and network traffic).

```jsx
useEffect(() => {
  // Set a timer for 500ms for validating form every keystroke
  const timer = setTimeout(() => {      
    setFormIsValid(        
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
  }, 500)    

  // Cleanup function
  return () => {
    // Clear the timer for every keystroke.
    // Only the last keystroke will have a timer
    clearTimeout(timer)
  }
}, [enteredEmail, enteredPassword]);
```

# Complex State Updates - Reducer

When one state is changing by taking the current value of some other state (States are dependent), State Scheduling of react can cause issues. Hence to manage such complex states we use useReducer().

## **useReducer()**
`const [ currState, dispatchFn ] = useReducer(reducerFn, initState, initFn)`

> **currState**: Gets the latest snapshot of the state.
> 
> **dispatchFn**: A Fn used to dispatch a new action(trigger on state update).
> >
> **reducerFn**: A function that is automatically triggered once an action is dispatched (via dispatchFn()) - It receives the latest snapshot of the state and should return the new updated state.
> 
> `(prevState, action) => newState`
> >
> **initState**: Initialize `currState` with a value.
> >
> **initFn**: A Fn used to set the `currState` programmatically.

## Defining a **useReducer()**
Example: Handle state for email input and if it's valid. Conventionally we will use 2 states and the validity state depends upon the current value of email input. This is a complex state management hence we use useReducer()

```jsx
const [emailState, dispatchEmail] = useReducer(
    // reducerFn
    (prevState, action) => {
      // newState is blank if there is no defined type of action
      let newState = { value: "", isValid: false };

      // ACTION of type USER_INPUT
      if (action.type === "USER_INPUT") {
        // newState takes value of the payload of action, 
        // and validity check is also made on the payload of action.
        newState = {
          value: action.payload,
          isValid: action.payload.includes("@"),
        };
      }

      // ACTION of type INPUT_BLUR
      if (action.type === "INPUT_BLUR") {
        // newState takes the value of previous state
        // and validity check is also made on the value of previous state.
        newState = {
          value: prevState.value,
          isValid: prevState.value.includes("@"),
        };
      }

      // reducerFn gets the current state & action and returns the newState
      return newState;
    },
    // initState
    { value: "", isValid: undefined }
  );
```
`emailState` is an {} of states that contain the value and validity.

The Email state value can be accessed using `emailState.value`.

And the Email validity state value can be accessed using `emailState.isValid`.

## Updating states using actions

An **Action** is a value that is given to ReducerFn(). It is usually an object with a *type and payload*. To pass it to ReducerFn we need to use the **dispatchFn()**.

In a complex reducer, the **type** is used to handle state management of different properties. The **payload** is the new value of the state of a particular property.

```jsx
const emailChangeHandler = (event) => {
  // Update the state of email with curr input value by dispatching the action.
    dispatchEmail({
      type: "USER_INPUT",
      payload: event.target.value,
    });
  };
```

```jsx
const validateEmailHandler = () => {
  // Update the state of email validity by dispatching the action.
    dispatchEmail({
      type: "INPUT_BLUR",
      payload: "",
    });
  };
```

Now this `emailState` can be used in `useEffect()` to validate Form and make sure that the setFormIsValid() gets the most recent snapshot of the emailState.
Also as dependency to useState to avoid running useState every time the input value changes and only run it when the validity changes.

```jsx
useEffect(() => {
  const timer = setTimeout(() => {      
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  }, 500);

  return () => {
    clearTimeout(timer);
  };
}, [emailState.isValid, passwordState.isValid]);
```

## When to use **useReducer()** vs **useState()**

### useState():
  - Main management tool
  - Great for independent pieces of state / data.
  - Great if the updates are easy and limited to a few kind of updates.

### useReducer():
  - Should be considered if you have related pieces of state / data
  - Can be helpful for more complex state updates.

# Context API:
When we want to use a state in different parts of the app, state / data is sent from the leaf of the component tree to root of the tree (Using up communication) and then sent to the required components (Using down communication). This creates a chain of state propagation which is very difficult to handle. To solve this we use **React Context**

**React Context** is a component wide, behind-the-scenes **State Storage** provided by react to handle passing states without a prop-chain

## Defining a **Context**
> In *src/* create a directory *context/*
> >
> Create the context file. eg: *auth-context.js*

```jsx
import React from 'react';

// createContext() takes in object with default state values and function ref that needs to be passed to other components.
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout : () => {}
});

export default AuthContext;
```

## **Providing** the context with **value** attr
For a component to get access of the context, we need to **Wrap it** inside the **Provider**

A provider is defined where the state is declared. It takes a **value attribute** which is an object used to **change the state inside the context**

> Note: The state inside the context can also contain references to functions that can be called by child consuming elements.
> 
```jsx
import AuthContext from './context/auth-context'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, 
            onLogout: logoutHandler }}>
        <MainHeader/>      
      </AuthContext.Provider>
  );
}
```

All the components (Children, GrandChildren, etc) inside the Provider gets the access to context.

## Consuming the context

### Using **Consumer**
Using the state present in the context. To do so, wrap the component in **Consumer**

**Consumer** provides an arrow function with context which can be used for the state values

```jsx
import AuthContext from "../../context/auth-context";

const LogoutBtn = () => {
return (  
  <AuthContext.Consumer>
    {/* Arrow Function with ctx as Context */}
    {(ctx) => {
      return(  
        {/* ctx.isLoggedIn is state stored in context */}   
        {/* ctx.onLogout is function ref stored in context */}  
        {ctx.isLoggedIn && (
          <button onClick={ctx.onLogout}>Logout</button>
        )}
      );
    }}
  </AuthContext.Consumer>
);
};
```

### Using **useContext()** Hook
```jsx
import {useContext} from 'react';
import AuthContext from "../../context/auth-context";

const LogoutBtn = () => {

  // Define a variable to get value of the context
  const ctx = useContext(AuthContext);
  
  return(  
    {/* ctx.isLoggedIn is state stored in context */}    
    {/* ctx.onLogout is function ref stored in context */}  
    {ctx.isLoggedIn && (
      <button onClick={ctx.onLogout}>Logout</button>
    )}
  );
};
```

## Creating a custom context provider Component
To keep a certain functionality available app wide, we can create a component for the Provider with states and functions that should be accessible app wide.

> In *src/context/auth-context.js*
```jsx
import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout : () => {},
    onLogin : (email, password) => {}
});

// Named Component Export
export const AuthContextProvider = (props) => {
    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "1") setIsLoggedIn(true);
      }, []);
    

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true)
    }

    return (
        <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
            {props.children}
        </AuthContext.Provider>
    )
}

// Default Export
export default AuthContext;
```

> Provide Context App wide - *index.js*

Enclose `<App /> in <Provider>`

```jsx
// Importing named exported component
import {AuthContextProvider} from "./context/auth-context";

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
```

> Consume the context using useContext() hook - *App.js*

```jsx
// Importing default exported component
import AuthContext from "./context/auth-context";

function App() {
  const ctx = useContext(AuthContext)

  return (
    <main>
      {!ctx.isLoggedIn && <Login />}
      {ctx.isLoggedIn && <Home />}
    </main>
  );
}

```

### Limitations
- Not optimized for high frequency changes i.e. frequent state changes.
- Not a replacement of props as it will make the component non re usable.
  
# Forwarded Refs
React does not allows us to assign refs to custom components (directly)
But there will be cases when we want to access the DOM of our component
To assign refs, react provides us with
> React.forwardRef((props, forwardedRef) => {})
>
> forwardRef takes the React component function as parameter and also provides the forwarded ref to it

Consider building an Input component which needs to be focused from the parent component

`To expose the focus() of html:<input> we use the useImperativeHandle React Hook`
```jsx
const Input = React.forwardRef((props, forwardedRef) => {
  const inputRef = useRef();
  
  const activate = () => {
    inputRef.current.focus();
  };
  
  // Used to expose the activate function to forwadrding component as focus()
  useImperativeHandle(forwardedRef, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
```
`To access the html:<input> inside Component:<Input> we forward a ref`

```jsx
const emailRef = useRef();
if (!emailState.isValid) {
      // We can use focus() because it is exposed by useImperativeHandle hook
      emailRef.current.focus();
}

<Input
    ref={emailRef}
    id="email"
    label="Email"
    type="email"
    isValid={emailState.isValid}
    onChange={emailChangeHandler}
    onBlur={validateEmailHandler}
/>
```
# React Optimization techniques
We know that when state of any component changes, it re-renders the component.
Incase of a component tree where a parent component has a big branch of children, if the parent component re-renders, all the direct and indirect children components will be re-rendered. Re-rendering is not optimal if there is no change in children component DOM.

Hence to avoid rendering of a component we can use
### React Memo
> React.memo()

This takes a react component function as a input
And only renders this component if there has been a change in the incoming props

```jsx
import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  console.log('Button RUNNING');
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

// Enclosing a react component in React.memo() makes sure 
// that this component only gets rendered, when there is a change in incoming props
export default React.memo(Button);
```

But when the parent component that uses this button renders, the onClick listener defined in the parent will be recreated. That is, a new function reference will be created, and sending this reference as a prop will still render the `<Button>` component.

Hence to avoid recreation of such functions we use
### useCallback hook

It takes the function that needs to be stored in memory of react, 
and not get defined again when the component renders due to state change

It also takes a second parameter which is the dependency array, which defines when the function should be recreated

```jsx
const buttonClickListener = useCallback(() => {
    setListTitle("New Title");
  }, []);
```

Now when the parent is rendered, this function's reference will still remain the same, inturn no rendering the button component again.

Now consider that the `<Button>` component takes an array (or object) as a prop, when the parent is re-rendered, the reference to this array will change which will render the Button component again.

To fix this we can use
### useMemo hook
It takes a function which returns data, this data will be stored in memory of react, and not get defined again when component renders due to state change 

And a dependency array which will tell when to render this data again.

```jsx
// example: Without dependency
// Do not create a new array when this component is rendered
const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

// Example: With dependency
// sort the elements only if there is change to the incoming items
const sortedList = useMemo(() => {
    return items.sort((a, b) => a - b);
  }, [items]);
```

Using all three optimizers in conjunction helps us to avoid unwanter component and function, array, objects re-rendering

# Building custom hooks
### Why do we need cusom hooks?

Custom hooks are JS functions that are used to outsource stateful logic to various components

Example: Consider an input field where we need to validate the input field as follows

This hook should only notify the following
1. If a user touched the field and left it without typing
2. If a user adds an invalid value
3. If user leaves the input blank
4. The entered value

Such hook can be created as follows
```jsx
import { useState } from "react";

// Takes a function as input which will be run to validate the input value
const useInput = (validateValue) => {
  // States to get the entered value and to know if input was touched
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // Derived states to check if the name input field is valid, derived from above states
  const isValueValid = validateValue(enteredValue);
  const hasError = !isValueValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    enteredValue,
    isValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
```

The purpose of this **useInput** hook is to only notify user about the changes in state of the input field.

Using the hook:
```jsx
import useInput from "../../hooks/use-input";
const Form = (props) => { 
  // Validator function
  const nameValidator = (name) => !isEmpty(name)

  // Hook implementation
  const {
      enteredValue: enteredName,
      isValueValid: isNameValid,
      hasError: NameHasError,
      inputChangeHandler: NameInputChangeHandler,
      inputBlurHandler: NameInputBlurHandler,
      reset: resetNameInput,
    } = useInput(nameValidator);

  /*
    Now the enteredName, isNameValid, NameHasError can be used to get the value and validate the form here. 
    NameInputChangeHandler and NameInputBlurHandler can be used for onProps in the <input> 
    reset can be used to reset the enteredValue to ''
  */

  return (
    <form onSubmit={confirmHandler}>
      <div>
        <label htmlFor="name">Your Name </label>
        {NameHasError && (
          <p>Name cannot be blank</p>
        )}
        <input
          type="text"
          id="name"
          onChange={NameInputChangeHandler}
          onBlur={NameInputBlurHandler}
          value={enteredName}
        />
      </div>
      <button>Confirm</button>
    </form>
  )
}
```

# Sending HTTP requests
**NOTE**: Sending HTTP request is a side-effect. Hence should be used inside a useEffect(). And the requests should always be asynchronous.

Sending HTTP requests to change a component on change in state of some other component can cause infinite rendering.

### Sending a GET request
```jsx
function App(){
  const fetchMoviesHandler = async () => {
    try {
      const response = await fetch(
        "http://this-is-a-dummy-url.com"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("Movies", data)
    } catch (error) {
      console.error("Failed to fetch movies due to", error)
    }
  };
}
```

### Sending a POST request.
```jsx
function App(){
  const sendMovieHandler = async (data) => {
    try {
      const response = await fetch(
        "http://this-is-a-dummy-url.com",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send cart data");
      }
      console.log("Added Movie successfully")
    } catch (error) {
      console.error("Failed to send movies due to", error)
    }
  };
}
```

### custom HTTP hook for all types of requests
#### Creating useHTTP hook
```jsx
import { useState, useCallback } from "react";

const useHttp = () => {
  // State to handle loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to handle errors if any
  const [error, setError] = useState(null);

  // Requesting function that takes the request {} and responseHandler()
  const sendRequest = useCallback(async (request, responseHandler) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        headers: request.headers ? request.headers : {},
        body: request.body ? JSON.stringify(request.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      responseHandler(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return { isLoading, error, sendRequest };
};

export default useHttp;
```

#### Using useHTTP hook to GET
```jsx
import useHttp from "../../hooks/use-http";
function App(){
  const { isLoading, error, sendRequest } = useHttp();

  const responseHandler = (response) => {
    const task = { id: response.id, text: response.task };
    console.log("Fetched task", task)
  };

  sendRequest(
    {
      url: "https://react-http-5463b-default-rtdb.firebaseio.com/tasks.json",
      method: "GET",
    },responseHandler);
  
  return (
      {isLoading && <p>Request in process</p>}
      {error && <p>{error}</p>}
  );
}
```

#### Using useHTTP hook to POST
```jsx
import useHttp from "../../hooks/use-http";
function App(){
  const { isLoading, error, sendRequest } = useHttp();

  const responseHandler = (response) => {
    const createdTask = { id: response.id, text: response.task };
    console.log("Added a new task", createdTask)
  };

  sendRequest(
    {
      url: "https://react-http-5463b-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: JSON.stringify({ text: taskText }),
      headers: {
        "Content-Type": "application/json",
      },
    },responseHandler);
  
  return (
      {isLoading && <p>Request in process</p>}
      {error && <p>{error}</p>}
  );
}
```

# Animating React components