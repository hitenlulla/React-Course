const redux = require("redux");

// Creating a reducer
// This function is called by redux library to manipulate the states stored in the redux store
// It gets 2 inputs : current-state, dispatched-action
// It should always return a state object {}
// ! No side effects allowed in reducer function
const defaultState = {
  counter: 0,
};
const counterReducer = (state = defaultState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

// Creating a redux store
// This holds all the state values
const store = redux.createStore(counterReducer);

// A function / component which is listening to the redux store
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// Subscribe the subscriber to the redux store
store.subscribe(counterSubscriber);

// Dispatching an action
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
