import React from "react";
import CartContext from "./cart-context";

export default function CartProvider(props) {
  const addItemToCartHandler = (item) => {};
  const removeItemFromCartHandler = (id) => {};
  const cartContextValue = {
    items: [],
    total: 0,
    addItems: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}
