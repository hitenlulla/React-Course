import React from "react";
import styles from "./List.module.css";
import UserList from "../../UserList/UserList";

export default function List(props) {
  return (
    <div className={styles.users}>
      <UserList users={props.users} />
    </div>
  );
}
