"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Camera,
  Building,
  Leaf,
  ChevronDown,
  NotebookPen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function LandingPage() {
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          {/* Desktop image */}
          <Image
            src="/Welcomingimage.jpg"
            alt="Students and families exploring Garden of Ancients outdoor classroom"
            fill
            className="object-cover blur-[1px] opacity-70 w-full h-full hidden sm:block"
            priority
          />
          {/* Mobile image */}
          <Image
            src="/Welcomingimage.jpg"
            alt="Students and families exploring Garden of Ancients outdoor classroom"
            fill
            className="object-cover blur-[1px] opacity-90 w-full h-full block sm:hidden"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight text-accent animate-fade-in-up">
            Book a Tour of This Garden
          </h1>
          <p className="font-body text-xl md:text-2xl mb-12 opacity-95 max-w-4xl mx-auto text-neutral-200 leading-relaxed">
            Where learning comes alive through nature's classroom. Experience
            hands-on education, celebrate life's moments, and connect with
            Kenya's most inspiring environmental learning space.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="font-body bg-success hover:bg-accent text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/booking">
                Book a Tour <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-body border-2 border-white text-white hover:bg-white hover:text-forest-800 px-12 py-6 text-xl rounded-full backdrop-blur-sm bg-transparent"
              asChild
            >
              <Link href="/home">Explore the Garden</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      {/* Quick Service Preview */}
      <section className="py-24 px-4 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-bold text-soil-800 mb-8">
              What Awaits You
            </h2>
            <p className="text-xl text-soil-600 max-w-3xl mx-auto leading-relaxed font-body">
              Five unique ways to experience the magic of Garden of Ancients
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: NotebookPen,
                title: "School Learning",
                description:
                  "Transform education through hands-on nature experiences",
                image: "/experience1.jpg",
                color: "forest",
              },
              {
                icon: Users,
                title: "Teambuilding & Picnics",
                description:
                  "Gather, celebrate, and connect in nature's embrace with your team/family",
                image: "Picnic.jpeg",
                color: "earth",
              },
              {
                icon: Camera,
                title: "Photography & Videography",
                description:
                  "Capture life's precious moments in stunning natural settings",
                image: "/Photo.jpg",
                color: "sage",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm animate-on-scroll hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-fill w-full h-full"
                  />
                  <div
                    className={`absolute top-3 left-6 w-12 h-12 bg-${service.color}-100 rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <service.icon
                      className={`h-6 w-6 text-${service.color}-700`}
                    />
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-soil-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-soil-600 mb-6 leading-relaxed font-body">
                    {service.description}
                  </p>
                  <Button
                    variant="outline"
                    className={`border-${service.color}-600 text-${service.color}-700 hover:bg-${service.color}-50 group-hover:bg-${service.color}-600 group-hover:text-green-600 transition-all duration-300 font-body`}
                    asChild
                  >
                    <Link href="/services">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Building,
                title: "Conferencing",
                description:
                  "Professional meetings in inspiring natural environments",
                image: "Conferencing.jpg",
                color: "forest",
              },
              {
                icon: Leaf,
                title: "Accommodation",
                description: "Overnight stays and camping under the stars",
                image: "Accomodation.jpg",
                color: "soil",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden bg-white/95 backdrop-blur-sm animate-on-scroll"
                style={{ animationDelay: `${(index + 3) * 0.2}s` }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-48 md:h-auto overflow-hidden flex flex-col items-center justify-center">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-fill group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div
                      className={`w-12 h-12 bg-${service.color}-100 rounded-full flex items-center justify-center mb-6 mt-4`}
                    >
                      <service.icon
                        className={`h-6 w-6 text-${service.color}-700`}
                      />
                    </div>
                    <CardContent className="flex flex-col justify-center items-center w-full">
                      <h3 className="text-xl font-bold text-soil-800 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-soil-600 mb-6 leading-relaxed font-body">
                        {service.description}
                      </p>
                      <Button
                        variant="outline"
                        className={`border-${service.color}-600 text-${service.color}-700 hover:bg-${service.color}-50 w-fit font-body`}
                        asChild
                      >
                        <Link href="/services">Discover More</Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Community */}
      <section className="py-24 bg-gradient-to-br from-forest-900 via-soil-900 to-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-wood-grain opacity-20" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Trusted by Kenya's Communities
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "800+", label: "Groups Welcomed" },
                { number: "300+", label: "Schools Served" },
                { number: "1,500+", label: "People Trained" },
                { number: "4.9/5", label: "Experience Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl font-bold text-earth-300 mb-3">
                    {stat.number}
                  </div>
                  <div className="text-earth-200 text-lg font-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center animate-on-scroll">
            <blockquote className="text-2xl text-earth-200 italic mb-8 max-w-4xl mx-auto leading-relaxed font-body">
              "Garden of Ancients isn't just a place—it's where hearts open,
              minds grow, and communities flourish through the wisdom of
              nature."
            </blockquote>
            <Button
              size="lg"
              variant="outline"
              className="border-earth-300 text-earth-300 hover:bg-earth-300 hover:text-forest-900 px-8 py-4 rounded-full bg-transparent font-body"
              asChild
            >
              <Link href="/testimonials">Read More Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-sage-50 to-earth-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Video and Description */}
            <div className="animate-on-scroll space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full aspect-video object-cover"
                  controls
                  controlsList="nodownload"
                  poster="/psalms.png"
                >
                  <source src="/PSALMS.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="text-center">
                <p className="text-lg text-soil-600 font-body leading-relaxed">
                  "In the heart of nature lies the spirit of learning, where
                  every moment becomes a lesson, and every experience shapes a
                  brighter tomorrow. Join us in this transformative journey."
                </p>
              </div>
            </div>

            {/* Right Column - CTA Content */}
            <div className="text-center animate-on-scroll">
              <div className="max-w-xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-soil-800 mb-8">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-xl text-soil-600 mb-12 leading-relaxed font-body">
                  Join thousands who have discovered the transformative power of
                  learning and celebrating in nature's embrace.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="bg-forest-600 hover:bg-forest-700 text-white px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-body"
                    asChild
                  >
                    <Link href="/booking">
                      Book Your Experience{" "}
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-forest-600 text-forest-700 hover:bg-forest-600 hover:text-white px-12 py-6 text-xl rounded-full bg-transparent font-body"
                    asChild
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
