import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Users, Camera } from "lucide-react";

export default function FeaturedBlog({ blog }: { blog: any }) {
  return (
    <div className="relative flex flex-col md:flex-row bg-gradient-to-br from-emerald-50 via-white to-stone-100 shadow-2xl rounded-3xl overflow-hidden border border-emerald-100">
      {/* Image Section */}
      <div className="md:w-2/5 w-full h-64 md:h-auto relative group">
        {blog.blog_picture ? (
          <>
            <img
              src={blog.blog_picture}
              alt={blog.blog_topic}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-stone-200">
            <span className="text-stone-400 text-lg">No Image</span>
          </div>
        )}
        <Badge className="absolute top-4 left-4 bg-emerald-600 text-white font-body shadow-lg px-4 py-2 text-base rounded-full">
          Featured
        </Badge>
      </div>
      {/* Content Section */}
      <div className="flex-1 p-8 flex flex-col justify-center bg-white/80 backdrop-blur-md">
        
          
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-4 leading-tight drop-shadow-sm">
          {blog.blog_topic}
        </h2>
        <p className="text-stone-700 mb-6 leading-relaxed font-body text-lg">
          {blog.content?.slice(0, 180)}
          {blog.content?.length > 180 ? "..." : ""}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-base text-stone-500 font-body gap-3">
            <span className="font-semibold text-emerald-700">
              {blog.author}
            </span>
            <span className="text-stone-400">|</span>
            <span>
              {blog.created_at
                ? new Date(blog.created_at).toLocaleDateString()
                : ""}
            </span>
          </div>
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-green-500 font-body font-semibold px-6 py-2 rounded-full shadow"
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
}
