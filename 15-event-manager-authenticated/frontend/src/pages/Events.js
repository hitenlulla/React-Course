import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const data = useLoaderData();
  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Events</h1>
      {/* Suspense component is used to show fallback till the enclosed Await block's data arrives */}
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        {/* Awaiting differed components, resolving promise */}
        <Await resolve={data.events}>
          {/* This function will be called by react router once data is recieved for this Await block */}
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;
// Defered loading - should be async / await or promise
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" };
    // Throwing error responses: This is taken care by the nearest Error page
    throw json({ message: "could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// Loader function to load the data before the page is rendered
export function loader() {
  // returning defered data loading
  return defer({
    events: loadEvents(),
  });
}
