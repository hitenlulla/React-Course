import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <React.Fragment>
      {isCartOpen && <Cart onCloseCart={closeCart} />}
      <Header onOpenCart={openCart} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
