import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const [showTabs, setShowTabs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("mytoken");
    setShowTabs(!!token); // Simpler and more explicit check
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    setShowTabs(false);
    navigate("/"); // Redirect to the landing page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-3">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link to={showTabs ? "/home" : "/"}>ToDo</Link>
        </h1>
        {showTabs && (
          <div className="flex items-center">
            <Link
              to="/home"
              className="mx-4 py-1 px-3 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/complete"
              className="mx-4 py-1 px-3 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Completed
            </Link>
            <button
              onClick={handleLogout}
              className="mx-4 py-1 px-3 rounded hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
