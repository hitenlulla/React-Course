import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import React, { Fragment } from "react";
import { fetchCartData, sendCartData } from "./store/cart-thunks";

// Global var Used to handle the edge case of always sending cart data even on first render
// Using global var because it's value will not be re-rendered
let isInitialRender = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  // Running side effect code when there is change in reducer
  // We are not allowed to write any async / side-effect code in the reducer functions
  // Consider the example of storing the cart in the backend, so user does not looses the cart when he reloads
  // This can be done in the component itself, as follows
  // Get the entire instance of cart from the redux store -> This will be added as our dependency in useEffect

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    /* Defining side effects in components
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data",
        })
      );
      const response = await fetch(
        "https://react-http-5463b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send cart data");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data succesfully",
        })
      );
    };

    if (isInitialRender) {
      isInitialRender = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed",
        })
      );
    });
    */
    if (isInitialRender) {
      isInitialRender = false;
      return;
    }

    if (cart.changedLocally) {
      // Using action thunks for side-effects in redux
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  const notification = useSelector((state) => state.ui.notification);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
