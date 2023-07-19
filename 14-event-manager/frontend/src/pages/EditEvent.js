import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

export default function EditEventPage() {
  // Reading from a share route loader
  const data = useRouteLoaderData("event-details");
  // Form should have a method of patch for edit to work
  return <EventForm event={data.event} method="PATCH" />;
}
