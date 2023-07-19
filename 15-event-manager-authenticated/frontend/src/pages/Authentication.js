import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

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
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

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
