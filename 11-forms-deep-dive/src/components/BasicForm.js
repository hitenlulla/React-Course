import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    enteredValue: enteredFirstName,
    isValueValid: isFirstNameValid,
    hasError: firstNameHasError,
    inputChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((firstName) => firstName.trim() !== "");

  const {
    enteredValue: enteredLastName,
    isValueValid: isLastNameValid,
    hasError: lastNameHasError,
    inputChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useInput((lastName) => lastName.trim() !== "");

  const {
    enteredValue: enteredEmail,
    isValueValid: isEmailValid,
    hasError: emailHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((email) => email.trim().includes("@"));

  let isFormValid = false;
  if (isFirstNameValid && isLastNameValid && isEmailValid) {
    isFormValid = true;
  }

  const firstNameInputStyle = firstNameHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameInputStyle = lastNameHasError
    ? "form-control invalid"
    : "form-control";

  const EmailInputStyle = emailHasError
    ? "form-control invalid"
    : "form-control";

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(enteredFirstName, enteredLastName, enteredEmail);
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameInputStyle}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
          />
          {firstNameHasError && (
            <p className="error-text">First name cannot be blank</p>
          )}
        </div>
        <div className={lastNameInputStyle}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName}
          />
          {lastNameHasError && (
            <p className="error-text">First name cannot be blank</p>
          )}
        </div>
      </div>
      <div className={EmailInputStyle}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && <p className="error-text">Invalid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
