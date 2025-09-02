import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Camera } from "lucide-react";

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <div className="shadow-lg bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-xl transition-shadow font-display">
      <div className="relative h-44 bg-stone-100 flex items-center justify-center group">
        {blog.blog_picture ? (
          <>
            <img
              src={blog.blog_picture}
              alt={blog.blog_topic}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <span className="text-stone-300">No Image</span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 bg-white/90">
        <Badge className="border-none bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs rounded-full tracking-wide shadow whitespace-nowrap inline-flex items-center gap-1 w-fit">
          {blog.category === "Plant Knowledge" && (
            <Leaf className="h-4 w-4 text-emerald-600" />
          )}
          {blog.category === "School Visits" && (
            <Users className="h-4 w-4 text-blue-600" />
          )}
          {blog.category === "Farming Tips" && (
            <Leaf className="h-4 w-4 text-amber-600" />
          )}
          {blog.category === "Events" && (
            <Camera className="h-4 w-4 text-rose-600" />
          )}
          <span>{blog.category}</span>
        </Badge>
        <div className="font-semibold text-stone-800 text-lg line-clamp-2">
          {blog.blog_topic}
        </div>
        <div className="text-stone-600 text-sm mb-2 line-clamp-2">
          {blog.content?.slice(0, 100)}
          {blog.content?.length > 100 ? "..." : ""}
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
          <span>By {blog.author}</span>
          <span>·</span>
          <span>
            {blog.created_at
              ? new Date(blog.created_at).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
