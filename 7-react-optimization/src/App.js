import React, { useState, useCallback, useMemo } from "react";

import "./App.css";
import DemoList from "./components/Demo/DemoList";
import Button from "./components/UI/Button/Button";

function App() {
  const [listTitle, setListTitle] = useState("My List");

  // useCallback() takes a function which will be stored in memory of react, and not get defined again when the component renders due to state change
  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  // useMemo() takes a function which returns data, this data will be stored in memory of react, and not get defined again when component renders due to state change
  // And a dependency array
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
