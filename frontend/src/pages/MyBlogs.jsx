import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../components/Blogcard";
import { toast } from "react-toastify";

// ✅ Use environment variable (BEST PRACTICE)
const API_URL = "https://blog-application-lwf0.onrender.com";

const MyBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Get user email once
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    async function fetchMyBlogs() {
      if (!userEmail) {
        setBlogs([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/v1/blogs`);

        // ✅ Filter only user's blogs
        const myBlogs = response.data.filter(
          (blog) => blog.userEmail === userEmail,
        );

        setBlogs(myBlogs);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMyBlogs();
  }, [userEmail]);

  // ✅ Edit handler
  const handleEdit = (blog) => {
    navigate("/add-blogs", { state: { blog } });
  };

  // ✅ Delete handler (fixed URL)
  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/api/v1/blogs/${blogId}`, {
        data: { userEmail },
      });

      // ✅ Update UI instantly
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));

      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting blog");
    }
  };

  return (
    <main>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">My Blogs</h1>
        <p>Your personal posts linked to your email</p>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : blogs.length > 0 ? (
        // ✅ Blog Grid
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        // ✅ Empty State
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't written any blogs yet.
          </p>

          <Link
            to="/add-blogs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Write your first blog
          </Link>
        </div>
      )}
    </main>
  );
};

export default MyBlogs;
