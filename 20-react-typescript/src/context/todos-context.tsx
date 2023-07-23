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