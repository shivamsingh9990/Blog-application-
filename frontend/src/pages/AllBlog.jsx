import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import BlogCard from "../components/Blogcard";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AllBlogs = function () {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 const API = import.meta.env.VITE_API_URL;

 useEffect(function () {
   async function FetchBlogs() {
     if (!user?.email) {
       setBlogs([]);
       setIsLoading(false);
       return;
     }

     try {
       const response = await axios.get(
         `${API}/api/v1/blogs/${encodeURIComponent(user.email)}`,
       );

       setBlogs(response.data);
     } catch (error) {
       toast.error("No blog something went wrong!!!!");
       console.log(error);
     } finally {
       setIsLoading(false);
     }
   }

   FetchBlogs();
 }, []);
  return (
    <main>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Blogs</h1>
        <p>Explore the amazing stories</p>
      </div>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
          {blogs.map(function (blog) {
            return <BlogCard key={blog._id} blog={blog} />;
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No Blog available yet</p>
          <Link
            to="/add-blogs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Write the First Blog
          </Link>
        </div>
      )}
    </main>
  );
};
export default AllBlogs;