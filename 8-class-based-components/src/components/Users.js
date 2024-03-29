import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

/*
const Users = () => {
  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? 'Hide' : 'Show'} Users
      </button>
      {showUsers && usersList}
    </div>
  );
};
*/

class Users extends Component {
  // Initialising state
  constructor() {
    super();
    this.state = {
      showUsers: true,
      other: "Dummy",
    };
  }

  toggleUsersHandler = () => {
    // Updating state
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  };

  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users found");
    }
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* !Binding toggleUsersHandler's this to this scope */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {/* Using state */}
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}
export default Users;
