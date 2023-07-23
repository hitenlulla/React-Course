# Creating React App with Typescript config
> npx create-react-app my-app --template typescript

# Working with props in TS
```tsx
import React from 'react'

// React.FC is a generic funcitonal component type provided by React.
// We add items:string as our type in <{}>. This tells that props will recieve items.
// For optional props we can add a ?. eg- <{items?: string}>
const Todos: React.FC<{items: string[]}> = (props) => {
  return (
    <ul>
        {props.items.map(item => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default Todos
```

> Now if items is not a sting but an object, we will have to add convert that object into a type using concept of classess

> In *src/models/todo.ts*

```ts
class TodoModel {
  id: string;
  text: string;

  constructor(text: string) {
    this.id = new Date().toISOString();
    this.text = text;
  }
}

export default TodoModel;
```

Now every Todo item should be converted to this model like
```ts
const TODOS = [
    new TodoModel('learn react'), 
    new TodoModel('learn typescript')
]
```

And the components props can now be changed from string[] to TodoModel[]
```tsx
import React from 'react'
import TodoModel from '../models/todo'

// items is now an array of objects of type TodoModel
const Todos: React.FC<{items: TodoModel[]}> = (props) => {
  return (
    <ul>
        {props.items.map(item => <li key={item.id}>{item.text}</li>)}
    </ul>
  )
}

export default Todos
```

# Submiting Forms
Defining a form
```tsx
import React from 'react'
import { useRef } from 'react'

// Passing onFunctions as props
const NewTodo:React.FC<{onAddTodo: (text:string) => void}> = (props) =>{
    // We need to tell useRef the type of HTML element it will refer
    // And we need to assign a default value to hook
    const todoTextInputRef = useRef<HTMLInputElement>(null)
    
    // event is of type FormEvent
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        // The ? is added because the ref's current value can be null
        // const enteredText = todoTextInputRef.current?.value

        // But we can replace it with !, if we are sure that this value will always exist
        const enteredText = todoTextInputRef.current!.value
        if(enteredText.trim().length === 0){
            return
        }

        props.onAddTodo(enteredText)
    }

  return (
    <form onSubmit={submitHandler}>
        <label htmlFor='text'>Todo Text</label>
        <input type='text' id='text' ref={todoTextInputRef}></input>
        <button>Add Todo</button>
    </form>
  )
}

export default NewTodo
```

Sending the onProps
```tsx
function App() {
  // Defining state wuith generic type
  const [todos, setTodos] = useState<TodoModel[]>([])

  const addTodo = (text: string) => {
    const newTodo = new TodoModel(text)

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo)
    })
  }

  return (
    <div>
      <NewTodo onAddTodo={addTodo}/>
      <Todos items={todos}/>
    </div>
  );
}

export default App;
```

# Context API
1. Defining context
```tsx
import React from 'react'
import TodoModel from '../models/todo'
import { ReactNode } from 'react'
import { useState } from 'react'

// Defining the context tpye: for typescript
type TodosContextObj = {
    items : TodoModel[],
    addTodo: (text:string) => void,
    removeTodo : (id: string) => void 
}

// Creating context of the above declared type
export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: (text: string) => {},
    removeTodo : (id: string) => {}
})

// Creating context provider with chilren props
const TodosContextProvider: React.FC<{children: ReactNode}> = (props) => {
    const [todos, setTodos] = useState<TodoModel[]>([])

  const addTodo = (text: string) => {
    const newTodo = new TodoModel(text)

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo)
    })
  }

  const removeTodo = (id:string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }
  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodo,
    removeTodo: removeTodo
  }
  
  return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>
}

export default TodosContextProvider
```

2. Using the context in components
```tsx
import React from 'react'
import TodoItem from './TodoItem'
import { TodosContext } from '../context/todos-context';
import { useContext } from 'react';

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext)  
  return (
    <ul>
        {todosCtx.items.map(item => <TodoItem key={item.id} text={item.text} onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}/>)}
    </ul>
  )
}

export default Todos
```

