import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const [isButtonHighlited, setIsButtonHighligted] = useState(false);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // Adding bump animation to button if item is added to the cart
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    // Higlight the button
    setIsButtonHighligted(true);
    // Remove the highligt after 300s
    const timer = setTimeout(() => {
      setIsButtonHighligted(false);
    }, 300);
    // Cleanup: clear the timer before next execution
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  const buttonClasses = `${classes.button} ${
    isButtonHighlited ? classes.bump : ""
  }`;
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
