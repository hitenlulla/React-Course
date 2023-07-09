import React, { useState } from "react";

const SimpleInput = (props) => {
  // States to get the entered name and to know if input was touched
  const [enteredName, setEnteredName] = useState("");
  const [nameInputTouched, setNameInputTouched] = useState(false);

  // Derived states to check if the name input field is valid, derived from above states
  const isEnteredNameValid = enteredName.trim() !== "";
  const isNameInputInvalid = !isEnteredNameValid && nameInputTouched;

  // Collective form state
  // Derived from input state
  let isFormValid = false;
  if (isEnteredNameValid) {
    isFormValid = true;
  }

  const inputNameHandler = (event) => {
    setEnteredName(event.target.value);
    setNameInputTouched(true);
  };

  const inputNameBlur = () => {
    setNameInputTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setNameInputTouched(true);

    if (!isEnteredNameValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName("");
    setNameInputTouched(false);
  };

  let formClasses = "";
  isNameInputInvalid
    ? (formClasses = "form-control invalid")
    : (formClasses = "form-control");

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={formClasses}>
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
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
