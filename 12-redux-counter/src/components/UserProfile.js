import { Fragment } from "react";
import classes from "./UserProfile.module.css";
import Counter from "./Counter";

const UserProfile = () => {
  return (
    <Fragment>
      <main className={classes.profile}>
        <h2>My User Profile</h2>
      </main>
      <Counter />
    </Fragment>
  );
};

export default UserProfile;
