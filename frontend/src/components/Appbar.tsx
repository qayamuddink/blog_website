
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Appbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  function handleSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link to={"/blogs"}>
        <h1 className="text-3xl font-serif font-bold">Blog website</h1>
      </Link>
      <div className="flex items-center gap-6">
        <Link to={"/publish"}>
          <button className="text-gray-600 hover:text-gray-900">Write</button>
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        ) : (
          <Link to={"/signin"}>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
