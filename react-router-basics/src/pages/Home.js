import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  // Navigating programmatically (imperative) - used when a timer expires / form is submitted
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>This is the home page</h1>
      <p>
        Checkout the <Link to="/products">Products</Link>
      </p>
      <button onClick={navigateHandler}>Navigate to products</button>
    </>
  );
}

export default HomePage;
