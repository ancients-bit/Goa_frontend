"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Camera,
  Building,
  Leaf,
  GraduationCap,
  Heart,
  Tent,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";

export default function ServicesPage() {
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
    <div className="min-h-screen bg-earth-50 font-display">
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-sage-100 to-earth-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-soil-800 mb-8">
            Our Experiences
          </h1>
          <p className="text-xl text-soil-600 leading-relaxed max-w-3xl mx-auto font-body">
            Five distinct ways to connect with nature, learn, and create lasting
            memories at Garden of Ancients
          </p>
        </div>
      </section>

      {/* School & Environmental Learning */}
      <section id="school" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="animate-on-scroll">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mr-6">
                  <Users className="h-10 w-10 text-forest-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-soil-800">
                    School & Environmental Learning
                  </h2>
                  <Badge className="bg-forest-100 text-forest-700 mt-2">
                    Most Popular
                  </Badge>
                </div>
              </div>
              <p className="text-soil-600 mb-8 text-lg leading-relaxed font-body">
                Transform classroom learning into unforgettable outdoor
                adventures. Our educational programs bring science, geography,
                and environmental studies to life through hands-on exploration
                and discovery.
              </p>
            </div>
            <div className="animate-on-scroll">
              <Image
                src="experience4.jpg"
                alt="Students engaged in environmental education"
                width={700}
                height={500}
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-on-scroll">
            {[
              {
                icon: GraduationCap,
                title: "Curriculum-Aligned Programs",
                description:
                  "Educational content that supports national curriculum standards while inspiring wonder",
              },
              {
                icon: Leaf,
                title: "Hands-On Discovery",
                description:
                  "Interactive activities that make learning memorable and meaningful",
              },
              {
                icon: Heart,
                title: "Environmental Awareness",
                description:
                  "Building lifelong stewards of our natural world through experiential learning",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-forest-50/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-forest-600" />
                  </div>
                  <h3 className="text-xl font-bold text-soil-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-soil-600 leading-relaxed font-body">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-forest-50 rounded-2xl p-12 animate-on-scroll">
            <div>
              <h3 className="text-3xl font-bold text-soil-800 mb-6 flex items-center gap-3">
                <span className="inline-flex w-8 h-8 bg-forest-100 rounded-full  items-center justify-center mr-2">
                  <Leaf className="h-5 w-5 text-forest-600" />
                </span>
                Program Options
              </h3>

              {/* Pricing Policy Section */}
              <div className="bg-soil-50 border border-soil-100 rounded-xl p-5 shadow-sm mb-6">
                <p className="text-soil-700 text-base">
                  <span className="font-semibold">Pricing policy:</span> Rates
                  for tours and picnics are per person. Indicated group rates
                  cover a maximum of 30 people. Additional attendees are charged
                  at an extra rate.
                </p>
                <p className="text-soil-700 text-base mt-2">
                  <span className="font-semibold">Photography/Videography</span>{" "}
                  rates cover up to 30 people; extras at an agreed rate.
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {/* Left Column: Tours */}
                <div className="flex flex-col gap-6">
                  {/* Spice Enclave */}
                  <div className="flex flex-col items-center md:items-stretch w-full bg-forest-50 rounded-xl p-5 shadow-sm border border-forest-100 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mr-2">
                        <Leaf className="h-6 w-6 text-emerald-600" />
                      </span>
                      <span className="text-lg text-soil-800 font-semibold">
                        Tour of Spice Enclave
                      </span>
                      <span className="ml-2 text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full font-bold">
                        min 5 people
                      </span>
                    </div>
                    <div className="flex flex-col md:items-end text-base">
                      <span className="font-bold text-forest-700">
                        Adults:{" "}
                        <span className="text-emerald-700">450 KES</span>
                      </span>
                      <span className="font-bold text-forest-700">
                        Students:{" "}
                        <span className="text-emerald-700">250 KES</span>
                      </span>
                      <span className="font-bold text-forest-700">
                        International:{" "}
                        <span className="text-emerald-700">10 USD</span>
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        Rates are per person
                      </span>
                    </div>
                  </div>

                  {/* Bee Garden */}
                  <div className="flex flex-col items-center md:items-stretch w-full bg-yellow-50 rounded-xl p-5 shadow-sm border border-yellow-100 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mr-2">
                        <svg
                          className="h-6 w-6 text-yellow-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 22s8-4.5 8-10V7a8 8 0 10-16 0v5c0 5.5 8 10 8 10z" />
                        </svg>
                      </span>
                      <span className="text-lg text-soil-800 font-semibold">
                        Tour of Bee Garden
                      </span>
                      <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-bold">
                        min 5 people
                      </span>
                    </div>
                    <div className="flex flex-col md:items-end text-base">
                      <span className="font-bold text-forest-700">
                        Adults: <span className="text-yellow-700">150 KES</span>
                      </span>
                      <span className="font-bold text-forest-700">
                        Students:{" "}
                        <span className="text-yellow-700">100 KES</span>
                      </span>
                      <span className="font-bold text-forest-700">
                        International:{" "}
                        <span className="text-yellow-700">10 USD</span>
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        Rates are per person
                      </span>
                    </div>
                  </div>

                  {/* Combined */}
                  <div className="flex flex-col items-center md:items-stretch w-full bg-emerald-50 rounded-xl p-5 shadow-sm border border-emerald-100 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-emerald-200 rounded-full mr-2">
                        <Users className="h-6 w-6 text-emerald-700" />
                      </span>
                      <span className="text-lg text-soil-800 font-semibold">
                        Combined: Spice Enclave &amp; Bee Garden
                      </span>
                    </div>
                    <div className="flex flex-col md:items-end text-base">
                      <span className="font-bold text-forest-700">
                        Adults:{" "}
                        <span className="text-emerald-700">600 KES</span>
                      </span>
                      <span className="font-bold text-forest-700">
                        Students:{" "}
                        <span className="text-emerald-700">350 KES</span>
                      </span>
                      <span className="font-bold text-forest-700">
                        International:{" "}
                        <span className="text-emerald-700">15 USD</span>
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        Rates are per person
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Photography & Picnic */}
                <div className="flex flex-col gap-6">
                  {/* Photography/Video Shooting */}
                  <div className="w-full bg-orange-50 rounded-xl p-5 shadow-sm border border-orange-100 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-2">
                        <svg
                          className="h-6 w-6 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4 7h16M4 17h16M7 4v16M17 4v16" />
                        </svg>
                      </span>
                      <span className="text-lg text-soil-800 font-semibold">
                        Photography/Video Shooting
                      </span>
                    </div>
                    <div className="flex flex-col md:items-start text-base">
                      <span className="font-bold text-soil-700">
                        Local Guests:{" "}
                        <span className="text-orange-700">12,500 KES</span>
                      </span>
                      <span className="font-bold text-soil-700">
                        International Guests:{" "}
                        <span className="text-orange-700">150 USD</span>
                      </span>
                      <span className="font-bold text-soil-700">
                        FBO: <span className="text-orange-700">10,500 KES</span>
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        Covers up to 30 people; extras at an agreed rate
                      </span>
                    </div>
                  </div>

                  {/* Picnic / Team Building Only */}
                  <div className="w-full bg-sky-50 rounded-xl p-5 shadow-sm border border-sky-100 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full mr-2">
                        <Users className="h-6 w-6 text-sky-600" />
                      </span>
                      <span className="text-lg text-soil-800 font-semibold">
                        Picnic / Team Building Only
                      </span>
                    </div>
                    <div className="flex flex-col md:items-start text-base">
                      <span className="font-bold text-soil-700">
                        Adults: <span className="text-sky-700">350 KES</span>
                      </span>
                      <span className="font-bold text-soil-700">
                        Students: <span className="text-sky-700">200 KES</span>
                      </span>
                      <span className="font-bold text-soil-700">
                        International Guests:{" "}
                        <span className="text-sky-700">10 USD</span>
                      </span>
                      <span className="font-bold text-sky-700">
                        General Groups:{" "}
                        <span className="text-sky-700">10,000 KES</span>
                      </span>
                      <span className="font-bold text-sky-700">
                        Groups (FBO):{" "}
                        <span className="text-sky-700">9,000 KES</span>
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        Rates are per person except for indicated group rates,
                        up to 30 people. Additional attendees charged an extra
                        rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book button and note moved below the grid */}
            <div className="pt-8 text-center">
              <Button
                size="lg"
                className="bg-forest-600 hover:bg-forest-700 text-white px-12 py-6 text-lg rounded-full shadow-xl"
                asChild
              >
                <Link href="/booking?service=school">Book Visit</Link>
              </Button>
              <p className="text-sm text-soil-600 mt-4 font-body">
                Group discounts available for multiple visits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meetings & Picnics */}
      <section id="meetings" className="py-24 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 animate-on-scroll">
              <Image
                src="/Picnic.jpeg"
                alt="Groups enjoying outdoor meetings and celebrations"
                width={700}
                height={500}
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2 animate-on-scroll">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-earth-100 rounded-full flex items-center justify-center mr-6">
                  <Users className="h-10 w-10 text-earth-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-soil-800">
                    Meetings & Picnics
                  </h2>
                  <Badge className="bg-earth-100 text-earth-700 mt-2">
                    Perfect for Groups
                  </Badge>
                </div>
              </div>
              <p className="text-soil-600 mb-8 text-lg leading-relaxed font-body">
                Gather your team, family, or community in nature's inspiring
                embrace. Our spaces provide the perfect setting for meaningful
                connections, celebrations, and collaborative experiences.
              </p>
              <Button
                size="lg"
                className="bg-earth-600 hover:bg-earth-700 text-white px-8 py-4 rounded-full"
                asChild
              >
                <Link href="/booking?service=meetings">
                  Plan Your Gathering
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photography & Videography */}
      <section id="photography" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="animate-on-scroll">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mr-6">
                  <Camera className="h-10 w-10 text-sage-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-soil-800">
                    Photography & Videography
                  </h2>
                  <Badge className="bg-sage-100 text-sage-700 mt-2">
                    Creative Sessions
                  </Badge>
                </div>
              </div>
              <p className="text-soil-600 mb-8 text-lg leading-relaxed font-body">
                Capture life's most precious moments against our stunning
                natural backdrops. From intimate portraits to grand
                celebrations, our diverse landscapes provide the perfect canvas
                for your creative vision.
              </p>
              <Button
                size="lg"
                className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full"
                asChild
              >
                <Link href="/booking?service=photography">
                  Book Your Session
                </Link>
              </Button>
            </div>
            <div className="animate-on-scroll">
              <Image
                src="/Photograph.png"
                alt="Professional photography session in garden"
                width={700}
                height={500}
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conferencing */}
      <section id="conferencing" className="py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 animate-on-scroll">
              <Image
                src="/Picnic2.jpeg"
                alt="Professional outdoor conferencing space"
                width={700}
                height={500}
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2 animate-on-scroll">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mr-6">
                  <Building className="h-10 w-10 text-forest-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-soil-800">
                    Conferencing
                  </h2>
                  <Badge className="bg-forest-100 text-forest-700 mt-2">
                    Professional Meetings
                  </Badge>
                </div>
              </div>
              <p className="text-soil-600 mb-8 text-lg leading-relaxed font-body">
                Elevate your professional gatherings with the inspiring power of
                nature. Our conferencing facilities combine modern amenities
                with natural beauty to create productive, memorable business
                experiences.
              </p>
              <Button
                size="lg"
                className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-4 rounded-full"
                asChild
              >
                <Link href="/booking?service=conferencing">
                  Book Conference Space
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services - Accommodation & Camping */}
      <section id="accommodation" className="py-24 bg-soil-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-soil-800 mb-6">
              Other Services
            </h2>
            <p className="text-xl text-soil-600 max-w-3xl mx-auto font-body">
              Extend your garden experience with overnight accommodations and
              specialized services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl bg-white overflow-hidden animate-on-scroll">
              <div className="relative h-64">
                <Image
                  src="Accomodation.jpg"
                  alt="Accommodation and camping facilities"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 w-16 h-16 bg-soil-100 rounded-full flex items-center justify-center">
                  <Tent className="h-8 w-8 text-soil-600" />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-soil-800 mb-4">
                  Accommodation & Camping
                </h3>
                <p className="text-soil-600 mb-6 leading-relaxed font-body">
                  Extend your connection with nature through overnight stays.
                  Our camping facilities offer a unique opportunity to
                  experience the garden's nocturnal magic and wake up to bird
                  songs.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-soil-600">
                    <div className="w-2 h-2 bg-soil-600 rounded-full mr-3"></div>
                    <span className="font-body">Designated camping areas</span>
                  </div>
                  <div className="flex items-center text-soil-600">
                    <div className="w-2 h-2 bg-soil-600 rounded-full mr-3"></div>
                    <span className="font-body">
                      Shared facilities and cooking areas
                    </span>
                  </div>
                  <div className="flex items-center text-soil-600">
                    <div className="w-2 h-2 bg-soil-600 rounded-full mr-3"></div>
                    <span className="font-body">24/7 security and support</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-soil-600 text-soil-700 hover:bg-soil-50 w-full bg-transparent"
                  asChild
                >
                  <Link href="/camping">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white overflow-hidden animate-on-scroll">
              <div className="relative h-64">
                <Image
                  src="/specialized.jpg"
                  alt="Specialized services and custom programs"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-sage-600" />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-soil-800 mb-4">
                  Specialized Programs
                </h3>
                <p className="text-soil-600 mb-6 leading-relaxed font-body">
                  Custom experiences tailored to your unique needs. From
                  research partnerships to specialized workshops, we work with
                  you to create meaningful, impactful programs.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-soil-600">
                    <div className="w-2 h-2 bg-sage-600 rounded-full mr-3"></div>
                    <span className="font-body">Research collaborations</span>
                  </div>
                  <div className="flex items-center text-soil-600">
                    <div className="w-2 h-2 bg-sage-600 rounded-full mr-3"></div>
                    <span className="font-body">
                      Custom educational programs
                    </span>
                  </div>
                  <div className="flex items-center text-soil-600">
                    <div className="w-2 h-2 bg-sage-600 rounded-full mr-3"></div>
                    <span className="font-body">Community partnerships</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-sage-600 text-sage-700 hover:bg-sage-50 w-full bg-transparent"
                  asChild
                >
                  <Link href="/contact">
                    Discuss Your Needs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-forest-900 via-soil-900 to-forest-900 text-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Experience Garden of Ancients?
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed font-body">
              Choose your perfect experience and let us help you create
              unforgettable memories in nature's embrace.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-earth-500 hover:bg-earth-600 text-white px-12 py-6 text-xl rounded-full shadow-xl"
                asChild
              >
                <Link href="/booking">
                  Book Your Experience <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-forest-800 px-12 py-6 text-xl rounded-full bg-transparent"
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
