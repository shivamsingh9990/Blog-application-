import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../components/Blogcard";
import { toast } from "react-toastify";

const MyBlogs = function () {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchMyBlogs() {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        setBlogs([]);
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/blogs/${encodeURIComponent(email)}`);
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMyBlogs();
  }, []);

  const handleEdit = (blog) => {
    navigate("/add-blogs", { state: { blog } });
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const userEmail = localStorage.getItem("userEmail");
    try {
      await axios.delete(`http://localhost:8080/api/v1/blogs/${blogId}`, {
        data: { userEmail },
      });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      toast("Blog deleted successfully");
    } catch (error) {
      console.log(error);
      toast("Error deleting blog");
    }
  };

  return (
    <main>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">My Blogs</h1>
        <p>Your personal posts linked to your email</p>
      </div>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
          {blogs.map(function (blog) {
            return <BlogCard key={blog._id} blog={blog} onEdit={handleEdit} onDelete={handleDelete} />;
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't written any blogs yet.</p>
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



