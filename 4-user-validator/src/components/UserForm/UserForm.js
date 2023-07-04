import React, { useState } from "react";
import style from "./UserForm.module.css";
import Button from "../UI/Button/Button";

export default function UserForm(props) {
  const [userInput, setUserInput] = useState({
    username: "",
    age: "",
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // The input is valid and we can add the user to the userList
    props.onAddUser(userInput);
  };

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

  return (
    <form className={style.input} onSubmit={formSubmitHandler}>
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        value={userInput.username}
        onChange={(event) => {
          inputChangeHandler("username", event.target.value);
        }}
      ></input>

      <label for="age">Age (Years)</label>
      <input
        id="age"
        type="number"
        value={userInput.age}
        onChange={(event) => {
          inputChangeHandler("age", event.target.value);
        }}
      ></input>

      <Button type="submit">Submit</Button>
    </form>
  );
}
