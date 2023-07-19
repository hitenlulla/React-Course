import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import HomePage from "../pages/Home";
import EventsPage from "../pages/Events";
import EventDetailPage from "../pages/EventDetails";
import NewEventPage from "../pages/NewEvent";
import EditEventPage from "../pages/EditEvent";
import Error from "../pages/Error";
import EventsRoot from "../pages/EventsRoot";
import NewsletterPage from "../pages/Newsletter";
import AuthenticationPage from "../pages/Authentication";

import { loader as eventsLoader } from "../pages/Events";
import { loader as eventDetailLoader } from "../pages/EventDetails";
import { action as eventAddUpdateAction } from "../components/EventForm";
import { action as delteEventAction } from "../pages/EventDetails";
import { action as newsletterAction } from "../pages/Newsletter";
import { action as authAction } from "../pages/Authentication";
import { action as logoutAction } from "../pages/Logout";
import { tokenLoader } from "../utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    // Sharing the token to all the routes using id+loader
    // Whenever any navigation occurs, this loader will be loaded - hence when user logs in, all the routes will have the token
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
            loader: eventsLoader, // Using a loader to fetch the data before rendering the page
          },
          {
            path: ":id",
            // Using a shared loader between multiple routes
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
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
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

export default router;
