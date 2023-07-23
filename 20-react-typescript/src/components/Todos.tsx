import React from 'react'
import { TodosContext } from '../context/todos-context';
import TodoItem from './TodoItem'
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