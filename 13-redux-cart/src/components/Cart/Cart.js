import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartData =
    cartItems.length > 0 ? (
      <ul>
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            item={{
              title: cartItem.name,
              quantity: cartItem.quantity,
              total: cartItem.totalPrice,
              price: cartItem.price,
              id: cartItem.id,
            }}
          />
        ))}
      </ul>
    ) : (
      <p>Cart Empty, Add some items</p>
    );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartData}
    </Card>
  );
};

export default Cart;
