import React from "react";
import UserItem from "../UserItem/UserItem";

export default function UserList(props) {
  return (
    <ul>
      {props.users.map((user) => (
        <UserItem key={Math.random()} username={user.username} age={user.age} />
      ))}
    </ul>
  );
}
