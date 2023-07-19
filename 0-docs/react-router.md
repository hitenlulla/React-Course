# React Router - Multi-Page SPA
- [React Router - Multi-Page SPA](#react-router---multi-page-spa)
  - [Creating pages](#creating-pages)
  - [Creating a react browser router](#creating-a-react-browser-router)
    - [Simple Router](#simple-router)
    - [Router with Layouts (Shared components)](#router-with-layouts-shared-components)
    - [Showing custom error pages for routes](#showing-custom-error-pages-for-routes)
    - [Dynamic Routes (Parameterized routes)](#dynamic-routes-parameterized-routes)
    - [Relative Paths](#relative-paths)
    - [Index routes](#index-routes)
  - [Providing Router to App](#providing-router-to-app)
  - [Navigating between routes](#navigating-between-routes)
    - [HTML anchor tag](#html-anchor-tag)
    - [Link component](#link-component)
    - [NavLink component](#navlink-component)
    - [Navigation state: useNavigate hook](#navigation-state-usenavigate-hook)
    - [Linking to a dynamic routes using parameters](#linking-to-a-dynamic-routes-using-parameters)
    - [Linking Relative Paths](#linking-relative-paths)
    - [Linking back to parent route](#linking-back-to-parent-route)
    - [Route query parameters](#route-query-parameters)
  - [Route Data Loaders](#route-data-loaders)
    - [Loader function declaration and Loader data consumption](#loader-function-declaration-and-loader-data-consumption)
    - [Route loader mapping](#route-loader-mapping)
    - [Loader data Navigation state](#loader-data-navigation-state)
    - [Loader error handling](#loader-error-handling)
    - [Sharing loaders between routes](#sharing-loaders-between-routes)
    - [Dynamic Route loader](#dynamic-route-loader)
    - [Accessing data from other route's loaders](#accessing-data-from-other-routes-loaders)
  - [Route Actions](#route-actions)
    - [Router Forms](#router-forms)
    - [Action function declaration with redirect](#action-function-declaration-with-redirect)
    - [Route-action mapping](#route-action-mapping)
    - [Triggering actions programatically - useSubmit()](#triggering-actions-programatically---usesubmit)
    - [Action state: useNavigate hook](#action-state-usenavigate-hook)
    - [Action data: Validating user input](#action-data-validating-user-input)
    - [Reusable Router Form](#reusable-router-form)
  - [Fetcher](#fetcher)
  - [Defered Loader](#defered-loader)
    - [defered preference](#defered-preference)
  - [Route Authentication](#route-authentication)
    - [Login \& Logout routes](#login--logout-routes)
    - [Login / Signup form](#login--signup-form)
    - [Login action](#login-action)
    - [Logout action](#logout-action)
    - [Sharing token to routes](#sharing-token-to-routes)
    - [Accessing shared token on individual routes UI \& actions](#accessing-shared-token-on-individual-routes-ui--actions)
    - [Route protection](#route-protection)
    - [Auto Logout on token expiration](#auto-logout-on-token-expiration)


In an ideal webserver, different HTML files are served for different routes

eg: /product serves the products, /product/1 serves the first product details

But for react we only have a single HTML page where we render different components, to make it route-ful we can use React router

## Creating pages
Pages are similar to App.js where we can render our components

In src, create a directory pages
> In *src/pages/HomePage.js*
```jsx
function HomePage() {
  return <h1>This is the home page</h1>;
}

export default HomePage;
```

> In *src/pages/ProductsPage.js*
```jsx
function ProductsPage() {
  return <ProductsList />;
}

export default ProductsPage;
```

## Creating a react browser router
In src, create a directory router

### Simple Router
> In *src/router/router.js*
```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    // The path is the route and the element is the page we want to serve for that route
    { path: '/', element: <HomePage /> },
    { path: '/products', element: <ProductsPage /> }
])

export default router;
```
### Router with Layouts (Shared components)

Sometimes we need components that should be rendered on all the pages eg: Navbar

To share a component we can create a Layout page with Outlet
> In *src/pages/RootLayout.js*
```jsx
import React from "react";
import { Outlet } from "react-router-dom";
// Navigation component
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
return (
    <>
    <MainNavigation />
    {/* Outlet component marks where the child route is rendered */}
    <Outlet/>
    </>
);
}
```

Now we need to wrap our routes in the RootLayout page. To do this we can use the **children** key
> In *src/router/router.js*
```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    // Wraping pages in layout page to share components of LayoutPage with children routes
    { path: '/', element: <RootLayout />, children: [
        { path: '/', element: <HomePage /> },
        { path: '/products', element: <ProductsPage /> }
    ]},
])

export default router;
```

### Showing custom error pages for routes
> In *src/pages/ErrorPage.js*
```jsx
import React from "react";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
return (
    <>
    <MainNavigation />
    <main>
        <h1>An error occured</h1>
        <p>Could not find this page</p>
    </main>
    </>
);
}
```

This page can be served when there is some error in our routes or route is not found by using **errorElement** key in the route definition
> In *src/router/router.js*
```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, 
    // errorElement serves the defined page if any error is found in this route
    errorElement: <ErrorPage />,
    children: [
        { path: '/', element: <HomePage /> },        
        { path: '/products', element: <ProductsPage />},
        { path: '/products/new', element: <ProductsNewPage /> },
    ]},
])

export default router;
```

Note: Every route can have its own errorElement. If error is generated in any route and errorElement is not found for that route, it will bubble up to parent's errorElement and if no errorElement is found, it will serve the default error page.

### Dynamic Routes (Parameterized routes)
    
Sometimes we need to specify parameters into the route like an id, this can be done using ':'
> In *src/router/router.js*
```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <HomePage /> },
        { path: '/products', element: <ProductsPage />},
        { path: '/products/new', element: <ProductsNewPage /> },
        // :id is a dynamic route which passes id as a parameter
        { path: '/products/:id', element: <ProductsDetailPage /> }
    ]},
])

export default router;
```

Reading parameter using useParams hook
```jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
// Getting the parameter from dynamic route
const params = useParams();
// id is the parameter property set in the route definition
const productId = params.id;

return (
    <div>
        <h2>Product Details!</h2>
        <p>I am product {productId}</p>
    </div>
);
}
```

### Relative Paths
All the above mentioned route patterns (paths) are absolute i.e. they start with '/'

If we decide to change the parent path from '/' to '/root', it will break the app because all the child paths start with '/'. and to fix it we will have to rename all paths to start with '/root/...'

This can be avoided if we use relative paths and concepts of **children**
```js
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    // Parent path should be a valid path
    { path: '/', element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
        // this is index page to route '/products/:id'
        { path: '', element: <HomePage /> },
        // this is relative path - /products
        { path: 'products',children: [
            { path: '', element: <ProductsPage />}
            // this is relative path - /products/new
            { path: 'new', element: <ProductsNewPage /> },
            // this is relative path - /products/:id
            { path: ':id', children: [
                // this is index page to route '/products/:id'
                { path: '', element: <ProductsDetailPage />},
                // this is relative path - /products/:id/edit
                { path: 'edit', element: <ProductsEditPage />}
            ]}
        ]}
    ]},
])

export default router;
```

### Index routes
```js
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
        // Using the index property to define this as the index route for '/'
        { index: true, element: <HomePage /> },
        { path: 'products',children: [
            // Using the index property to define this as the index route for '/products'
            { index: true, element: <ProductsPage />}
            { path: 'new', element: <ProductsNewPage /> },
            { path: ':id', children: [
                // Using the index property to define this as the index route for '/products/:id'
                { index: true, element: <ProductsDetailPage />},
                { path: 'edit', element: <ProductsEditPage />}
            ]}
        ]}
    ]},
])

export default router;
```
## Providing Router to App
Instead of rendering any component from the App.js we will now serve the RouteProvider component 
> in *src/App.js*
```jsx
import router from "./router/router";
import { RouterProvider } from "react-router-dom";

function App() {
  // Pass our defined router to the RouterProvider component
  return <RouterProvider router={router} />;
}

export default App;
```

## Navigating between routes
### HTML anchor tag
We can either use the anchor tag to link to other routes 
```html 
<a href="/products">products</a>
``` 
The problem with using the HTML anchor tag is that it will refresh the page that is re-renders all the components of the DOM (Restart react)

### Link component
This issue can be solved by using the Link component provided by react-router-dom
```jsx
import { Link } from "react-router-dom";
.
.
.
<Link to="/products">products</Link>
```
Link component makes sure the default behaviour is prevented

### NavLink component
Link component doesn't tell if the link is active, to know if the link is active we can use NavLink 
```jsx
import { NavLink } from "react-router-dom";
.
.
.
<NavLink 
to="/products"
// className takes a function which recieves the info about that link
// now we can check if it is active and change css styles
className={(link) => (link.isActive ? classes.active : undefined)}
// every route is child of '/' hence we need to stop the propogation of parent route
// end is used to stop child pattern propogation
end>products</Link>
```

### Navigation state: useNavigate hook
Sometimes we need to programatically navigate to some route eg: A form is submitted, A timer is expired, etc.

This can be done using useNavigate()
```jsx
import { useNavigate } from "react-router-dom";

function HomePage() {
// Navigating programmatically (imperative) - used when a timer expires / form is submitted
const navigate = useNavigate();

function navigateHandler() {
    navigate("/products");
}

return (
    <>
    <h1>This is the home page</h1>
    <button onClick={navigateHandler}>Navigate to products</button>
    </>
);
}

export default HomePage;
```

### Linking to a dynamic routes using parameters
When we need to create links for different items dynamically

```jsx
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
        <li key={prod.id}>
            {* Creating links using parameterized product's id *}
            <Link to={`/products/${prod.id}`}>{prod.title}</Link>
        </li>
        ))}
    </ul>
    </>
);
}

export default HomePage;
```

### Linking Relative Paths
Until now we were writing all the links **to** absolute paths but this will break if we have a router with relative paths

We can convert absolute paths to relative paths by just removing the starting '/' i.e.

```jsx
<Link to="products">products</Link>
<Link to={`products/${prod.id}`}>{prod.title}</Link>
```

### Linking back to parent route
We can link to '..' to go back to the parent route
```jsx
<Link to="..">products</Link>
```

But this will always go back to the parent route, if we want to go back to the previous path we can set the **relative** prop to 'path'. So the react-router will remove 1 segment from the path and link to it.

```jsx
<Link to=".." relative='path'>products</Link>
```

### Route query parameters
We can programatically also add and fetch query parameters to the routes we want to navigate to, using searchParams() hook provided by react-router-dom
```jsx
import { Form, Link, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // Retrieving query parameters
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>

          {/* Adding query parameters to route */}
          {/* '?mode=login' or '?mode=signup' */}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>

          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
```

## Route Data Loaders
When we fetch some data from the backend, by default React will fetch the data before the route is activated, but we should ideally fetch the data before the route is called. This can be done using route data loader

### Loader function declaration and Loader data consumption
```jsx
import { useLoaderData } from "react-router-dom";

export default function ProductsPage() {
  // Reading a loader data from this route's loader
  const data = useLoaderData();
  const products = data.products;
  
  return (
    <>
      <ProductsList Products={products} />
    </>
  );
}

// Loader function - Loads the data and returns the response
export async function loader() {
    const response = await fetch("http://localhost:8080/products");
    if (!response.ok) {
        // Will handle this in Loader error Handlers
    } else {
        /* awaiting and processing the response
        data = await response.json();
        return data
        */
        // we can directly return the response as it will be handled by react-router
        return response
    }
}
```
Note: We can use any BrowserJS code in the loaders but cannot use hooks. 

### Route loader mapping
```js
import { createBrowserRouter } from "react-router-dom";
import { loader as productLoader } from '../pages/ProductsPage' 

const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'products',children: [
            { index: true, element: <ProductsPage />, loader: productLoader}
            { path: 'new', element: <ProductsNewPage /> },
            { path: ':id', children: [
                { index: true, element: <ProductsDetailPage />},
                { path: 'edit', element: <ProductsEditPage />}
            ]}
        ]}
    ]},
])
```

### Loader data Navigation state
The loader function is executed before the route is loaded on the browser, so if the route is loaded that means data is present. But this also means that if the data is not coming from the backend / delayed the route will not be loaded. This is poor user experience as the user will not know why the route is not loaded. Hence we can display the navigation status on the page to show the state of the loader using useNavigation hook

> in RootLayout
```jsx
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  // Loader's navigation state
  const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {/* if navigation state is loading display loading */}   
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}
```

Why did we put the navigation state in root layout? because the page where the data is getting rendered will not be loaded till the entire data is recieved, hence we display the loader on the shared page. 

### Loader error handling
When the data is not being loaded, we can throw errors as follows
1. Returning our own error object
    ```jsx
    import { useLoaderData } from "react-router-dom";

    export default function ProductsPage() {
    const data = useLoaderData();
    // check if data has error
    if(data.isError){
        return <p>data.message</p>
    }
    const products = data.products;
    return (
        <>
        <ProductsList Products={products} />
        </>
    );
    }

    export async function loader() {
        const response = await fetch("http://localhost:8080/products");
        if (!response.ok) {
            // returning error object
            return { isError: true, message: 'Could not fetch products' }
        } else {
            return response
        }
    }
    ```
2. Thowing our own error Response
   >Throwing error object will render the closest ErrorElement to this route
    ```jsx
    import { useLoaderData } from "react-router-dom";

    export default function ProductsPage() {
    const data = useLoaderData();
    const products = data.products;
    return (
        <>
        <ProductsList Products={products} />
        </>
    );
    }

    export async function loader() {
        const response = await fetch("http://localhost:8080/products");
        if (!response.ok) {
            // throwing error response 
            throw new Response(JSON.stringify({message: 'Could not fetch products'}), {status: 500})
        } else {
            return response
        }
    }
    ```

    Extracting error data on ErrorPage using **useRouteError()**
    ```jsx
    import PageContent from "../components/PageContent";
    import { useRouteError } from "react-router-dom";

    export default function Error() {
    // If an error response is thrown, it can be handled using useRouteError() which has the status of the error
    const error = useRouteError();

    let title = "An error occured";
    let message = "Could not find this page";

    if (error.status === 500) {
        message = JSON.parse(error.data).message;
    }

    if (error.status === 404) {
        title = "Not found!";
        message = "could not find resource or page";
    }

    return <PageContent title={title}>{message}</PageContent>;
    }    
    ```

3. Using json() utility function
    ```jsx
    import { useLoaderData, json } from "react-router-dom";

    export default function ProductsPage() {
    const data = useLoaderData();
    const products = data.products;
    return (
        <>
        <ProductsList Products={products} />
        </>
    );
    }

    export async function loader() {
        const response = await fetch("http://localhost:8080/products");
        if (!response.ok) {
            // throwing error using json
            throw json({message: 'Could not fetch products'}, {status: 500})
        } else {
            return response
        }
    }
    ```

    Extracting error data on ErrorPage
    ```jsx
    import PageContent from "../components/PageContent";
    import { useRouteError } from "react-router-dom";

    export default function Error() {
    // If an error response is thrown, it can be handled using useRouteError() which has the status of the error
    const error = useRouteError();

    let title = "An error occured";
    let message = "Could not find this page";

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Not found!";
        message = "could not find resource or page";
    }

    return <PageContent title={title}>{message}</PageContent>;
    }    
    ```

### Sharing loaders between routes
```js
import { createBrowserRouter } from "react-router-dom";
import { loader as productLoader } from '../pages/ProductsPage' 
import { loader as productDetailLoader } from '../pages/ProductsDetailPage' 

const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'products',children: [
            { index: true, element: <ProductsPage />, loader: productLoader}
            { path: 'new', element: <ProductsNewPage /> },
            { path: ':id', 
            // Sharing loader between child routes
            loader: productDetailLoader,
            children: [
                { index: true, element: <ProductsDetailPage />},
                { path: 'edit', element: <ProductsEditPage />}
            ]}
        ]}
    ]},
])
```

### Dynamic Route loader
React router when calling the loader function passes an object to the loader function which has the request object (Which contains the request url) and the params object which contains the params coming in the request. Hence to load dynamic routes we can use params

```jsx
import React from "react";
import { useLoaderData, json } from "react-router-dom";
import ProductItem from "../components/ProductItem";

export default function ProductDetailsPage() {
  // Reading from a shared loader
  const data = useLoaderData();
  return <ProductItem product={data.product} />;
}

export async function loader({ request, params }) {
  // using params to get the id of the current item
  const id = params.id
  const response = await fetch("http://localhost:8080/products/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for the selected product" },
      { status: 500 }
    );
  } else {
    return response;
  }
}
```

### Accessing data from other route's loaders
To do this we need to add id prop to the route because we need to provide a reference for useRouteLoaderData() hook

```js
import { createBrowserRouter } from "react-router-dom";
import { loader as productLoader } from '../pages/ProductsPage' 
import { loader as productDetailLoader } from '../pages/ProductsDetailPage' 

const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'products',children: [
            { index: true, element: <ProductsPage />, loader: productLoader}
            { path: 'new', element: <ProductsNewPage /> },
            { path: ':id', 
            // Reference id for useRouteLoaderData
              id: 'product-detail',
              loader: productDetailLoader,
              children: [
                { index: true, element: <ProductsDetailPage />},
                { path: 'edit', element: <ProductsEditPage />}
            ]}
        ]}
    ]},
])
```

Accessing the data from 'product-detail' route
```jsx
import React from "react";
import { useRouteLoaderData, json } from "react-router-dom";
import ProductItem from "../components/ProductItem";

export default function ProductDetailsPage() {
  // Reading from another route's loader by passing route reference id
  const data = useRouteLoaderData("product-details");
  return <ProductItem product={data.product} />;
}
```

## Route Actions
Action functions are triggered when a Form component is submitted

### Router Forms
Submitting form data is very simple using react router, we need to use the Form component provided by the react-router-dom and make sure all the input tags have **'name'**  attribute to them
```jsx
import { useNavigate, Form } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  return (
    // Using react-router form to send data to action
    // This form automatically calls the action function of the nearest route
    // If we want to call action function of any other route, we can specify the action attribute to the Form with value of the route `action='/some-other-route'`
    <Form method="post" className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;
```
This Form component when submitted automatically calls the route action to which this component is rendered to. and also provides request and params to the action function.

### Action function declaration with redirect
```jsx
import React from "react";
import ProductForm from "../components/ProductForm";
import { json, redirect } from "react-router-dom";

export default function NewProductPage() {
  return <ProductForm />;
}

// Router action function
export async function action({ request, params }) {
  // Reading from  a react-router form
  const data = await request.formData();
  const productData = {
    title: data.get("title"),
    image: data.get("image"),
  };

  const response = await fetch("http://localhost:8080/products", {
    // method coming from Form component
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw json(
      { message: "Could not send details for the new product" + response.status },
      { status: 500 }
    );
  }
  
  // When form is submitted we should redirect user to the products page
  // Pass absolute path   
  return redirect("/products");
}
```

### Route-action mapping
```js
import { createBrowserRouter } from "react-router-dom";
import { loader as productLoader } from '../pages/ProductsPage' 
import { loader as productDetailLoader } from '../pages/ProductsDetailPage'
import { action as newProductAction } from '../pages/NewProductPage' 

const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'products',children: [
            { index: true, element: <ProductsPage />, loader: productLoader}
            { path: ':id', 
              id: 'product-detail',
              loader: productDetailLoader,
              children: [
                { index: true, element: <ProductsDetailPage />},
                { path: 'edit', element: <ProductsEditPage />}
            ]},
            // Mapping action to route
            { path: 'new', element: <ProductsNewPage />, action: newProductAction},
        ]}
    ]},
])
```

### Triggering actions programatically - useSubmit()
Actions are automatically triggered only when a Form component is submitted, but we can simulate a submit event to trigger an action

```jsx
import { Link, useSubmit } from "react-router-dom";

function ProductItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
      // Calling actions programatically using submit hook
      // Takes first arg as obj of data - available to action in request.formData()
      // Take second arg as method - available to aciton in request.method()
      // We can also add the action prop in the second arg if we need to trigger an action of some other route
      submit({}, { method: "delete" });
  }

  return (
    <>
    <h1> This is product detail </h1>
    <button onClick={startDeleteHandler}>Delete</button>
    </>
  );
}

export default ProductItem;
```

Now the action that is attached to the route that has this component will be triggered with a request
```js
export async function action({ request, params }) {
  const id = params.id;
  // send a request.method incoming from submit()
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for the selected event" },
      { status: 500 }
    );
  }
  return redirect("/events");
}
```

### Action state: useNavigate hook
While submitting the Form we might need to show the user of submitting state, if the submission is taking time due to slow backend this can be done using useNavigate()

```jsx
import { useNavigation, Form } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigation = useNavigation();
  // Get the submitting state from useNavigation   
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
    {/* Disable the save button if the state is submitting */}
    <button disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Save"}
    </button>
    </Form>
  );
}

export default EventForm;
```

### Action data: Validating user input
Similar to useLoadData() we have a useActionData() hook that provides us with the data in the action function. Hence we can do the back-end validation to user input data using this idea

```js
export async function action({ request, params }) {
  // Reading from  a react-router form
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  // User Input validation
  if (response.status === 422) {
    // Return the response coming from server
    // This value will be grasped by Form using useActionData() hook
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not send details for the new event" + response.status },
      { status: 500 }
    );
  }

  return redirect("/events");
}
```
And in EventForm
```jsx
function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Get the response data from action
  const data = useActionData();
  return (
    <Form method="POST" className={classes.form}>
      {/* Validating user input using action data */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      .
      .
      .
    </Form>
  );
}

export default EventForm;
```

### Reusable Router Form
In the above example we can see that the Form component and the action component can only send POST requests, but for editing contents, back-end needs a PATCH request with the id of the item that is being edited this can be done using the request object provided to action

```jsx
function EventForm({ method, event }) {
  return (
    // The method of the form is expected as a prop
    <Form method={method} className={classes.form}>
      .
      .
      .
    </Form>
  );
}

export default EventForm;
```
Action function
```js

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  // Adjust the URL according to the request method
  let url = "http://localhost:8080/events";
  if (request.method === "PATCH") {
    url = "http://localhost:8080/events/" + params.id;
  }

  const response = await fetch(url, {
    // Passing request method as type of HTTP req
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not send details for the new event" + response.status },
      { status: 500 }
    );
  }
  return redirect("/events");
}
```

## Fetcher
useFetcher is a special hook that provides us with various tools. We use the fetcher component when we want to trigger a loader or an action without actualy navigating to that route. i.e. updating / getting data behind the scenes.

Eg: Consider a form on the navbar that is present on the Root Layout, whenever we submit this form we will be taken to route specified in the router for this form. To avoid this instead of using the Form component we can use the fetcher Form component.

```jsx
import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  // Fetcher is a special hook which provides us a Form component, loader, submit -
  // we use the fetcher when we want to trigger a loader or an action without navigating to the page to which the loader/action belongs (i.e. behind the scenes)
  const fetcher = useFetcher();
  // Fetcher also provides us with a data object that has the data about the action performed, and a state of the fetcher
  const { data, state } = fetcher;

  useEffect(() => {
    // Acknowledging user on success
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    // Fetcher Form does trigger an action but without triggering any route transition to '/newsletter' route
    // This has to be done because this Form is present on the shared layout and whenever this will be submitted it will change the route, hence to prevent this route navigation behaviour
    // action attribute is important while using fetcher form
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
```

Rotuer definition
```js
.
.
{
  path: "newsletter",
  element: <NewsletterPage />,
  action: newsletterAction,
},
```

Note: Without fetcher, submitting the form will always take user to NewsLetter page, if we don't want to navigate user to this page and want to send the data behind the scenes we will have to use fetcher.Form


## Defered Loader
If the backend is slow to send data to a route, if that route has a loader, we might end up not rendering other components on that page until the data is completely loaded.

Also we can have a scenario where we have multiple components on a single page that are loading data. we need the flexibility to render the page and render the components later when we get it's data. This type of loading is called defered loading.

Hence for defering this data, we need to modify the loader. The loader needs to **return** a utility function **defer** provided by react-router-dom which takes an object of key values, key will hold the data, and value will be the function that returns a promise

```js

export default ProductsPage;
// Defered loading - should be async / await i.e. return a promise
async function loadProducts() {
  const response = await fetch("http://localhost:8080/products");
  if (!response.ok) {
    throw json({ message: "could not fetch roducts" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.products;
  }
}
```

```js
// Loader function to load the data before the page is rendered
export function loader() {
  // returning defered data loading
  return defer({
    products: loadProducts(),
  });
}
```

Now using this loader's data in rendering the page, we will need to use Await component with Suspense component (for fallback)
```jsx
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

function ProductsPage() {
  // reading the loader data
  const data = useLoaderData();
  return (
    // Suspense component is used to show fallback till the enclosed Await block's data arrives
    <Suspense fallback={<p>Loading...</p>}>
      {/* Awaiting differed components, resolving promise */}
      <Await resolve={data.products}>
        {/* This function will be called by react router once data is recieved for this Await block */}
        {(loadedProducts) => <ProductsList products={loadedProducts} />}
      </Await>
    </Suspense>
  );
}
```

This will be useful when we have mutliple data to show on a screen which needs loading
> Async loaders
```js

// Load the detail of single Product
async function loadProductDetail(id) {
  const response = await fetch("http://localhost:8080/products/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for the selected Product" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.product;
  }
}

// Load all Products
async function loadAllProducts() {
  const response = await fetch("http://localhost:8080/products");
  console.log(response);
  if (!response.ok) {
    throw json({ message: "could not fetch Products" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData.products;
  }
}
```

> Loader function
```js
export async function loader({ request, params }) {
  return defer({
    productDetail: loadProductDetail(params.id),
    allProducts: loadAllProducts(),
  });
}
```

> Rendering defered components
```jsx
export default function ProductDetailsPage() {
  const data = useRouteLoaderData("Product-details");
  return (
    <>
      {/* Every defered component needs it's own Suspense-Await block */}
      <Suspense>
        <Await resolve={data.ProductDetail}>
          {(loadedProduct) => <ProductItem Product={loadedProduct} />}
        </Await>
      </Suspense>

      <h1 style={{ textAlign: "center" }}>Other Products</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data.allProducts}>
          {(loadedProducts) => (
            <>
              <ProductsList Products={loadedProducts} />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
```

### defered preference
Now if we want one loader to be loaded with data before the route is rendered, we can await that loader in tht loader function
> Loader function
```js
export async function loader({ request, params }) {
  return defer({
    // The productDetail will be loaded then the route will be rendered
    productDetail: await loadProductDetail(params.id),
    // All products can be loaded independent of route rendering
    allProducts: loadAllProducts(),
  });
}
```

## Route Authentication 
To authenticate routes we will use a means of authentication token, this token will be generated from the backend and will be stored in the front end, and will be applied while accessing a restricted route.

### Login & Logout routes
> in router.js
```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      .
      .
      .
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]); 
```

### Login / Signup form
```jsx
export default function AuthForm() {
  // Retrieving query parameters, to toggle between login mode or signup mode
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  // Get response from action: showing errors on screen
  const data = useActionData();

  // Get form submission state
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {/* Display errors coming in response */}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        {/* Show acknowledgement / error message */}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          
          {/* Setting query parameters */}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          
          {/* Disable submit button if the form is still submitting */}
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}
```

### Login action
> Helper functions
```js Helper Functions
// Check if token is expired
export function getTokenDuration() {
  const storedExpiration = new Date(localStorage.getItem("expiration"));
  const now = new Date();

  const duration = storedExpiration.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}
```

> Action
```js
export async function action({ request }) {
  // Getting the user input data from auth form
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // Fetching query params: to know if this is routed to login or signup
  // NOTE: URL() is a browser function
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  // login / signup request to backend for auth-token
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  // Invalid request body
  if (response.status === 422 || response.status === 401) {
    // Show the error on UI
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  //Extract and Store the token recieved in response
  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);

  // Store the expiration time to current time + 1 hrs
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  console.log(expiration);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
```

### Logout action
```js
import { redirect } from "react-router-dom";

export function action() {
  // Delete the stored token and expiration time
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
}
```

### Sharing token to routes
> in router.js
```js #6-10
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    // Sharing the token to all the routes using id+loader
    // Whenever any navigation occurs, this loader will be loaded - 
    // hence when user logs in, all the routes will have the token
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":id",
            id: "event-details",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: delteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventAddUpdateAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: eventAddUpdateAction,
          },
        ],
      },
    ],
  },
]); 
```

### Accessing shared token on individual routes UI & actions
> In event-details component: hiding, edit and delete buttons based on availability of token
```jsx #13-19
export default function EventItem({ event }) {
  const submit = useSubmit();
  
  // Get the login token from the share root loader
  const token = useRouteLoaderData("root");

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      
      {/* Only show action buttons ,If token is available */}
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}

    </article>
  );
}
```

> In route actions when we call the API
> We cannot use the useRouteLoaderData hook in the action component, hence we use the helper functions
> to get the token directly from localStorage
```js
export async function action({ request, params }) {
  const id = params.id;
  // Get the stored auth token for restricted delete action
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
    // Send the token as a Authorization Bearer token 
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 401 || response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }
  return redirect("/events");
}

```

### Route protection
Even if we hide the routes from the user on UI, the user can manually enter the routes on the browser's URL bar and access it, hence we need to protect the routes and redirect the user to login page if the route is auth-protected.

To do this we can add a loader to these routes which will check if token is present or not

```js
// Protecting a route by checking if user is not logged in, redirect user to login page
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  // Loader should always return something
  return null;
}
```

> Updated router
```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    // Sharing the token to all the routes using id+loader
    // Whenever any navigation occurs, this loader will be loaded - 
    // hence when user logs in, all the routes will have the token
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":id",
            id: "event-details",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: delteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventAddUpdateAction,
                loader: checkAuthLoader, // route protection loader
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: eventAddUpdateAction,
            loader: checkAuthLoader, // route protection loader
          },
        ],
      },
    ],
  },
]); 
```

### Auto Logout on token expiration
To do this, we need to keep a track of the expiration duration hence we store the expiration duration when user logs in.

To do this, we need to run the timeout on a page that is always present on the screen i.e. RootLayout
>in RootPage
```js
export default function RootLayout() {
  // Get the token from the shared loader
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    // If not logged in, return
    if (!token) {
      return;
    }

    // Token already expired
    if (token === "EXPIRED") {
      // programatically submit to logout route
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    // Extract the tokenDuration
    const tokenDuration = getTokenDuration();
    // set a timeout for the tokenDuration
    setTimeout(() => {
      // programatically submit to logout route once the timeout expires
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
```