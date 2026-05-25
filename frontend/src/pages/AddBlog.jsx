import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const AddBlog = function () {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const editingBlog = location.state?.blog;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title || "");
      setContent(editingBlog.content || "");
      setAuthor(editingBlog.author || "");
      setTags(editingBlog.tags?.join(", ") || "");
      setImagePreview(editingBlog.imageUrl || "");
      setImageDescription(editingBlog.imageDescription || "");
    }
  }, [editingBlog]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to create a blog");
      return;
    }

    const newBlog = {
      title: title,
      content: content,
      author: author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      imageUrl: imagePreview,
      imageDescription,
      userEmail: user.email,
    };

    try {
      setIsLoading(true);
      if (editingBlog) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/blogs/${editingBlog._id}`,
          newBlog,
        );
        toast("Blog updated successfully");
      } else {
        await axios.post(
          "`${import.meta.env.VITE_API_URL}/api/v1/blogs`",
          newBlog,
        );
        toast("New blog added");
      }
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      toast("Error creating blog, please try again!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto">
      <h1 className="flex items-center justify-center gap-2   text-4xl text-gray-700 font-bold mb-8 text-center">
        {editingBlog ? "Edit Blog" : "Write new blog"}
        <SquarePen width={32} height={32} />
      </h1>

      <form
        className="bg-white rounded-lg shadow-md p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {" "}
            Title{" "}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your blog title"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="Author"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {" "}
            Author{" "}
          </label>
          <input
            type="text"
            id="Author"
            name="Author"
            required
            className="w-full px-3 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
            placeholder="your name"
            value={author}
            onChange={function (e) {
              setAuthor(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {" "}
            Content{" "}
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={12}
            className="w-full px-3 py-2 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your blog content...."
            value={content}
            onChange={function (e) {
              setContent(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Blog Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700"
            onChange={function (e) {
              const file = e.target.files?.[0];
              if (!file) {
                setImagePreview("");
                return;
              }
              const reader = new FileReader();
              reader.onload = function (event) {
                setImagePreview(event.target.result || "");
              };
              reader.readAsDataURL(file);
            }}
          />
          {imagePreview ? (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Blog preview"
                className="w-full max-h-72 object-cover rounded-lg border border-gray-200"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">Choose an image to show with your blog.</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="imageDescription"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            About this image
          </label>
          <input
            type="text"
            id="imageDescription"
            name="imageDescription"
            className="w-full px-3 py-2 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Describe the image or explain why it matters"
            value={imageDescription}
            onChange={function (e) {
              setImageDescription(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            required
            className="w-full px-3 py-2 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter tags separated by comma (eg..,technology,react)"
            value={tags}
            onChange={function (e) {
              setTags(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? "Saving..." : editingBlog ? "Update Blog" : "Publish Blog"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBlog;