import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product 1" },
  { id: "p2", title: "Product 2" },
  { id: "p3", title: "Product 3" },
];

function HomePage() {
  return (
    <>
      <h1>The products page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          // Creating links to parameterized products
          <li key={prod.id}>
            {/* Absolute path v */}
            {/* <Link to={`/products/${prod.id}`}>{prod.title}</Link> */}

            {/* Relative path */}
            <Link to={prod.id}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
