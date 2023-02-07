import { useRouteError } from "react-router-dom";
import Segments from "./Segments";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Segments value={error.status} />
      <h2>Error: {error.statusText || error.message}</h2>
      <a href="/" className="button-outline">Go Home</a>
    </div>
  );
}