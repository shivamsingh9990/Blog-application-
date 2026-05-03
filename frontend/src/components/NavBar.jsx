import { Link, useNavigate } from "react-router-dom"; // Fix import
import { useAuth } from "../contexts/AuthContext";

const Navbar = function () {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-red-400 text-white shadow-lg">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Only-Gyan
          </Link>

          <nav className="space-x-6 flex items-center">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              HOME
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors">
              ABOUT
            </Link>
            <Link to="/blogs" className="hover:text-blue-200 transition-colors">
              EXPLORE BLOGS
            </Link>
            {user && (
              <>
                <Link to="/my-blogs" className="hover:text-blue-200 transition-colors">
                  MY BLOGS
                </Link>
                <Link
                  to="/add-blogs"
                  className="hover:text-blue-200 transition-colors"
                >
                  CREATE BLOG
                </Link>
              </>
            )}
             {user && (
              <span className="ml-4 text-sm opacity-90 whitespace-nowrap">{user.name || "User"} ({user.email})</span>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-400 font-bold text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// filepath: c:\Users\Shivam\Documents\full_stack_project[1]\full stack project\frontend\src\components\NavBar.jsx