import React, { useState } from "react";

import Output from "./Output";

export default function Greeting() {
  const [changedText, setchangedText] = useState(false);
  const changedTextHandler = () => {
    setchangedText(true);
  };
  return (
    <div>
      <h2>Hello World!</h2>
      {!changedText && <Output>It is good to see you</Output>}
      {changedText && <Output>Changed</Output>}
      <button onClick={changedTextHandler}>Change text</button>
    </div>
  );
}
