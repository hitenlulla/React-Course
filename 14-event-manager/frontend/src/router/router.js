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
import { loader as eventsLoader } from "../pages/Events";
import { loader as eventDetailLoader } from "../pages/EventDetails";
import { action as eventAddUpdateAction } from "../components/EventForm";
import { action as delteEventAction } from "../pages/EventDetails";
import { action as newsletterAction } from "../pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
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
    ],
  },
]);

export default router;
