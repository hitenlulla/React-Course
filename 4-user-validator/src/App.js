import UserForm from "./components/UserForm/UserForm";
import List from "./components/UI/List/List";
import Modal from "./components/UI/Modal/Modal";

import { useState, Fragment } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [isUserValid, setIsUserValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const addUser = (userData) => {
    // Validate input
    if (userData.username === "" || userData.age === "") {
      setIsUserValid(false);
      setErrorMessage("Username and age cannot be blank");
      return;
    } else if (userData.age <= 0) {
      setIsUserValid(false);
      setErrorMessage("Age cannot be less than or equal to 0");
      return;
    }
    setUsers((prevUsers) => {
      return [...prevUsers, userData];
    });
  };

  const resetValidity = () => {
    setIsUserValid(true);
  };

  return (
    // Use fragments to wrap components - This is done to avoid div-soup
    <Fragment>
      {/* The modal should not be rendered inside a component, it should be at the top of the DOM
        Hence we use portals to portal this out to the DOM. Portal is defined in the component
      */}
      {!isUserValid && (
        <Modal errorMessage={errorMessage} onClosePrompt={resetValidity} />
      )}
      <UserForm onAddUser={addUser} />
      {users.length > 0 && <List users={users} />}
    </Fragment>
  );
}

export default App;
