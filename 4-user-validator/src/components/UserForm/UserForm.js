// import React, { useState } from "react";
import React, { useRef } from "react";
import style from "./UserForm.module.css";
import Button from "../UI/Button/Button";

/**
 * !If we use refs in a component - it is called as Uncontrolled component
 * !If we use state in a component - it is called as Controlled component
 */
export default function UserForm(props) {
  /* reading input values using keylogger - State based 
  const [userInput, setUserInput] = useState({
    username: "",
    age: "",
  });

  
  const inputChangeHandler = (key, value) => {
    switch (key) {
      case "username":
        setUserInput((prevInput) => {
          return {
            ...prevInput,
            username: value,
          };
        });
        break;
        case "age":
          setUserInput((prevInput) => {
            return {
              ...prevInput,
              age: value,
            };
          });
          break;
          default:
            break;
          }
        };
  */

  // Reading input values using refs
  const inputName = useRef();
  const inputAge = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // The input is valid and we can add the user to the userList
    props.onAddUser({
      username: inputName.current.value,
      age: inputAge.current.value,
    });

    // ! Ideally you should not manipulate refs, but in this case it is fine
    inputName.current.value = "";
    inputAge.current.value = "";
  };

  return (
    <form className={style.input} onSubmit={formSubmitHandler}>
      <label htmlFor="username">Username</label>
      {/* State bases input field */}
      {/* <input
        id="username"
        type="text"
        value={userInput.username}
        onChange={(event) => {
          inputChangeHandler("username", event.target.value);
        }}
      ></input> */}

      {/* ref based input field */}
      <input id="username" type="text" ref={inputName}></input>

      <label htmlFor="age">Age (Years)</label>
      {/* State bases input field */}
      {/* <input
        id="age"
        type="number"
        value={userInput.age}
        onChange={(event) => {
          inputChangeHandler("age", event.target.value);
        }}
      ></input> */}
      {/* ref based input field */}
      <input id="age" type="number" ref={inputAge}></input>

      <Button type="submit">Submit</Button>
    </form>
  );
}
