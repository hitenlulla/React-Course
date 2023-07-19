import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";

export default function Error() {
  // If an error response is thrown, it can be handled using useRouteError() which has the status of the error
  const error = useRouteError();

  let title = "An error occured";
  let message = "Could not find this page";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "could not find resource or page";
  }

  return <PageContent title={title}>{message}</PageContent>;
}
