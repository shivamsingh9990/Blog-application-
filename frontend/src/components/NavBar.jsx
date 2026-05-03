import { Link, useNavigate } from "react-router-dom"; // Fix import

const Navbar = function () {
  const navigate = useNavigate();
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : null;
  const userName = typeof window !== 'undefined' ? localStorage.getItem("userName") : null;

  const handleLogout = () => {
    try {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
    } catch {}
    navigate("/signup");
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
            <Link to="/my-blogs" className="hover:text-blue-200 transition-colors">
              MY BLOGS
            </Link>
            <Link
              to="/add-blogs"
              className="hover:text-blue-200 transition-colors"
            >
              CREATE BLOG
            </Link>
             {userEmail && (
              <span className="ml-4 text-sm opacity-90 whitespace-nowrap">{userName || "User"} ({userEmail})</span>
            )}
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-400 font-bold text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
           
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// filepath: c:\Users\Shivam\Documents\full_stack_project[1]\full stack project\frontend\src\components\NavBar.jsx