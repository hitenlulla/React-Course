import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import ProductDetails from "./pages/ProductDetails";
// Creating a router and configure paths with elements as reactcomponents
/* simple router
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <Products /> },
]);
*/

/**
 * Parent layout router: Used for sharing components between different sites
 */
const router = createBrowserRouter([
  /* v Absolute paths v
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <Products /> },
      // Parameterised (dynamic) routes
      { path: "/products/:id", element: <ProductDetails /> },
    ],
    errorElement: <Error />,
  },
  */

  //  Relative paths: Relative to parent path
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> }, // Index route: Load when parent route is called. Alternative to `path: ""`
      { path: "products", element: <Products /> },
      // Parameterised (dynamic) routes
      { path: "products/:id", element: <ProductDetails /> },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
