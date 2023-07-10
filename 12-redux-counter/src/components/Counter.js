import React from "react";
import classes from "./Counter.module.css";

import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  // Subscribing to redux store & Extracting values of redux states
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);

  // Get the redux dispatch function
  const dispatch = useDispatch();
  const incrementHandler = () => {
    // dispatching a redux action
    dispatch({ type: "increment" });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const increaseHandler = () => {
    dispatch({ type: "increase", value: 5 });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && (
        <React.Fragment>
          <div className={classes.value}>{counter}</div>
          <div>
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={increaseHandler}>Increase</button>
            <button onClick={decrementHandler}>Decrement</button>
          </div>
        </React.Fragment>
      )}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
