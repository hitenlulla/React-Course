import { createSlice } from "@reduxjs/toolkit";
// import { createStore } from "redux";

const defaultState = {
  counter: 0,
  showCounter: true,
};

/* RAW redux
const counterReducer = (state = defaultState, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type === "increase") {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }

  if (action.type === "decrement") {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }

  if (action.type === "toggle") {
    return {
      ...state,
      showCounter: !state.showCounter,
    };
  }

  return state;
};
const store = createStore(counterReducer);
*/

/** Redux toolkit */
// creating a slice
// A slice helps to store states and reducer of a type - used to maintain when redux starts handling lot of states
const counterSlice = createSlice({
  name: "counter",
  initialState: defaultState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload; //! action.payload will always hold the data coming into this action function (cannot change this property name)
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// To dispatch new states, toolkit provides us with actions functions these functions return a {} with a type generated by redux.
// These action functions can be called inside the dispatch hook to dispatch an action
export const counterActions = counterSlice.actions;
export default counterSlice;
