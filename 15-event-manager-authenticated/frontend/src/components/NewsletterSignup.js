import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  // Fetcher is a special hook which provides us a Form component, loader, submit -
  // we use the fetcher when we want to trigger a loader or an action without navigating to the page to which the loader/action belongs
  const fetcher = useFetcher();
  // Fetcher also provides us with a data object that has the data about the action performed
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    // Fetcher Form does trigger an action but without triggering any route transition to '/newsletter' route
    // This has to be done because this Form is present on the shared layout and whenever this will be submitted it will change the route, hence to prevent this route navigation behaviour
    // action attribute is important while using fetcher form
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
