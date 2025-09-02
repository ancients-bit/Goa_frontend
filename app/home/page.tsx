"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Users,
  Camera,
  Leaf,
  ArrowRight,
  Heart,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function HomePage() {
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

  return (
    <div className="min-h-screen bg-neutral-50 font-display">
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h1 className="text-5xl md:text-6xl font-bold text-accent mb-8 leading-tight">
                Welcome to Garden of Ancients
              </h1>
              <p className="text-xl text-earth-100 mb-8 leading-relaxed font-body">
                Kenya's premier environmental learning space where ancient
                wisdom meets modern education. We create transformative
                experiences that connect people with nature's timeless
                teachings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-success hover:bg-accent text-white px-8 py-4 rounded-full font-body"
                  asChild
                >
                  <Link href="/about">
                    Our Story <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 px-8 py-4 rounded-full bg-transparent font-body"
                  asChild
                >
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <Image
                src="/Image1.jpeg"
                alt="Garden of Ancients overview with visitors exploring"
                width={700}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6">
              Five Ways to Experience Nature
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto font-body">
              Each offering is designed to create meaningful connections between
              people and the natural world
            </p>
          </div>

          <div className="space-y-16">
            {/* School Learning */}
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-on-scroll">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-forest-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-soil-800">
                      School & Environmental Learning
                    </h3>
                    <p className="text-forest-600 font-medium font-body">
                      Where textbooks come to life
                    </p>
                  </div>
                </div>
                <p className="text-soil-600 mb-6 text-lg leading-relaxed font-body">
                  Transform your students' understanding of the natural world
                  through immersive, hands-on experiences. Our educational
                  programs align with curriculum standards while fostering deep
                  environmental awareness.
                </p>
                <Button
                  className="bg-forest-600 hover:bg-forest-700 text-white rounded-full font-body"
                  asChild
                >
                  <Link href="/services#school">Explore Learning Programs</Link>
                </Button>
              </div>
              <div className="relative">
                <Image
                  src="experience3.jpg"
                  alt="Students participating in environmental education"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* Meetings & Picnics */}
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-on-scroll">
              <div className="order-2 lg:order-1 relative">
                <Image
                  src="/Picnic2.jpeg"
                  alt="Groups enjoying outdoor meetings and picnics"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-earth-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-soil-800">
                      Meetings & Picnics
                    </h3>
                    <p className="text-earth-600 font-medium font-body">
                      Gather, connect, celebrate
                    </p>
                  </div>
                </div>
                <p className="text-soil-600 mb-6 text-lg leading-relaxed font-body">
                  Host meaningful gatherings in nature's embrace. From family
                  picnics to corporate team-building events, our spaces provide
                  the perfect backdrop for connection and celebration.
                </p>
                <Button
                  className="bg-earth-600 hover:bg-earth-700 text-white rounded-full font-body"
                  asChild
                >
                  <Link href="/services#meetings">Plan Your Gathering</Link>
                </Button>
              </div>
            </div>

            {/* Photography */}
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-on-scroll">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mr-4">
                    <Camera className="h-8 w-8 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-soil-800">
                      Photography & Videography
                    </h3>
                    <p className="text-sage-600 font-medium font-body">
                      Capture life's precious moments
                    </p>
                  </div>
                </div>
                <p className="text-soil-600 mb-6 text-lg leading-relaxed font-body">
                  Create stunning visual memories against our breathtaking
                  natural backdrops. Professional photography sessions,
                  weddings, and creative projects find their perfect setting
                  here.
                </p>
                <Button
                  className="bg-sage-600 hover:bg-sage-700 text-white rounded-full font-body"
                  asChild
                >
                  <Link href="/services#photography">Book Your Session</Link>
                </Button>
              </div>
              <div className="relative">
                <Image
                  src="/Photo2.jpg"
                  alt="Professional photography session in garden setting"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Mission */}
      <section className="py-24 bg-gradient-to-b from-sage-50 to-earth-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-soil-800 mb-6">
              Rooted in Purpose
            </h2>
            <p className="text-xl text-soil-600 max-w-3xl mx-auto font-body">
              Our values guide every interaction, every program, and every
              moment shared in our garden
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Environmental Stewardship",
                description:
                  "Nurturing deep respect and care for our natural world through hands-on learning",
                color: "forest",
              },
              {
                icon: Heart,
                title: "Community Connection",
                description:
                  "Building bridges between people, cultures, and generations through shared experiences",
                color: "earth",
              },
              {
                icon: Award,
                title: "Educational Excellence",
                description:
                  "Delivering transformative learning that inspires lifelong environmental awareness",
                color: "sage",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center animate-on-scroll hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <value.icon className={`h-8 w-8 text-${value.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-soil-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-soil-600 leading-relaxed font-body">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-forest-900 via-soil-900 to-forest-900 text-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Begin Your Garden Journey
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed font-body">
              Whether you're seeking education, celebration, or simply a deeper
              connection with nature, your perfect experience awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-earth-500 hover:bg-earth-600 text-white px-12 py-6 text-xl rounded-full shadow-xl font-body"
                asChild
              >
                <Link href="/booking">
                  Book Your Visit <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-forest-800 px-12 py-6 text-xl rounded-full bg-transparent font-body"
                asChild
              >
                <Link href="/contact">Connect With Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
