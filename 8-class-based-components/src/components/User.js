import { Component } from "react";

import classes from "./User.module.css";
/* Function based component
const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};
*/

class User extends Component {
  render() {
    // props is recieved in `this` object of Component class
    return <li className={classes.user}>{this.props.name}</li>;
  }
}
export default User;
