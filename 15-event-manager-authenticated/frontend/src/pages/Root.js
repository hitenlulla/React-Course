import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
// import { useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../utils/auth";

export default function RootLayout() {
  // Automatically logging out after token expires
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    // If not logged in, return
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    // Extract the tokenDuration
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(() => {
      // programatically submit to logout route
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  // Loader's navigation state
  // const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}
