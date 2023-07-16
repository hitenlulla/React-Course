import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  // Getting the parameter from dynamic route
  const params = useParams();
  const productId = params.id;
  return (
    <div>
      <h2>Product Details!</h2>
      <p>I am product {productId}</p>
      {/* Relative path */}
      <button>
        {/* This link takes you back to the home page because it is relative to route */}
        {/* <Link to="..">Back</Link> */}

        {/* If we want a link to go back to the previous segment we can use relative="path" */}
        <Link to=".." relative="path">
          Back
        </Link>
      </button>
    </div>
  );
}
