import React from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    hasError: nameInputHasError,
    isValueValid: isEnteredNameValid,
    inputChangeHandler: inputNameHandler,
    inputBlurHandler: inputNameBlur,
    reset: resetNameInput,
  } = useInput((name) => name.trim() !== "");

  const {
    enteredValue: enteredEmail,
    hasError: emailInputHasError,
    isValueValid: isEnteredEmailValid,
    inputChangeHandler: inputEmailHandler,
    inputBlurHandler: inputEmailBlur,
    reset: resetEmailInput,
  } = useInput((email) => email.includes("@"));

  // Collective form state
  // Derived from input states
  let isFormValid = false;
  if (isEnteredNameValid && isEnteredEmailValid) {
    isFormValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(enteredName, enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  let nameInputClass = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  let emailInputClass = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={inputNameHandler}
          onBlur={inputNameBlur}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Invalid Name</p>}
      </div>
      <div className={emailInputClass}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={inputEmailHandler}
          onBlur={inputEmailBlur}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">Invalid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
