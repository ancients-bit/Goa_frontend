"use client";

import Link from "next/link";
import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Quote,
  Send,
  Heart,
  Users,
  Camera,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function TestimonialsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    experience: "",
    testimonial: "",
    rating: "",
  });

  const [videoPlaying, setVideoPlaying] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Testimonial submitted:", formData);
    setFormData({
      name: "",
      email: "",
      organization: "",
      experience: "",
      testimonial: "",
      rating: "",
    });
  };

  const randomColor = () => {
    const colors = ["D08A18", "9FC248", "41662C", "B8925A", "5C4531", "7A8565"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const testimonials = [
    {
      name: "Akshay Kothari",
      role: "Guest",
      rating: 5,
      testimonial:
        "I had the great pleasure of staying here for an extended period of time. It is the perfect place to calm yourself away from the stress of urban life. You are surrounded by beautiful trees and the environment in which you live is fantastic. There are all the amenities that you could wish for including an abundance of fresh vegetables and a beautiful garden. The house itself is well furnished and the host, Kennedy, is fantastic!",
      image: `https://ui-avatars.com/api/?name=Akshay+Kothari&background=${randomColor()}&color=ffffff&size=100`,
      date: "5 years ago",
    },
    {
      name: "Jackie O.",
      role: "Guest",
      rating: 5,
      testimonial:
        "This is one of my most favorite places to visit and stay at!  Very beautiful trees, flowers, the environment is calm, friendly and very peaceful. I enjoyed the natural sounds of birds singing as I woke up in the morning as well. I can't wait to be back again to enjoy the beautiful gardens and fresh fruits.  Definitely a must see if you haven't been there yet!",
      image: `https://ui-avatars.com/api/?name=Jackie+O.&background=${randomColor()}&color=ffffff&size=100`,
      date: "5 years ago",
    },
    {
      name: "Jas S",
      role: "Local Guide",
      rating: 5,
      testimonial:
        "Very peaceful place with lovely gardens in a really friendly area. Really enjoyed my ten week stay here.",
      image: `https://ui-avatars.com/api/?name=Jas+S&background=${randomColor()}&color=ffffff&size=100`,
      date: "5 years ago",
    },
    {
      name: "Alex Billing",
      role: "Guest",
      rating: 5,
      testimonial:
        "Incredible location, beautiful house, and the host is extremely friendly!",
      image: `https://ui-avatars.com/api/?name=Alex+Billing&background=${randomColor()}&color=ffffff&size=100`,
      date: "5 years ago",
    },
    {
      name: "Geoffrey 'Jeff' Siro",
      role: "Guest",
      rating: 5,
      testimonial: "Nice serene environment.",
      image: `https://ui-avatars.com/api/?name=Geoffrey+Jeff+Siro&background=${randomColor()}&color=ffffff&size=100`,
      date: "3 years ago",
    },
  ];

  return (
    <div className="min-h-screen bg-earth-50 font-display">
      <Navigation />
      {/* Hero Section */}
      <section className="py-24 px-4 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-accent mb-12 text-center">
            Testimonials
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <h3 className="font-bold text-soil-800 text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-soil-600 text-sm font-body">
                        {testimonial.role}
                      </p>
                      {/* Removed organization */}
                    </div>
                    {/* Removed experience icon and color */}
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-sage-200" />
                    <p className="text-soil-700 leading-relaxed italic pl-6 font-body">
                      {testimonial.testimonial}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-earth-200">
                    {/* Removed experience badge */}
                    <span className="text-soil-500 text-sm font-body">
                      {testimonial.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-gradient-to-br from-forest-300 to-forest-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-on-scroll mb-16">
            <h2 className="text-4xl font-bold mb-8">Our Community Impact</h2>
            <p className="text-xl text-earth-200 max-w-3xl mx-auto font-body">
              Numbers that tell the story of lives touched and connections made
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "800+",
                label: "Happy Visitors",
                description: "Groups and individuals served",
              },
              {
                number: "300+",
                label: "Schools Reached",
                description: "Educational institutions partnered",
              },
              {
                number: "150+",
                label: "Events Hosted",
                description: "Celebrations and gatherings",
              },
              {
                number: "4.9/5",
                label: "Average Rating",
                description: "Based on visitor feedback",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center animate-on-scroll delay-${index}`}
              >
                <div className="text-5xl font-bold text-earth-300 mb-3">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-white mb-2 font-body">
                  {stat.label}
                </div>
                <div className="text-earth-200 text-sm font-body">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Video Section */}
      <section className="py-12 px-6 bg-gradient-to-br from-sage-50 via-white to-sage-100">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Video */}
          <div className="w-full rounded-lg overflow-hidden relative animate-on-scroll group bg-gradient-to-br from-sage-50 via-white to-sage-100">
            <video
              className="w-full h-full object-contain"
              controls
              controlsList="nodownload"
              poster="/video-poster.jpg"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              onEnded={() => setVideoPlaying(false)}
            >
              <source src="/GOA TESTIMONIAL.mp4" type="video/mp4" />
              Your browser does not support the video.
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="bg-black/40 w-full h-full absolute top-0 left-0 group-hover:bg-black/10 transition-all duration-300"></div>
              {!videoPlaying && (
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold text-soil-200 drop-shadow-lg mb-4">
                    Real Stories, Real Impact
                  </span>
                  <span className="text-lg md:text-xl text-soil-200 drop-shadow font-body">
                    Watch what our guests have to say!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Videos Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Video 2 */}
            <div className="rounded-lg overflow-hidden relative animate-on-scroll group bg-gradient-to-br from-sage-50 via-white to-sage-100">
              <video
                className="w-full aspect-video object-contain"
                controls
                controlsList="nodownload"
                poster="/testimonial.jpg"
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
                onEnded={() => setVideoPlaying(false)}
              >
                <source src="/Testimonial 3.mp4" type="video/mp4" />
                Your browser does not support the video.
              </video>
            </div>

            {/* Video 3 */}
            <div className="rounded-lg overflow-hidden relative animate-on-scroll group bg-gradient-to-br from-sage-50 via-white to-sage-100">
              <video
                className="w-full aspect-video object-contain"
                controls
                controlsList="nodownload"
                poster="/testimonial2.png"
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
                onEnded={() => setVideoPlaying(false)}
              >
                <source src="/Testimonial Final.mp4" type="video/mp4" />
                Your browser does not support the video.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-forest-900 via-soil-900 to-forest-900 text-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed font-body">
              Join our community of learners, celebrants, and nature lovers.
              Your Garden of Ancients story is waiting to be written.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-earth-500 hover:bg-earth-600 text-white px-12 py-6 text-xl rounded-full shadow-xl font-body"
                asChild
              >
                <Link href="/booking">Book Your Experience</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-forest-800 px-12 py-6 text-xl rounded-full bg-transparent font-body"
                asChild
              >
                <Link href="/contact">Ask Questions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
