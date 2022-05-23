import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../context/auth-context";
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

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

  const [passwordState, dispatchPassword] = useReducer(
    (prevState, action) => {
      let newState = { value: "", isValid: false };

      if (action.type === "USER_INPUT") {
        newState = {
          value: action.payload,
          isValid: action.payload.trim().length > 6,
        };
      }

      if (action.type === "INPUT_BLUR") {
        newState = {
          value: prevState.value,
          isValid: prevState.value.trim().length > 6,
        };
      }

      return newState;
    },
    { value: "", isValid: undefined }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({
      type: "USER_INPUT",
      payload: event.target.value,
    });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: "USER_INPUT",
      payload: event.target.value,
    });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({
      type: "INPUT_BLUR",
      payload: "",
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type: "INPUT_BLUR",
      payload: "",
    });
  };

  const ctx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />        
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
