import React, { useMemo } from "react";

import classes from "./DemoList.module.css";

const DemoList = (props) => {
  const { items } = props;

  // useMemo() takes a function which returns data and a dependency array, this data will be stored in memory of react, and not get defined again when component renders due to state change
  // In this case we want to sort the items array again only if there is change in items array
  const sortedList = useMemo(() => {
    console.log("Items sorted");
    return items.sort((a, b) => a - b);
  }, [items]);
  console.log("DemoList RUNNING");

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Enclosing a react component in React.memo() makes sure that this component only gets rendered when there is a change in incoming props
export default React.memo(DemoList);
