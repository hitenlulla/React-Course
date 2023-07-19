import React, { Suspense } from "react";
import EventForm from "../components/EventForm";
import { Await, useRouteLoaderData } from "react-router-dom";

export default function EditEventPage() {
  // Reading from a share route loader
  const data = useRouteLoaderData("event-details");
  // Form should have a method of patch for edit to work
  return (
    <Suspense fallback={<p>Loading existing data...</p>}>
      <Await resolve={data.eventDetail}>
        {(loadedEvent) => <EventForm event={loadedEvent} method="PATCH" />}
      </Await>
    </Suspense>
  );
}
