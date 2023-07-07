import React, { useState, useEffect } from "react";

// Creating a context, with default values
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});
export default AuthContext;

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handling side effect
  useEffect(
    () => {
      // This check will trigger an infinite loop because the component re-renders when the state changes, and we change the state when the component is rendering - Infinite loop
      // This is called a side-effect
      if (localStorage.getItem("isLoggedIn") === "1") {
        setIsLoggedIn(true);
      }
    },
    [
      // No dependencies means it will be run only once when the component is rendered
    ]
  );

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
