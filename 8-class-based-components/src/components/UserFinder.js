import { Fragment, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/user-context";
import ErrorBoundary from "../errors/ErrorBoundary";

class UserFinder extends Component {
  // Consuming a context
  // !NOTE only one context can be consumed in a class Component
  static contextType = UsersContext;
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
    // Using the value in context
    this.setState({ filteredUsers: this.context.users });
  }

  // Side effect -> Running a logic only when a state changes and not always
  componentDidUpdate(prevProps, prevState) {
    // We need to handle the state change
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
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
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default UserFinder;
