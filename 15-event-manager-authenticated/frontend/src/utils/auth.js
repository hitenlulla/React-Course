import { redirect } from "react-router-dom";

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

// Protecting a route by checking if user is not logged in, redirect user to login page
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  // Loader should always return something
  return null;
}
