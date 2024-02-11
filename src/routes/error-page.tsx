import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: Error | null = useRouteError() as Error;
  console.error(error);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="error-page" className="bg-white p-8 rounded-lg">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    </div>
  );
}
