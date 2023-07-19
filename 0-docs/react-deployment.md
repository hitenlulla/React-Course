# Deploying React app
- [Deploying React app](#deploying-react-app)
  - [Dev-Testing code](#dev-testing-code)
  - [Optimizing code](#optimizing-code)
    - [Lazy loading pages](#lazy-loading-pages)
    - [Dynamic importing actions \& loaders](#dynamic-importing-actions--loaders)
    - [Implementing optimizations in router](#implementing-optimizations-in-router)
  - [Building app for production\\](#building-app-for-production)
  - [Uploading to server](#uploading-to-server)
  - [Configure server to server SPA](#configure-server-to-server-spa)

## Dev-Testing code
We are supposed to test all the features on the react app before deploying on the internet

## Optimizing code
Our react apps use direct import statements, which imports the functions prior to sending it to the server, if there are a lot of import statements, bundling will be slower hence slower to load the site for the user

To improve the loading we follow the following principles
### Lazy loading pages
Lazy loading requests the page when the route is triggered, hence not bundled while serving the files.
```js
const BlogPage = lazy(() => import("./pages/Blog"));
```
while rendering the page element in route, it needs to be enclosed in a Suspense component
```js
element: (
            <Suspense fallback={<p>Loading...</p>}>
              <BlogPage />
            </Suspense>
          ),
```

### Dynamic importing actions & loaders
For every route, the action and the loader functions are loaded prior to the route being requested, this can be changed by dynamic importing the routes using **import()**
```js
loader: (meta) => import("./pages/Post").then((module) => module.loader(meta))
```

### Implementing optimizations in router

```jsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Always importing HomePage because it is the first page to be served
import HomePage from "./pages/Home";
// Always importing RootLayout because it is the always served
import RootLayout from "./pages/Root";

// Not importing the following pages statically
// import BlogPage, { loader as postsLoader } from './pages/Blog';
// import PostPage, { loader as postLoader } from './pages/Post';

// Lazy loading react-router pages - Loaded when the route is triggered and the page is supposed to be loaded
const BlogPage = lazy(() => import("./pages/Blog"));
const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            // Suspense component waits for the enclosed data (page) to be loaded and provides a fallback meanwhile
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            // Dynamic importing loader & action functions
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            // Dynamic importing loader & action functions with forwarding the meta object provided by react-router
            loader: (meta) =>
              import("./pages/Post").then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

```

## Building app for production\
create-react-app provides us with npm scripts to bundle the entire code into plain HTML-CSS-JS code
> npm run build

This will put the build files in the build folder

## Uploading to server
This is dependent on type of hosting provider.
In our case, react is a statically served site, hence we can use static site host providers.

eg: firebase

## Configure server to server SPA
Make sure the react app is always configured as a single page application, else when the user tries to go to a particular URL manually, the request will go the the server and the server will not find any defined routes for that URL and return a 404.

If the app is configured as a SPA, it will always return the same index.js file, in which the routes will be handled by react-router