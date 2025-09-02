"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Camera, Play, X } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import BlogList from "@/components/BlogList";
import PopularPosts from "@/components/PopularPosts";

function VideoCard({
  src,
  title,
  description,
  onOpen,
  poster,
}: {
  src: string;
  title: string;
  description: string;
  onOpen: () => void;
  poster?: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            imageRef.current.src = poster || '';
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [poster]);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative">
        <div className="w-full h-48 relative">
          <img
            ref={imageRef}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            alt={title}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-stone-100 animate-pulse" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 right-3 bg-white/70 backdrop-blur rounded-full p-2 shadow">
          <Play className="w-4 h-4 text-stone-700" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
        <p className="text-stone-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const categories = [
    { name: "Plant Knowledge", count: 12, icon: Leaf, color: "emerald" },
    { name: "School Visits", count: 8, icon: Users, color: "blue" },
    { name: "Farming Tips", count: 15, icon: Leaf, color: "amber" },
    { name: "Events", count: 6, icon: Camera, color: "rose" },
  ];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${API_URL}/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriber: { email } }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.errors?.join(", ") || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setEmail("");
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 font-display">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Garden Insights
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-body">
            Discover plant wisdom, farming techniques, and stories from our
            community. Learn from nature's classroom and join the conversation
            about sustainable living.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <BlogList />
          </div>
          <div className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <h3 className="text-xl font-semibold text-stone-800">
                  Categories
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 bg-${category.color}-100 rounded-lg flex items-center justify-center mr-3`}
                        >
                          <category.icon
                            className={`h-4 w-4 text-${category.color}-600`}
                          />
                        </div>
                        <span className="text-stone-700 font-body">
                          {category.name}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs font-body">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-emerald-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Stay Connected
                  </h3>
                  <p className="text-stone-600 text-sm mb-6 font-body">
                    Get the latest insights, tips, and stories from Garden of
                    Ancients delivered to your inbox.
                  </p>
                  <form className="space-y-3" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-body"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === "loading"}
                    />
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-body"
                      type="submit"
                      disabled={status === "loading" || !email}
                    >
                      {status === "loading" ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>
                  {status === "success" && (
                    <p className="text-green-600 text-sm mt-2">
                      Thank you for subscribing!
                    </p>
                  )}
                  {status === "error" && error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <h3 className="text-xl font-semibold text-stone-800">
                  Popular This Month
                </h3>
              </CardHeader>
              <CardContent>
                <PopularPosts />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Videos Section */}
      <section className="bg-gradient-to-br from-stone-100 to-emerald-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">
            Featured Garden Videos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <VideoCard
              src="/GOA BEE KEEPING.mp4"
              title="Bee Keeping"
              description="Explore the vital role of bees and the gentle art of keeping them thriving."
              onOpen={() => setActiveVideo("/GOA BEE KEEPING.mp4")}
              poster="/BeeKeeping.png"
            />
            <VideoCard
              src="/GOA SPICE ENCLAVE.mp4"
              title="Spice Enclave"
              description="Step into a fragrant enclave where seeds and pods shape culinary traditions."
              onOpen={() => setActiveVideo("/GOA SPICE ENCLAVE.mp4")}
              poster="/SpiceEnclave.png"
            />
            <VideoCard
              src="/GOA WATER CONSERVATION.mp4"
              title="Water Conservation"
              description="Simple, smart techniques for saving every precious drop in the garden."
              onOpen={() => setActiveVideo("/GOA WATER CONSERVATION.mp4")}
              poster="/WaterConservation.png"
            />
          </div>
        </div>
      </section>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-emerald-400"
              title="Close video"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={activeVideo}
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              controlsList="nodownload"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
