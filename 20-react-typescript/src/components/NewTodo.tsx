import React, { useContext } from 'react'
import { useRef } from 'react'
import { TodosContext } from '../context/todos-context'

// Passing functions as props
const NewTodo:React.FC = () =>{
    const todosCtx = useContext(TodosContext)
    // We need to tell useRef the type of element it will refer
    // And we need to assign a default value to hook
    const todoTextInputRef = useRef<HTMLInputElement>(null)
    
    // Form submit event is of type FormEvent
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        // The ? is added because the ref's current value can be null
        // const enteredText = todoTextInputRef.current?.value

        // But we can replace it with !, if we are sure that this value will always exist
        const enteredText = todoTextInputRef.current!.value
        if(enteredText.trim().length === 0){
            return
        }

        todosCtx.addTodo(enteredText)
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