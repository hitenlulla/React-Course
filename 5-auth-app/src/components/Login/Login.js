import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";

// State updated functions need not be a part of the component, as it doesn't use any components properties
const emailStateUpdater = (prevState, newState) => {
  switch (newState.type) {
    case "USER_INPUT":
      // Update the state's value and isValid with new user input
      return { value: newState.value, isValid: newState.value.includes("@") };
    case "INPUT_BLUR":
      // Keep the state's value and isValid to prevState
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      return { value: "", isValid: false };
  }
};

const passwordStateUpdater = (prevState, newState) => {
  switch (newState.type) {
    case "USER_INPUT":
      return {
        value: newState.value,
        isValid: newState.value.trim().length > 6,
      };
    case "INPUT_BLUR":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      return {
        value: "",
        isValid: null,
      };
  }
};

const Login = (props) => {
  /* Replacing useState with useReducer
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  */

  const [emailState, dispatchEmail] = useReducer(emailStateUpdater, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordStateUpdater, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  // We need to set the form validity when enteredEmail or enteredPassword changes
  // This can also be treated as a side-effect because of dependency on other states
  // hence we can use useEffect with dependencies
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Validating form inputs");
      // We don't want to validate form inputs very frequently, because this is usually an http call and can lead to network usage, hence we use a timeout function
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    // Cleanup function - Gets called before every execution of the side-effect function
    return () => {
      console.log("Cleaning up");
      // Removing the timeout once a keystroke is recieved
      clearTimeout(timer);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
