import {
  useNavigate,
  useNavigation,
  Form,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const data = useActionData();
  return (
    // Using react-router form to send data to action
    // This form automatically calls the action function of the nearest route
    // If we want to call action function of any other route, we can specify the action attribute to the Form with value of the route `action='/some-other-route'`
    <Form method={method} className={classes.form}>
      {/* Validating user input using action data */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  // Reading from  a react-router form
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";
  if (request.method === "PATCH") {
    url = "http://localhost:8080/events/" + params.id;
  }

  console.log(url);

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

  // redirect to another route when form is submitted
  return redirect("/events");
}
