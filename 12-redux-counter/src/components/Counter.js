import React from "react";
import classes from "./Counter.module.css";

import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";

const Counter = () => {
  // Subscribing to redux store & Extracting values of redux states
  // const counter = useSelector((state) => state.counter);
  // const showCounter = useSelector((state) => state.showCounter);

  // Subscribing to redux toolkit store & Extracting values of redux states
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  // Get the redux dispatch function
  const dispatch = useDispatch();
  const incrementHandler = () => {
    // dispatching a redux action
    // dispatch({ type: "increment" });

    // dispatching a redux-toolkit action
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    // dispatching a redux action
    // dispatch({ type: "decrement" });

    // dispatching a redux-toolkit action
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    // dispatching a redux action
    // dispatch({ type: "increase", value: 5 });

    // dispatching a redux-toolkit action & sending a payload to action
    dispatch(counterActions.increase(5));
  };

  const toggleCounterHandler = () => {
    // dispatching a redux action
    // dispatch({ type: "toggle" });

    // dispatching a redux-toolkit action
    dispatch(counterActions.toggleCounter());
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
