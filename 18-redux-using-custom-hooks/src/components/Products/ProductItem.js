import React from "react";

import Card from "../UI/Card";
import "./ProductItem.css";
import { useStore } from "../../hook-store/store";

const ProductItem = React.memo((props) => {
  // Get the store dispatcher
  // now this dispatch function will render all the other ProductItems, to avoid that we make sure that when we change this item, other items do not listen with help of shouldListen param
  const dispatch = useStore(false)[1];

  const toggleFavHandler = () => {
    // Call the TOGGLE_FAV dispatcher function
    dispatch("TOGGLE_FAV", props.id);
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
