import React from 'react'
import { Link } from 'react-router-dom'; // Fix: use react-router-dom

const Blogcard = ({ blog, onEdit, onDelete }) => { // Fix: PascalCase for component name
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <article className='bg-white rounded-3xl shadow-2xl p-6 hover:-translate-y-1 transition-transform duration-300'>
      {blog.imageUrl && (
        <div className='mb-5 overflow-hidden rounded-3xl shadow-sm'>
          <img
            src={blog.imageUrl}
            alt={blog.imageDescription || blog.title}
            className='w-full h-72 object-cover'
          />
        </div>
      )}

      <div className='flex flex-col gap-4'>
        <div>
          <div className='flex items-center justify-between gap-3 mb-3'>
            <span className='text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold'>
              {blog.tags && blog.tags.length > 0 ? blog.tags[0] : "Blog"}
            </span>
            <span className='text-xs text-gray-500'>{formatDate(blog.createdAt)}</span>
          </div>

          <h3 className='text-2xl font-semibold text-gray-900 leading-tight mb-3'>
            <Link to={`/blog/${blog._id}`} className='hover:text-blue-600 transition-colors'>
              {blog.title}
            </Link>
          </h3>

          <p className='text-gray-600 text-sm leading-6 line-clamp-4'>
            {blog.content}
          </p>
        </div>

        {blog.imageDescription && (
          <div className='rounded-2xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800'>
            <strong className='font-semibold'>Image note:</strong> {blog.imageDescription}
          </div>
        )}

        {blog.tags && blog.tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className='inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700'
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-sm text-gray-500'>
            <p>Author: <span className='font-medium text-gray-800'>{blog.author}</span></p>
            <p className='mt-1'>Length: <span className='font-medium text-gray-800'>{blog.content?.length ?? 0} chars</span></p>
          </div>
          <div className='flex gap-2'>
            <Link
              to={`/blog/${blog._id}`}
              className='inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors'
            >
              View details
            </Link>
            {onEdit && (
              <button
                onClick={() => onEdit(blog)}
                className='inline-flex items-center justify-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors'
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(blog._id)}
                className='inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors'
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Blogcard; // Fix: PascalCase for