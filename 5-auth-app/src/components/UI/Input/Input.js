import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

// We cannot assign refs to custom components directly
// To assign a ref, we need a different type of react component
// ! Don't use this frequently
const Input = React.forwardRef((props, forwardedRef) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(forwardedRef, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
