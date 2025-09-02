"use client";
import { useEffect, useState } from "react";

export default function PopularPosts() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/admin/blog_posts`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : data.blog_posts || []);
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Loading popular posts...
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="text-center text-gray-400 py-4">
        No popular posts yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {blogs.slice(0, 3).map((blog) => (
        <div
          key={blog.id}
          className="flex gap-3 p-3 rounded-lg bg-white hover:bg-emerald-50/40 border border-stone-100 shadow-sm items-center transition group"
        >
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center">
            {blog.blog_picture ? (
              <img
                src={blog.blog_picture}
                alt={blog.blog_topic}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-stone-300 text-lg">No Image</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-stone-800 text-sm line-clamp-2">
              {blog.blog_topic}
            </div>
            <div className="flex items-center text-xs text-stone-400 mt-1 gap-2">
              <span>
                {blog.created_at
                  ? new Date(blog.created_at).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
