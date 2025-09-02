"use client";

import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Send,
  MapPin,
  Map,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  // Newsletter state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
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
    <footer className="bg-primary text-neutral-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-wood-grain opacity-10" />
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-11 h-11 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img
                  src="/goaLogo.png"
                  alt="Garden of Ancients Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold leading-none">
                  Garden of Ancients
                </span>
                <div className="text-sm text-neutral-300 font-medium">
                  Fusion of Recreation & Conservation - Kenya’s Natural
                  Classroom
                </div>
              </div>
            </div>
            <p className="text-neutral-200 mb-8 leading-relaxed text-lg max-w-md">
              Where ancient wisdom meets modern learning. Connecting hearts and
              minds with nature's timeless teachings.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-neutral-200">
                <Phone className="h-5 w-5 text-success mr-3" />
                <span>Tel. +254 755 710225</span>
              </div>
              <div className="flex items-center text-neutral-200">
                <Mail className="h-5 w-5 text-success mr-3" />
                <span>info@gardenofancients.com</span>
              </div>
              <div className="flex items-start text-neutral-200">
                <MapPin className="h-5 w-5 text-success mr-3 mt-1" />
                <span>Nyamira, Kenya - PO Box 1753 00502</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                {
                  Icon: MapPin,
                  href: "https://www.google.com/maps/place/Tsosy+Garden+of+Ancients/@-0.809896,35.002659,15z/data=!4m8!3m7!1s0x182b6f55e4a171e9:0x97784f52947c68e4!8m2!3d-0.8098959!4d35.0026592!9m1!1b1!16s%2Fg%2F11j0hhjkm_?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D",
                },
              ].map(({ Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-earth-300 hover:text-white hover:bg-forest-700/50 p-3 rounded-full"
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-earth-100">Explore</h3>
            <div className="space-y-3">
              {[
                { href: "/home", label: "Our Story" },
                { href: "/services", label: "Experiences" },
                { href: "/about", label: "Mission" },
                { href: "/blog", label: "Garden Wisdom" },
                { href: "/camping", label: "Overnight Stays" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-earth-300 hover:text-forest-300 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-earth-100">
              Stay Rooted
            </h3>
            <p className="text-earth-300 mb-6 text-sm leading-relaxed">
              Receive seasonal wisdom, garden updates, and stories from our
              community.
            </p>

            <form className="space-y-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl border border-soil-600 bg-soil-800/50 placeholder-earth-400 text-earth-100 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
              />
              <Button
                className="w-full bg-forest-600 hover:bg-forest-700 text-white rounded-xl"
                type="submit"
                disabled={status === "loading" || !email}
              >
                <Send className="h-4 w-4 mr-2" />
                {status === "loading" ? "Subscribing..." : "Join Our Community"}
              </Button>
              {status === "success" && (
                <div className="text-green-400 text-sm text-center">
                  Thank you for subscribing!
                </div>
              )}
              {status === "error" && error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
            </form>
            {/* <Button
              type="button"
              className="w-full mt-2 bg-accent hover:bg-accent/80 text-white rounded-xl font-body"
              onClick={() => window.open("/admin/login", "_blank")}
            >
              Admin Dashboard
            </Button> */}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-success to-transparent my-12" />

        <div className="text-center">
          <p className="text-earth-400 text-sm">
            © {new Date().getFullYear()} Garden of Ancients •
          </p>
        </div>
      </div>
    </footer>
  );
}
