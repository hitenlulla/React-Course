import { useState } from "react";

const useInput = (validateValue) => {
  // States to get the entered value and to know if input was touched
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // Derived states to check if the name input field is valid, derived from above states
  const isValueValid = validateValue(enteredValue);
  const hasError = !isValueValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    enteredValue,
    isValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
