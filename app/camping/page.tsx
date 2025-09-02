import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tent, Users, Utensils, Car, Shield, Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function CampingPage() {
  const facilities = [
    {
      icon: Tent,
      title: "Designated Camping Areas",
      description:
        "Spacious, level ground perfect for tents with beautiful garden views",
    },
    {
      icon: Utensils,
      title: "Shared Cooking Facilities",
      description:
        "Clean, well-equipped outdoor kitchen areas with basic cooking equipment",
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description:
        "Safe, secure environment with on-site security throughout the night",
    },
    {
      icon: Car,
      title: "Parking Available",
      description:
        "Secure parking space for your vehicles right near the camping area",
    },
  ];

  const packages = [
    {
      name: "Basic Camping",
      price: "KSh 2,000",
      duration: "per person/night",
      features: [
        "Designated camping spot",
        "Access to shared restrooms",
        "Basic cooking facilities",
        "Parking space",
        "Security",
      ],
      popular: false,
    },
    {
      name: "Group Camping",
      price: "KSh 10,000",
      duration: "per group (up to 10 people)",
      features: [
        "Private camping area",
        "Dedicated restroom access",
        "Priority cooking facilities",
        "Group parking area",
        "Welcome orientation",
        "Basic camping equipment rental",
      ],
      popular: true,
    },
    {
      name: "Educational Camp",
      price: "KSh 2,500",
      duration: "per student/night",
      features: [
        "All basic camping amenities",
        "Educational activities included",
        "Guided nature walks",
        "Campfire sessions",
        "Learning materials provided",
        "Supervision support",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-display">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Tent className="h-12 w-12 text-emerald-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-stone-800">
              Camping Experience
            </h1>
          </div>
          <p className="text-xl text-stone-600 leading-relaxed font-body">
            Extend your Garden of Ancients experience with an overnight stay
            under the stars. Perfect for school groups, families, and nature
            enthusiasts seeking a deeper connection with the land.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">
                Sleep Under the Stars
              </h2>
              <p className="text-stone-600 mb-6 leading-relaxed font-body">
                Our camping facilities offer a unique opportunity to extend your
                garden experience into the evening and early morning hours. Wake
                up to bird songs, enjoy sunset reflections on our ponds, and
                experience the garden's nocturnal magic.
              </p>
              <p className="text-stone-600 mb-8 leading-relaxed font-body">
                While our camping facilities are more basic compared to our day
                programs, they provide a wonderful way for groups to bond and
                create lasting memories in nature's embrace.
              </p>
              <div className="flex items-center mb-6">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-stone-600 font-body">
                  Perfect for educational overnight programs
                </span>
              </div>
              <div className="flex items-center mb-6">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-stone-600 font-body">
                  Safe, secure environment for all ages
                </span>
              </div>
              <div className="flex items-center mb-8">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-stone-600 font-body">
                  Unique opportunity for night nature observation
                </span>
              </div>
            </div>
            <div>
              <Image
                src="/camping.jpeg"
                alt="Camping area at Garden of Ancients"
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Camping Facilities
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-body">
              While we keep things simple and close to nature, we ensure you
              have all the essential amenities for a comfortable stay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg text-center bg-white"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <facility.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    {facility.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed font-body">
                    {facility.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recreational Experience */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience Nature's Paradise
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-body leading-relaxed">
              Immerse yourself in the tranquil beauty of our gardens through
              camping and recreational activities. Create unforgettable memories
              under the stars and amidst nature's symphony.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur">
              <video
                className="w-full aspect-video object-cover"
                controls
                controlsList="nodownload"
                poster="/recreation.png"
                preload="metadata"
              >
                <source src="/GOA RECREATIONAL.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="space-y-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Tent className="h-6 w-6 text-emerald-400" />
                  Camping & Picnic Activities
                </h3>
                <p className="text-white/80 leading-relaxed">
                  From serene camping spots to vibrant picnic areas, our spaces
                  are designed for both relaxation and adventure. Perfect for
                  family outings, team building, or educational retreats.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="text-emerald-400 font-semibold mb-2">
                    Day Activities
                  </h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Nature Walks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Picnic Areas
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Team Building
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="text-emerald-400 font-semibold mb-2">
                    Night Experience
                  </h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Stargazing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Campfire Stories
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Night Safari
                    </li>
                  </ul>
                </div>
              </div>

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-body py-6 text-lg"
                asChild
              >
                <Link href="/booking?service=camping">
                  Book Your Experience Now
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background Video */}
        <div className="absolute inset-0 -z-10">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            muted // keeping background video muted for better UX
          >
            <source src="/GOA RECREATIONAL.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Important Information
            </h2>
            <p className="text-lg text-stone-600 font-body">
              Please read these guidelines to ensure a safe and enjoyable
              camping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-stone-800 flex items-center">
                  <Shield className="h-5 w-5 text-amber-600 mr-2" />
                  Safety Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-stone-600 text-sm font-body">
                  <li>• All campers must register at arrival</li>
                  <li>• Children must be supervised at all times</li>
                  <li>• No open fires except in designated areas</li>
                  <li>• Quiet hours: 10 PM - 6 AM</li>
                  <li>• Emergency contact available 24/7</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-stone-800 flex items-center">
                  <Tent className="h-5 w-5 text-amber-600 mr-2" />
                  What to Bring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-stone-600 text-sm font-body">
                  <li>• Your own tent and sleeping equipment</li>
                  <li>• Personal toiletries and towels</li>
                  <li>• Flashlight or headlamp</li>
                  <li>• Insect repellent</li>
                  <li>• Weather-appropriate clothing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-stone-800 flex items-center">
                  <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                  Check-in Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-stone-600 text-sm font-body">
                  <li>• Check-in: 3:00 PM - 6:00 PM</li>
                  <li>• Check-out: 8:00 AM - 10:00 AM</li>
                  <li>• Late arrivals must be pre-arranged</li>
                  <li>• Site orientation provided at check-in</li>
                  <li>• Payment due upon arrival</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-stone-800 flex items-center">
                  <Users className="h-5 w-5 text-amber-600 mr-2" />
                  Group Policies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-stone-600 text-sm font-body">
                  <li>• Minimum 2 nights for school groups</li>
                  <li>• Group leader must be present</li>
                  <li>• 48-hour cancellation policy</li>
                  <li>• Deposit required for reservations</li>
                  <li>• Special rates for educational groups</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Camping Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Experience Garden of Ancients like never before with an overnight
            stay surrounded by nature's beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-body"
              asChild
            >
              <Link href="/booking?service=camping">Book Camping</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-green-800 px-8 py-4 rounded-full font-body"
              asChild
            >
              <Link href="/contact">Ask Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
