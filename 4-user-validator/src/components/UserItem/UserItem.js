import React from "react";

export default function UserItem(props) {
  return <li>{`${props.username} (${props.age} years old)`}</li>;
}
