import React, { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../utils/auth";

export default function EventDetailsPage() {
  // Reading from a shared loader
  const data = useRouteLoaderData("event-details");

  return (
    <>
      {/* Every defered component has it's own Suspense-Await block */}
      <Suspense>
        <Await resolve={data.eventDetail}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <h1 style={{ textAlign: "center" }}>Other events</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data.allEvents}>
          {(loadedEvents) => (
            <>
              <EventsList events={loadedEvents} />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}

// Load the detail of single event
async function loadEventDetail(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for the selected event" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

// Load all events
async function loadAllEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  return defer({
    eventDetail: loadEventDetail(params.id),
    allEvents: loadAllEvents(),
  });
}

export async function action({ request, params }) {
  const id = params.id;
  // Get the stored auth token for restricted delete action
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
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
