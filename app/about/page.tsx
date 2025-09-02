"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Heart, Leaf, Users, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-display">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-body">
            From a simple dream to Kenya's most beloved educational garden space
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">
                Rooted in Purpose
              </h2>
              <p className="text-stone-600 mb-6 leading-relaxed font-body">
                Garden of Ancients officially  began  in 2025 with a simple yet profound vision: to create a living space where ancient agricultural wisdom meets modern sustainability. A place where children don’t just learn from books, but through the texture of soil, the shade of trees, the scents from the herbs, and the rhythms of nature. It would become a haven for community, celebration, and connection to the land—where learning comes alive under open skies.
              </p>
              <p className="text-stone-600 mb-6 leading-relaxed font-body">
                But the roots of this dream stretch much deeper. In 1987, while still a first-year university student, founder Kennedy Tsosy began planting trees along the roadside—not knowing then what the place would one day become. In 1997, when his fiancée visited for the first time, he told her with quiet conviction: “We’ll make this place into a resort.” Inspired by the tree-lined homes of Nairobi’s Karen district and driven by a love for the land, Kennedy and his growing family nurtured what they fondly called Nyansiongo Resort, watching it transform year by year.
              </p>
              <p className="text-stone-600 leading-relaxed font-body">
                Today, Garden of Ancients stands as a vibrant testament to that journey. What started as a hobby has grown into Kenya’s most inspiring environmental learning space—a sanctuary where education, sustainability, and heritage converge. It is a story written by trees, by family, and by a community that believes in the power of nature to teach, heal, and connect us all. But most importantly, it is a clear  testament of the power of the Almighty, God of all creation, who has revealed himself through created things. And although all appeared to be some kind of hobby, God was guiding all the way, step by step. He alone should be revered through his works.
              </p>
            </div>
            <div>
              <Image
                src="/Founder.png"
                alt="Founders of Garden of Ancients"
                width={600}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Farm History Video - Featured */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              The Garden's Journey
            </h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto font-body">
              Watch our documentary film to experience the full story of Garden
              of Ancients—from its humble beginnings to becoming a beacon of
              sustainable education in Kenya. Featuring interviews with our
              founders, community members, and the many lives touched by this
              special place.
            </p>
          </div>

          <div className="relative bg-stone-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video flex items-center justify-center relative">
              <video
                id="our-story-video"
                src="/OurStoryVid.mp4"
                controls
                className="object-cover w-full h-full rounded-lg shadow-xl bg-[#222]"
                tabIndex={-1}
              />
              {/* Custom thumbnail overlay with play button */}
              <div
                id="video-overlay"
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-20 transition-opacity duration-300"
                onClick={() => {
                  const video = document.getElementById(
                    "our-story-video"
                  ) as HTMLVideoElement | null;
                  const overlay = document.getElementById("video-overlay");
                  if (video && overlay) {
                    video.play();
                    overlay.style.opacity = "0";
                    setTimeout(() => (overlay.style.display = "none"), 300);
                  }
                }}
              >
                <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-stone-600 italic text-lg font-body">
              "This garden is not just about plants—it's about planting seeds of
              knowledge, hope, and connection in every person who walks through
              our gates."
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-16">
            Our Journey Through Time
          </h2>

          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold">1987</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  The Seed is Planted
                </h3>
                <p className="text-stone-600 font-body">
                  While a university freshman, Kennedy Tsosy plants the first
                  trees along the roadside. This simple act of environmental
                  stewardship marks the beginning of what will become the Garden
                  of Ancients.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-bold">1997</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  The Vision is Spoken
                </h3>
                <p className="text-stone-600 font-body">
                  During his fiancée’s first visit to his childhood home,
                  Kennedy declares: “We will make this place into a resort.” A
                  vision of restoration and purpose was born.
                </p>
              </div>
            </div>

            {/* Early 2000s */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center">
                <span className="text-lime-600 font-bold">2000</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  Forest Takes Root
                </h3>
                <p className="text-stone-600 font-body">
                  Tree planting intensifies. Inspired by the tree-lined homes of
                  Nairobi's Karen district, the land transforms into a
                  flourishing forest. A dream of blending nature and purpose
                  begins to emerge.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">2019</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  Volunteer Milestone
                </h3>
                <p className="text-stone-600 font-body">
                  The Garden received its first visitors  in the form of overseas volunteers from the UK who came to work on a two- month project at a nearby school . This helped strengthen the vision as we worked to create additional facilities and ambience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-lime-600 font-bold">2024</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  Purpose Crystallized
                </h3>
                <p className="text-stone-600 font-body">
                  Seeking harmony with the forest, the idea of an educational
                  and recreational sanctuary emerges. A place to learn
                  conservation, celebrate creation, and inspire reverence for
                  the Creator.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold">2025</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  Welcomes Its First Visitors
                </h3>
                <p className="text-stone-600 font-body">
                  Garden of Ancients opens its doors for the first school visits, celebration of birthday, and a number of visits by individual environmental enthusiasts
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-bold">Today</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  Legacy & Mission
                </h3>
                <p className="text-stone-600 font-body">
                  The Garden of Ancients is now the preferred natural classroom, where recreation and conservation fuse together. Our mission: to teach and inspire through conservation and ultimately celebrate God's creation. We inspire present and future generations to walk in reverence to God - with the hope of inheriting and dwelling in the promised eternal Garden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-body">
              These principles guide everything we do, from the way we tend our
              plants to how we welcome every visitor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">
                  Sustainability
                </h3>
                <p className="text-stone-600 font-body">
                  Every practice honors the earth and ensures future generations
                  can enjoy nature's abundance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">
                  Community
                </h3>
                <p className="text-stone-600 font-body">
                  We believe in the power of bringing people together to learn,
                  grow, and celebrate.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">
                  Authenticity
                </h3>
                <p className="text-stone-600 font-body">
                  We stay true to traditional wisdom while embracing innovation
                  that serves our mission.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">
                  Excellence
                </h3>
                <p className="text-stone-600 font-body">
                  We strive for the highest quality in everything, from our
                  educational programs to guest experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-800 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Become Part of Our Story
        </h2>
        <p className="text-xl mb-8 opacity-90 font-body">
          Every visitor adds a new chapter to the Garden of Ancients story. What
          will yours be?
        </p>
        <Button
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-body"
          asChild
        >
          <Link href="/booking">Plan Your Visit</Link>
        </Button>
      </section>

      <Footer />
    </div>
  );
}
