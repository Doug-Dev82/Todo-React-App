import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 text-blue-500 hover:text-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
