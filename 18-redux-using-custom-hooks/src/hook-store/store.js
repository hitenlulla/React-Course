import { useEffect, useState } from "react";
// We need to create this state object as global, as we want it to be shared accross all the components that use our hook
let globalState = {};

// Listeners will have the state-update function
let listeners = [];
// This will hold identifier-function mappings
// This function will be declared by the hook user while configuring the store
let actions = {};

// We need to provide the hook user, an option to toggle if he is using a listener or not: This is an optimization of reducing unwanted renders
export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1]; // only need the setter function

  // Attach the state update function as a listener when the hook is mounted
  useEffect(() => {
    if (shouldListen) listeners.push(setState);
    // Remove the listener when the hook is unmounted: Cleanup function
    return () => {
      if (shouldListen) listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState, shouldListen]);

  // We need a dispatch function to update the state- takes the action-identifier and the to-update payload
  const dispatch = (actionIdentifier, payload) => {
    // Calling the action function mapped to this identifier with the current state and the payload
    // Which will inturn return the new state, based on action being performed
    const newState = actions[actionIdentifier](globalState, payload);

    // Update the existing globalState's data with new data
    globalState = { ...globalState, ...newState };

    // Update this state for all the listeners
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  // return the current state, and function to update this state
  return [globalState, dispatch];
};

// Store initialiser
export const initStore = (userActions, initialState) => {
  // If initial state is incoming, update the existing state
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  //   Update the global actions with incoming actions {}
  actions = { ...actions, ...userActions };
};
