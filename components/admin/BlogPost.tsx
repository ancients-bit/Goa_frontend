"use client";

import React, { useState, useEffect } from "react";
import AdminNavigation from "./AdminNavigation";
import blogPostsService, {
  BlogPost,
  CreateBlogPostData,
  UpdateBlogPostData,
} from "../../services/blogPostsService";

interface BlogPostFormData {
  author: string;
  blog_topic: string;
  content: string;
  category: string;
  blog_picture: string;
}

export default function BlogPosts() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogPostFormData>({
    author: "",
    blog_topic: "",
    content: "",
    category: "",
    blog_picture: "",
  });

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogPostsService.getAllBlogPosts();
      setBlogs(data);
    } catch (err: any) {
      console.error("Failed to fetch blog posts:", err);
      setError(err.message || "Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBlog) {
        // Update existing blog post
        const updatedBlog = await blogPostsService.updateBlogPost(
          editingBlog.id,
          formData
        );
        setBlogs((prev) =>
          prev.map((blog) => (blog.id === editingBlog.id ? updatedBlog : blog))
        );
        setEditingBlog(null);
      } else {
        // Create new blog post
        const newBlog = await blogPostsService.createBlogPost(formData);
        setBlogs((prev) => [newBlog, ...prev]);
      }

      // Reset form
      setFormData({
        author: "",
        blog_topic: "",
        content: "",
        category: "",
        blog_picture: "",
      });
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      console.error("Failed to save blog post:", err);
      setError(err.message || "Failed to save blog post");
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      author: blog.author,
      blog_topic: blog.blog_topic,
      content: blog.content,
      category: blog.category,
      blog_picture: blog.blog_picture,
    });
    setShowForm(true);
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      await blogPostsService.deleteBlogPost(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setError(null);
    } catch (err: any) {
      console.error("Failed to delete blog post:", err);
      setError(err.message || "Failed to delete blog post");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormData({
      author: "",
      blog_topic: "",
      content: "",
      category: "",
      blog_picture: "",
    });
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-50">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
            <p className="mt-4 text-soil-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-soil-800 mb-2">
            Blog Management
          </h1>
          <p className="text-soil-600">Create and manage blog posts</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 font-semibold mb-2">Error</div>
            <div className="text-red-700">{error}</div>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Blog Post
          </button>

          <button
            onClick={fetchBlogs}
            className="inline-flex items-center px-4 py-2 border border-earth-300 text-sm font-medium rounded-md text-soil-700 bg-white hover:bg-earth-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Blog Post Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-earth-200">
                <h2 className="text-xl font-semibold text-soil-800">
                  {editingBlog ? "Edit Blog Post" : "New Blog Post"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-soil-700 mb-1"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 border border-earth-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-500 focus:border-forest-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="blog_topic"
                    className="block text-sm font-medium text-soil-700 mb-1"
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    id="blog_topic"
                    value={formData.blog_topic}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        blog_topic: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 border border-earth-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-500 focus:border-forest-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-soil-700 mb-1"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 border border-earth-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-500 focus:border-forest-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="blog_picture"
                    className="block text-sm font-medium text-soil-700 mb-1"
                  >
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="blog_picture"
                    value={formData.blog_picture}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        blog_picture: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 border border-earth-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-500 focus:border-forest-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-soil-700 mb-1"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-earth-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-500 focus:border-forest-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-earth-300 text-sm font-medium rounded-md text-soil-700 bg-white hover:bg-earth-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
                  >
                    {editingBlog ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Blog Posts List */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-earth-200 p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-soil-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-soil-900">
              No blog posts yet
            </h3>
            <p className="mt-1 text-sm text-soil-500">
              Get started by creating your first blog post.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-sm border border-earth-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={blog.blog_picture}
                  alt={blog.blog_topic}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-forest-100 text-forest-800">
                      {blog.category}
                    </span>
                    <span className="text-xs text-soil-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-soil-800 mb-2 line-clamp-2">
                    {blog.blog_topic}
                  </h3>
                  <p className="text-soil-600 text-sm mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-soil-500">
                      By {blog.author}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-forest-600 hover:text-forest-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
