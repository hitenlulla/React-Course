import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length >= 5;

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    isValueValid: isNameValid,
    hasError: NameHasError,
    inputChangeHandler: NameInputChangeHandler,
    inputBlurHandler: NameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => !isEmpty(value));

  const {
    enteredValue: enteredStreet,
    isValueValid: isStreetValid,
    hasError: StreetHasError,
    inputChangeHandler: StreetInputChangeHandler,
    inputBlurHandler: StreetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => !isEmpty(value));

  const {
    enteredValue: enteredCity,
    isValueValid: isCityValid,
    hasError: CityHasError,
    inputChangeHandler: CityInputChangeHandler,
    inputBlurHandler: CityInputBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => !isEmpty(value));

  const {
    enteredValue: enteredPostal,
    isValueValid: isPostalValid,
    hasError: PostalHasError,
    inputChangeHandler: PostalInputChangeHandler,
    inputBlurHandler: PostalInputBlurHandler,
    reset: resetPostalInput,
  } = useInput((value) => isFiveChar(value));

  let isFormValid = false;
  if (isNameValid && isStreetValid && isCityValid && isPostalValid) {
    isFormValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    // Send data
    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postal: enteredPostal,
    });

    resetNameInput();
    resetStreetInput();
    resetCityInput();
    resetPostalInput();
  };

  const NameInputStyle = NameHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const StreetInputStyle = StreetHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const CityInputStyle = CityHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const PostalInputStyle = PostalHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={NameInputStyle}>
        <label htmlFor="name">Your Name </label>
        {NameHasError && (
          <p className={classes["error-message"]}>Name cannot be blank</p>
        )}
        <input
          type="text"
          id="name"
          onChange={NameInputChangeHandler}
          onBlur={NameInputBlurHandler}
          value={enteredName}
        />
      </div>
      <div className={StreetInputStyle}>
        <label htmlFor="street">Street</label>
        {StreetHasError && (
          <p className={classes["error-message"]}>Street cannot be blank</p>
        )}
        <input
          type="text"
          id="street"
          onChange={StreetInputChangeHandler}
          onBlur={StreetInputBlurHandler}
          value={enteredStreet}
        />
      </div>
      <div className={PostalInputStyle}>
        <label htmlFor="postal">Postal Code</label>
        {PostalHasError && (
          <p className={classes["error-message"]}>Invaid Postal address</p>
        )}
        <input
          type="text"
          id="postal"
          onChange={PostalInputChangeHandler}
          onBlur={PostalInputBlurHandler}
          value={enteredPostal}
        />
      </div>
      <div className={CityInputStyle}>
        <label htmlFor="city">City</label>
        {CityHasError && (
          <p className={classes["error-message"]}>City cannot be blank</p>
        )}
        <input
          type="text"
          id="city"
          onChange={CityInputChangeHandler}
          onBlur={CityInputBlurHandler}
          value={enteredCity}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
