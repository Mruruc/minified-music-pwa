import { Link } from "lucide-react";
import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div className="w-full flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <NavLink to={"/"}>
          <Link className="text-blue-500 underline hover:text-blue-700">
            Return to Home
          </Link>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
