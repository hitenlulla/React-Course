import React, { useState } from "react";

const SimpleInput = (props) => {
  // States to get the entered name and to know if input was touched
  const [enteredName, setEnteredName] = useState("");
  const [nameInputTouched, setNameInputTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailInputTouched, setEmailInputTouched] = useState(false);

  // Derived states to check if the name input field is valid, derived from above states
  const isEnteredNameValid = enteredName.trim() !== "";
  const isNameInputInvalid = !isEnteredNameValid && nameInputTouched;
  const isEnteredEmailValid =
    enteredEmail.trim() !== "" && enteredEmail.includes("@");
  const isEmailInputInvalid = !isEnteredEmailValid && emailInputTouched;

  // Collective form state
  // Derived from input states
  let isFormValid = false;
  if (isEnteredNameValid && isEnteredEmailValid) {
    isFormValid = true;
  }

  const inputNameHandler = (event) => {
    setEnteredName(event.target.value);
    setNameInputTouched(true);
  };

  const inputNameBlur = () => {
    setNameInputTouched(true);
  };

  const inputEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailInputTouched(true);
  };

  const inputEmailBlur = () => {
    setEmailInputTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setNameInputTouched(true);
    setEmailInputTouched(true);

    if (!isEnteredNameValid) {
      return;
    }

    console.log(enteredName, enteredEmail);

    setEnteredName("");
    setEnteredEmail("");
    setNameInputTouched(false);
    setEmailInputTouched(false);
  };

  let nameInputClass = "";
  isNameInputInvalid
    ? (nameInputClass = "form-control invalid")
    : (nameInputClass = "form-control");

  let emailInputClass = "";
  isEmailInputInvalid
    ? (emailInputClass = "form-control invalid")
    : (emailInputClass = "form-control");

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
        {isNameInputInvalid && <p className="error-text">Invalid Name</p>}
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
        {isEmailInputInvalid && <p className="error-text">Invalid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
