import React, { useState, useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrderSubmitted, setOrderSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
  const cartTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const CartAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const CartRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderClickHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={CartRemoveHandler.bind(null, item.id)}
      onAdd={CartAddHandler.bind(null, item)}
    />
  ));

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const { isLoading, error, sendRequest } = useHttp();
  const submitCartInfo = (userInfo) => {
    const request = {
      url: "https://react-http-5463b-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userInfo,
        meals: cartCtx.items,
      }),
    };

    const responseHandler = (response) => {
      console.log("Order Successfull", response);
    };

    sendRequest(request, responseHandler);
    setOrderSubmitted(true);
    cartCtx.resetCart();
  };

  const cartModalContent = (
    <React.Fragment>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitCartInfo} onCancel={props.onCloseCart} />
      )}
      {!isCheckout && cartActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Submiting you order</p>;
  const SuccessModalContent = <p>Order Successfull.</p>;

  return (
    <Modal onClose={props.onCloseCart}>
      {!isLoading && !isOrderSubmitted && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {isOrderSubmitted && SuccessModalContent}
    </Modal>
  );
};

export default Cart;
