"use client";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import FeaturedBlog from "./FeaturedBlog";

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${API_URL}/blog_posts`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : data.blog_posts || []);
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-8">Loading blogs...</div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="text-center text-gray-400 py-8">No blog posts yet.</div>
    );
  }

  // Assume the first blog is the featured one, or filter if you have a flag
  const [featured, ...others] = blogs;

  return (
    <div>
      {/* Featured Blog */}
      <div className="mb-10">
        <FeaturedBlog blog={featured} />
      </div>

      {/* Regular Blogs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {others.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
