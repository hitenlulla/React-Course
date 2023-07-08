import { Fragment, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  searchChangeHandler = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  // Side effect -> Running a logic when component is rendered first time
  componentDidMount() {
    // eg: Send http req to get users
    this.setState({ filteredUsers: DUMMY_USERS });
  }

  // Side effect -> Running a logic only when a state changes and not always
  componentDidUpdate(prevProps, prevState) {
    // We need to handle the state change
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  // Side effect -> Running a logic when component is getting removed
  componentWillUnmount() {
    console.log("component Unmounted");
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

export default UserFinder;
