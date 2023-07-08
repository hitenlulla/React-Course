import React, { useState } from "react";

import styles from "./Form.module.css";

const InputForm = (props) => {
  const [userInput, setUserInput] = useState({
    curr_savings: "",
    yearly_savings: "",
    interest: "",
    duration: "",
  });

  const [isUserInputValid, setIsUserInputValid] = useState(true);

  const inputChangeHandler = (key, value) => {
    switch (key) {
      case "curr_savings":
        setUserInput((prevState) => {
          return { ...prevState, curr_savings: value };
        });
        break;
      case "yearly_savings":
        setUserInput((prevState) => {
          return { ...prevState, yearly_savings: value };
        });
        break;
      case "interest":
        setUserInput((prevState) => {
          return { ...prevState, interest: value };
        });
        break;
      case "duration":
        setUserInput((prevState) => {
          return { ...prevState, duration: value };
        });
        break;
      default:
        setUserInput((prevState) => {
          return { ...prevState };
        });
        break;
    }
  };

  const resetClickHandler = () => {
    setIsUserInputValid(true);
    setUserInput({
      curr_savings: "",
      yearly_savings: "",
      interest: "",
      duration: "",
    });
    props.onReset();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onReset();
    if (
      userInput.curr_savings &&
      userInput.yearly_savings &&
      userInput.interest &&
      userInput.duration
    ) {
      setIsUserInputValid(true);
    } else {
      setIsUserInputValid(false);
      return;
    }

    const savedInput = {
      "current-savings": userInput.curr_savings,
      "yearly-contribution": userInput.yearly_savings,
      "expected-return": userInput.interest,
      duration: userInput.duration,
    };
    props.onCaclulate(savedInput);
  };

  return (
    <form
      className={`${styles["form"]} ${!isUserInputValid ? styles.invalid : ""}`}
      onSubmit={submitHandler}
    >
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            value={userInput.curr_savings}
            onChange={(event) => {
              inputChangeHandler("curr_savings", event.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={userInput.yearly_savings}
            onChange={(event) => {
              inputChangeHandler("yearly_savings", event.target.value);
            }}
          />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            value={userInput.interest}
            onChange={(event) => {
              inputChangeHandler("interest", event.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={userInput.duration}
            onChange={(event) => {
              inputChangeHandler("duration", event.target.value);
            }}
          />
        </p>
      </div>
      <p className={styles["actions"]}>
        <button
          type="reset"
          className={styles["buttonAlt"]}
          onClick={resetClickHandler}
        >
          Reset
        </button>
        <button type="submit" className={styles["button"]}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default InputForm;
